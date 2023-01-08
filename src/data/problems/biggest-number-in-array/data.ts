import type { Problem } from "../../Problem";

export const data: Problem<number[], number> = {
  name: "Biggest number in array",
  difficulty: "easy",
  number: 6,
  arguments: [{ name: "arr", type: "number[]" }],
  tags: ["basics", "numbers", "arrays"],
  testCases: [
    {
      input: [[1, 2, 3, 4]],
      output: 4,
    },
    {
      input: [[1, 9, 5]],
      output: 9,
    },
    {
      input: [[8, 1, 2]],
      output: 8,
    },
  ],
};
