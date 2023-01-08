import type { Problem } from "../../Problem";

export const data: Problem<number[], number[]> = {
  name: "Filter even numbers",
  difficulty: "easy",
  number: 32,
  arguments: [{ name: "numbers", type: "number[]" }],
  tags: ["basics", "numbers", "arrays"],
  testCases: [
    {
      input: [[1, 2, 3, 4]],
      output: [2, 4],
    },
    {
      input: [[2, 5]],
      output: [2],
    },
    {
      input: [[3, 5, 6, 8, 10]],
      output: [6, 8, 10],
    },
  ],
};
