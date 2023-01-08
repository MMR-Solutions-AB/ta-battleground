import type { Problem } from "../../Problem";

export const data: Problem<number, boolean> = {
  name: "Is positive",
  difficulty: "easy",
  number: 9,
  arguments: [{ name: "n", type: "number" }],
  tags: ["basics", "numbers"],
  testCases: [
    {
      input: [4],
      output: true,
    },
    {
      input: [-5],
      output: false,
    },
    {
      input: [9],
      output: true,
    },
    {
      input: [-9],
      output: false,
    },
  ],
};
