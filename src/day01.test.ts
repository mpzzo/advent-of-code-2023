import { test, expect } from "bun:test";
import { getCalibrationValueSum, getCalibrationValueSumWithWords } from "./day01";

const TEST_INPUT_ONE = `\
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const TEST_INPUT_TWO = `\
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

test("getCalibrationValueSum", () => {
  expect(getCalibrationValueSum(TEST_INPUT_ONE)).toBe(142);
});

test("getCalibrationValueSumWithWords", () => {
  expect(getCalibrationValueSumWithWords(TEST_INPUT_TWO)).toBe(281);
});