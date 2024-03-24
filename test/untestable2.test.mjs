import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue } from "../src/testable2.mjs";

describe("Untestable 2: a dice game", () => {
  test("Hand of 4 and 5 dices has valuue 5", () => {
    expect(diceHandValue(4, 5)).to.equal(5);
  });
});
