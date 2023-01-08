import type { Problem } from "../../Problem";

export const data: Problem<string, number> = {
  name: "Score the name",
  difficulty: "easy",
  number: 44,
  arguments: [{ name: "s", type: "string" }],
  tags: ["strings", "numbers"],
  testCases: [
    {
      input: [`"lucio"`],
      output: 60,
    },
    {
      input: [`"abba"`],
      output: 6,
    },
    {
      input: [`"techover"`],
      output: 96,
    },
    {
      input: [`"fredrik"`],
      output: 71,
    },
  ],
};
