import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

//This code contain both file reading and its parsing which are independent functionalities
//File reading depends on file's content, thus this is not pure function (same filePath args might return different values)
//File is a sort of global variable.
//Could enhance testability by extracting methdod for parsing.
export async function parsePeopleCsv(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf8" });
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}
