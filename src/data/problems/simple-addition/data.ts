import type { Problem } from "../../Problem";

export const data: Problem<number, number> = {
  name: "Simple addition",
  difficulty: "easy",
  number: 1,
  arguments: [
    { name: "a", type: "number" },
    { name: "b", type: "number" },
  ],
  tags: ["basics", "numbers"],
  testCases: [
    {
      input: [1, 2],
      output: 3,
    },
    {
      input: [100, 12],
      output: 112,
    },
    {
      input: [87, 0],
      output: 87,
    },
  ],
};
