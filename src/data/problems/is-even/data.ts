import type { Problem } from "../../Problem";

export const data: Problem<number, boolean> = {
  name: "Is even",
  difficulty: "easy",
  number: 8,
  arguments: ["n"],
  tags: ["basics", "numbers"],
  testCases: [
    {
      input: [4],
      output: true,
    },
    {
      input: [5],
      output: false,
    },
    {
      input: [10],
      output: true,
    },
    {
      input: [41],
      output: false,
    },
  ],
};
