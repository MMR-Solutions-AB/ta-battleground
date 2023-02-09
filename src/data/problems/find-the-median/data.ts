import type { Problem } from "../../Problem";

export const data: Problem<number[], number[]> = {
  name: "Find the median",
  difficulty: "easy",
  number: 56,
  isHidden: true,
  arguments: [{ name: "arr", type: "array" }],
  tags: ["numbers", "arrays"],
  testCases: [
    {
      input: [[1, 2, 3, 4, 5]],
      output: [10, 20, 30, 40, 50],
    },
  ],
};
