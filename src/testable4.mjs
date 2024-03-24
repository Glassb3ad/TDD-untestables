import argon2 from "@node-rs/argon2";
import pg from "pg";

export class PostgresDbConnection {
  db = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  close() {
    this.db.end();
  }
}

export class PostgresUserDao {
  static db;

  constructor(connection) {
    this.db = connection.db
  }

  #rowToUser(row) {
    return { userId: row.user_id, passwordHash: row.password_hash };
  }

  async getById(userId) {
    const { rows } = await this.db.query(
      `select user_id, password_hash
       from users
       where user_id = $1`,
      [userId]
    );
    return rows.map(this.#rowToUser)[0] || null;
  }

  async save(user) {
    await this.db.query(
      `insert into users (user_id, password_hash)
       values ($1, $2)
       on conflict (user_id) do update
           set password_hash = excluded.password_hash`,
      [user.userId, user.passwordHash]
    );
  }
}

export class PasswordService {

  constructor(userDao) {
    this.users = userDao
  }

  isCorrectPassword(passwordHash, password) {
    return argon2.verifySync(passwordHash, password)
  }

  createNewPasswordHash(newPassword) {
    return argon2.hashSync(newPassword);
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.users.getById(userId);
    if (!isCorrectPassword(user.passwordHash, oldPassword)) {
      throw new Error("wrong old password");
    }
    user.passwordHash = createNewPasswordHash(newPassword)
    await this.users.save(user);
  }
}
