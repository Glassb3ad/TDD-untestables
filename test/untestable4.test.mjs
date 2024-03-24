import { afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao, PostgresDbConnection } from "../src/testable4.mjs";
import { expect } from "chai";
import argon2 from "@node-rs/argon2";

const testUser = {
  userId: 5,
  passwordHash: "dasasdasdasdasdas"
}

describe("Untestable 4: enterprise application", () => {
  let dbConnection;
  let passwordService;
  let userDao
  beforeEach(() => {
    dbConnection = new PostgresDbConnection();
    userDao = new PostgresUserDao(dbConnection)
    passwordService = new PasswordService(userDao);
  });

  afterEach(async () => {
    await dbConnection.db.query(
      `TRUNCATE TABLE users`
    );
    dbConnection.close()
  });

  test("Amount of users is initially zero", async () => {
    const initialUsers = await dbConnection.db.query(
      `select * from users`
    );
    expect(initialUsers.rows.length).to.equal(0)

  });

  test("Amount of users increase when user is added", async () => {
    const initialUsers = await dbConnection.db.query(
      `select * from users`
    );
    await userDao.save(testUser)
    const usersAfterInset = await dbConnection.db.query(
      `select * from users`
    );
    expect(usersAfterInset.rows.length).to.be.greaterThan(initialUsers.rows.length)

  });

  test("Same of user cannot be added twice", async () => {
    await userDao.save(testUser)
    await userDao.save(testUser)
    const usersAfterInset = await dbConnection.db.query(
      `select * from users`
    );
    expect(usersAfterInset.rows.length).to.equal(1)
  });

  test("User's password hash and id are saved", async () => {
    await userDao.save(testUser)
    const user = (await dbConnection.db.query(
      `select * from users where user_id = $1`, [testUser.userId]
    )).rows[0];
    const hasSameId = user.user_id === testUser.userId
    const hasSameHash = user.password_hash === testUser.passwordHash
    expect(hasSameId && hasSameHash).to.be.true
  });

  test("User's password hash can be updated", async () => {
    await userDao.save(testUser)
    const newPasswordHash = "1234"
    await userDao.save({ ...testUser, passwordHash: newPasswordHash })
    const user = (await dbConnection.db.query(
      `select * from users where user_id = $1`, [testUser.userId]
    )).rows[0];
    expect(user.password_hash).to.equal(newPasswordHash)
  });

  test("Password check recognizes correct password", async () => {
    expect(passwordService.isCorrectPassword(await argon2.hash("secret"), "secret")).to.be.true
  });

  test("Password check recognizes incorrect password", async () => {
    expect(passwordService.isCorrectPassword(await argon2.hash("secret"), "terces")).to.be.false
  });

  test("New password hash recognizes source password", async () => {
    expect(argon2.verifySync(await passwordService.createNewPasswordHash("secret"), "secret")).to.be.true
  });
});
