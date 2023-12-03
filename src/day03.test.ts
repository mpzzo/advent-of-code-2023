import { test, expect } from "bun:test";
import { addPartNumbers, addGearRatios } from "./day03";

const TEST_INPUT = `\
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

test("addPartNumbers", () => {
  expect(addPartNumbers(TEST_INPUT)).toBe(4361);
});

test("addGearRatios", () => {
  expect(addGearRatios(TEST_INPUT)).toBe(467835);
});