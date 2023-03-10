import type { Problem } from "../../Problem";

export const data: Problem<number, number> = {
  name: "Simple multiplication",
  difficulty: "easy",
  number: 4,
  arguments: [
    { name: "a", type: "number" },
    { name: "b", type: "number" },
  ],
  tags: ["basics", "numbers"],
  testCases: [
    {
      input: [1, 2],
      output: 2,
    },
    {
      input: [100, 12],
      output: 1200,
    },
    {
      input: [87, 0],
      output: 0,
    },
    {
      input: [3, 3],
      output: 9,
    },
  ],
};
