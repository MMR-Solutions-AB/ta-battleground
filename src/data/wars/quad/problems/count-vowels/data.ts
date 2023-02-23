import type { Problem } from "../../../../Problem";

export const data: Problem<string, number> = {
  name: "Count vowels",
  difficulty: "easy",
  number: 71,
  arguments: [{ name: "s", type: "string" }],
  tags: ["strings"],
  testCases: [
    {
      input: [`"javascript"`],
      output: 3,
    },
    {
      input: [`"techover"`],
      output: 2,
    },
    {
      input: [`"happy"`],
      output: 1,
    },
    {
      input: [`"vowels"`],
      output: 2,
    },
  ],
};
