import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv } from "../src/untestable3.mjs";
import { parsePeopleRecords } from "../src/testable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female
const EXAMPLE_PEOPLE_RECORDS = [
  ["Loid", "Forger", "", "Male"],
  ["Anya", "Forger", "6", "Female"],
  ["Yor", "Forger", "27", "Female"]
]

const objectHasField = (obj, field) => Object.keys(obj).includes(field)

describe("Untestable 3: CSV file parsing", () => {
  test("People parsing turns people to objects with firstName, lastName and gender fields", async () => {
    const people = parsePeopleRecords(EXAMPLE_PEOPLE_RECORDS)
    const everyPersonhasExpectedFields = people.every(person => objectHasField(person, "firstName") && objectHasField(person, "lastName") && objectHasField(person, "gender"))
    expect(everyPersonhasExpectedFields).to.be.true
  });
});

/* test("todo", async () => {
  // TODO: write proper tests
  try {
    expect(await parsePeopleCsv("people.csv")).to.deep.equal([]);
  } catch (e) { }
}); */