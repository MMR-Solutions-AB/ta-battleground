import type { Problem } from "../../Problem";

export const data: Problem<number, number> = {
  name: "Factorial",
  difficulty: "easy",
  number: 15,
  arguments: ["n"],
  tags: ["numbers"],
  testCases: [
    {
      input: [3],
      output: 6,
    },
    {
      input: [5],
      output: 120,
    },
    {
      input: [7],
      output: 5040,
    },
    {
      input: [12],
      output: 479001600,
    },
  ],
};
