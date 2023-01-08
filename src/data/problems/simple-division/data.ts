import type { Problem } from "../../Problem";

export const data: Problem<number, number> = {
  name: "Simple division",
  difficulty: "easy",
  number: 3,
  arguments: [
    { name: "a", type: "number" },
    { name: "b", type: "number" },
  ],
  tags: ["basics", "numbers"],
  testCases: [
    {
      input: [10, 5],
      output: 2,
    },
    {
      input: [100, 4],
      output: 25,
    },
    {
      input: [169, 13],
      output: 13,
    },
  ],
};
