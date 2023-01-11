import type { Problem } from "../../Problem";

export const data: Problem<number, boolean> = {
  name: "Is prime",
  difficulty: "easy",
  number: 10,
  arguments: [{ name: "n", type: "number" }],
  tags: ["numbers"],
  testCases: [
    {
      input: [5],
      output: true,
    },
    {
      input: [6],
      output: false,
    },
    {
      input: [14],
      output: false,
    },
    {
      input: [29],
      output: true,
    },
    {
      input: [97],
      output: true,
    },
  ],
};
