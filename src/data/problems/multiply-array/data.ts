import type { Problem } from "../../Problem";

export const data: Problem<number[] | string, number[]> = {
  name: "Multiply array",
  difficulty: "easy",
  number: 42,
  arguments: [
    { name: "arr", type: "number[]" },
    { name: "cb", type: "(n: number) => number" },
  ],
  tags: ["basics", "numbers", "arrays", "functions"],
  testCases: [
    {
      input: [[1, 2, 3], "(x) => x * 2"],
      output: [2, 4, 6],
    },
    {
      input: [[4, 5, 6], "(x) => x * x"],
      output: [16, 25, 36],
    },
    {
      input: [[8, 3, 5], "(x) => x * -1"],
      output: [-8, -3, -5],
    },
    {
      input: [[1, 9, 5], "(x) => x * 1"],
      output: [1, 9, 5],
    },
  ],
};
