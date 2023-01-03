import type { Problem } from "../../Problem";

export const data: Problem<number[], boolean> = {
  name: "Has odd numbers",
  difficulty: "easy",
  number: 33,
  arguments: ["numbers"],
  tags: ["basics", "arrays", "numbers"],
  testCases: [
    {
      input: [[1, 3, 5]],
      output: true,
    },
    {
      input: [[2, 4, 6]],
      output: false,
    },
    {
      input: [[5, 6, 8]],
      output: true,
    },
  ],
};
