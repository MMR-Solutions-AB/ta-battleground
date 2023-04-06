import type { Problem } from "../../../../Problem";

export const data: Problem<string, number> = {
  name: "Count vowels",
  difficulty: "easy",
  number: 61,
  arguments: [{ name: "s", type: "string" }],
  tags: ["strings"],
  testCases: [
    {
      input: [`"javascript"`],
      output: 3,
    },
    {
      input: [`"techover"`],
      output: 3,
    },
    {
      input: [`"happy"`],
      output: 1,
    },
    {
      input: [`"bbc"`],
      output: 0,
    },
    {
      input: [`"aeiou"`],
      output: 5,
    },
    {
      input: [`"vowels"`],
      output: 2,
    },
  ],
};
