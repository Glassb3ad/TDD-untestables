import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue, rollDices } from "../src/testable2.mjs";

const isDiceWithCorrectValue = die => die <= 6 || die >= 1

describe("Untestable 2: a dice game", () => {
  test("Hand of 4 and 5 has value 5", () => {
    expect(diceHandValue(4, 5)).to.equal(5);
  });

  test("Hand of 6 and 2 has value 6", () => {
    expect(diceHandValue(6, 2)).to.equal(6);
  });

  test("Hand of 6 and 6 has value 106", () => {
    expect(diceHandValue(6, 6)).to.equal(106);
  });

  test("Dice roll always returns dices with values between 1 and 6", () => {
    let rolledDiceWithIncorrectValue = false
    for (let i = 0; i < 100; i++) {
      const [die1, die2] = rollDices()
      if (!(isDiceWithCorrectValue(die1) && isDiceWithCorrectValue)(die2)) rolledDiceWithIncorrectValue = true
    }
    expect(rolledDiceWithIncorrectValue).to.be.false
  })
});
