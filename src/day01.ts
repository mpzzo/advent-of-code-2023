type Trie = {
  [c: string]: number | Trie
};

const DIGIT_TRIE: Trie = {"0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"e":{"i":{"g":{"h":{"t":8}}}},"f":{"i":{"v":{"e":5}},"o":{"u":{"r":4}}},"n":{"i":{"n":{"e":9}}},"o":{"n":{"e":1}},"s":{"e":{"v":{"e":{"n":7}}},"i":{"x":6}},"t":{"h":{"r":{"e":{"e":3}}},"w":{"o":2}},"z":{"e":{"r":{"o":0}}}};

const isInteger = (n: unknown): n is number => Number.isInteger(n);

const readDigit = (line: string, trie: Trie, index: number): number | null => {
  if (index >= line.length) {
    return null;
  }
  const c = line.charAt(index);
  const next = trie[c] ?? null;
  if (next === null) {
    return null;
  } else if (isInteger(next)) {
    return next;
  } else {
    return readDigit(line, next, index + 1);
  }
};

export const getCalibrationValueSumWithWords = (document: string): number => {
  return document.split("\n").map(line => {
    const digits: number[] = [];
    for (let i = 0; i < line.length; i++) {
      const digit = readDigit(line, DIGIT_TRIE, i);
      if (digit !== null) {
        digits.push(digit);
      }
    }
    return digits.length > 0 ? (digits[0] * 10) + digits[digits.length - 1] : 0;
  }).reduce((sum, value) => sum + value, 0);
};

export const getCalibrationValueSum = (document: string): number => {
  return document.split("\n").map(line => {
    const digits = line.split("").filter(c => Number.parseInt(c, 10) >= 0);
    return digits.length > 0 ? Number.parseInt(`${digits[0]}${digits[digits.length-1]}`, 10) : 0;
  }).reduce((sum, value) => sum + value, 0);
};

if (import.meta.main) {
  Bun.file(`${import.meta.dir}/day01.input`)
    .text()
    .then(text => {
      console.log("part one:", getCalibrationValueSum(text));
      console.log("part two:", getCalibrationValueSumWithWords(text));
    })
}