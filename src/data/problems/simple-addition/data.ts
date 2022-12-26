import type { Problem } from "../../Problem";

export const data: Problem<number, number> = {
  name: "Simple Addition",
  difficulty: "easy",
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
