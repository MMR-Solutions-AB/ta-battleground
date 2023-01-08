import type { Problem } from "../../Problem";

export const data: Problem<number, number> = {
  name: "Siffersumman",
  difficulty: "easy",
  number: 46,
  arguments: [{ name: "n", type: "number" }],
  tags: ["numbers"],
  testCases: [
    {
      input: [123],
      output: 6,
    },
    {
      input: [91564],
      output: 25,
    },
    {
      input: [0],
      output: 0,
    },
    {
      input: [111111],
      output: 6,
    },
  ],
};
