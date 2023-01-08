import type { Problem } from "../../Problem";

export const data: Problem<number[], number> = {
  name: "Middle age",
  difficulty: "easy",
  number: 11,
  arguments: [{ name: "a", type: "number[]" }],
  tags: ["basics", "numbers", "arrays"],
  testCases: [
    {
      input: [[4, 5, 6]],
      output: 5,
    },
    {
      input: [[1, 11]],
      output: 6,
    },
    {
      input: [[20, 30, 40, 10]],
      output: 25,
    },
    {
      input: [[0]],
      output: 0,
    },
  ],
};
