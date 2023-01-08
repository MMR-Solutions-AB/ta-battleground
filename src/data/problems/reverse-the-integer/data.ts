import type { Problem } from "../../Problem";

export const data: Problem<number, number> = {
  name: "Reverse the integer",
  difficulty: "medium",
  number: 40,
  arguments: [{ name: "n", type: "number" }],
  tags: ["numbers"],
  testCases: [
    {
      input: [123],
      output: 321,
    },
    {
      input: [-12],
      output: -21,
    },
    {
      input: [81],
      output: 18,
    },
    {
      input: [-40892],
      output: -29804,
    },
  ],
};
