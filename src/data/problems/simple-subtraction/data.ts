import type { Problem } from "../../Problem";

export const data: Problem<number, number> = {
  name: "Simple Subtraction",
  difficulty: "easy",
  testCases: [
    {
      input: [10, 5],
      output: 5,
    },
    {
      input: [78, 31],
      output: 47,
    },
    {
      input: [99, 0],
      output: 99,
    },
  ],
};
