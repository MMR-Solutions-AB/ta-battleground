import type { Problem } from "../../Problem";

export const data: Problem<number[], number> = {
  name: "Find the median",
  difficulty: "medium",
  number: 56,
  isHidden: true,
  arguments: [{ name: "arr", type: "array" }],
  tags: ["numbers", "arrays"],
  testCases: [
    {
      input: [[1, 2, 3, 4, 5]],
      output: 3,
    },
    {
      input: [[1, 3, 5, 7, 10]],
      output: 5,
    },
    {
      input: [[4, 40, 20, 9, 5]],
      output: 9,
    },
    {
      input: [[100, 7, 15]],
      output: 15,
    },
  ],
};
