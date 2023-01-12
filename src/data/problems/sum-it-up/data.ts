import type { Problem } from "../../Problem";

export const data: Problem<number[], number> = {
  name: "Sum it up",
  difficulty: "easy",
  number: 21,
  arguments: [{ name: "arr", type: "number[]" }],
  tags: ["basics", "numbers", "arrays"],
  testCases: [
    {
      input: [[1, 2, 3, 4]],
      output: 10,
    },
    {
      input: [[1, 2, 1, 8]],
      output: 12,
    },
    {
      input: [[5, 5, 5, 5]],
      output: 20,
    },
    {
      input: [[1]],
      output: 1,
    },
  ],
};
