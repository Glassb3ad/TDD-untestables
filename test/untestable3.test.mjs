import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv } from "../src/untestable3.mjs";
import { parsePeopleRecords, formatGender, readPeopleCsv, parsePeopleCsv } from "../src/testable3.mjs";

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

  test("People with age column are parsed to objects with age field", async () => {
    const people = parsePeopleRecords(EXAMPLE_PEOPLE_RECORDS)
    const haveAgeFields = objectHasField(people[1], "age") && objectHasField(people[2], "age")
    expect(haveAgeFields).to.be.true
  });

  test("Age column is parsed to number type", async () => {
    const people = parsePeopleRecords(EXAMPLE_PEOPLE_RECORDS)
    expect(people[1].age).to.be.a("number")
  });

  test("People missing age column are parsed to objects without age field", async () => {
    const people = parsePeopleRecords(EXAMPLE_PEOPLE_RECORDS)
    const hasAgeField = objectHasField(people[0], "age")
    expect(hasAgeField).to.be.false
  });

  test("Gender is formatted to 'm' when gender is 'Male'", async () => {
    expect(formatGender("Male")).to.equal("m")
  });

  test("Gender is formatted to 'f' when gender is 'Female'", async () => {
    expect(formatGender("Female")).to.equal("f")
  });

  test("Gender is formatted to 'x' when gender is 'XYZ'???", async () => {
    expect(formatGender("XYZ")).to.equal("x")
  });

  test("Reading csv with people records returns 2d array", async () => {
    try {
      const records = await readPeopleCsv("test/people.csv")
      expect(records[0]).to.be.a("array");
    } catch (e) {
      throw e
    }
  })

  test("Parsing csv with people records returns array of parsed people objects", async () => {
    try {
      const records = await parsePeopleCsv("test/people.csv")
      const parsedPeople = parsePeopleRecords(EXAMPLE_PEOPLE_RECORDS)
      console.log(records, parsedPeople)
      expect(records).to.deep.equal(parsedPeople);
    } catch (e) {
      throw e
    }
  })

});

/* test("todo", async () => {
  // TODO: write proper tests
  try {
    expect(await parsePeopleCsv("people.csv")).to.deep.equal([]);
  } catch (e) { }
}); */