import type { Problem } from "../../Problem";

export const data: Problem<number[], number> = {
  name: "Single number",
  difficulty: "medium",
  number: 49,
  arguments: [{ name: "nums", type: "number[]" }],
  tags: ["numbers", "arrays"],
  testCases: [
    {
      input: [[2, 2, 1]],
      output: 1,
    },
    {
      input: [[4, 1, 2, 1, 2]],
      output: 4,
    },
    {
      input: [[5, 6, 7, 6, 7, 5, 3]],
      output: 3,
    },
    {
      input: [[9]],
      output: 9,
    },
  ],
};
