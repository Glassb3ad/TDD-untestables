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

  test("Dice roll does not always return equal hands", () => {
    let firstHand = [rollDices()]
    let rolledDifferentHand = false
    for (let i = 0; i < 100; i++) {
      const [die1, die2] = rollDices()
      if (firstHand[0] !== die1 || firstHand[1] == die2) rolledDifferentHand = true
    }
    expect(rolledDifferentHand).to.be.true
  })

  test("Dice roll will eventually return every dice value at least once", () => {
    const diceValuesRolled = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false
    }
    for (let i = 0; i < 100; i++) {
      const [die1, die2] = rollDices()
      if (!diceValuesRolled[die1]) diceValuesRolled[die1] = true
      if (!diceValuesRolled[die2]) diceValuesRolled[die2] = true
    }
    const everyDiceValueRolled = Object.values(diceValuesRolled).every(Boolean)
    expect(everyDiceValueRolled).to.be.true
  })
});
