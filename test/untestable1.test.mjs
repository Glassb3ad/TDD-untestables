import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/testable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("4 days to christmas from 20th december", () => {
    const december20th = new Date(2024, 11, 20)
    expect(daysUntilChristmas(december20th)).to.equal(4);
  });
});
