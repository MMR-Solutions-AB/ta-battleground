import type { Problem } from "../../Problem";

export const data: Problem<string, string> = {
  name: "Reverse the string",
  difficulty: "easy",
  number: 13,
  arguments: ["s"],
  tags: ["strings"],
  testCases: [
    {
      input: [`"techover"`],
      output: "revohcet",
    },
    {
      input: [`"hello"`],
      output: "olleh",
    },
    {
      input: [`"december"`],
      output: "rebmeced",
    },
    {
      input: [`"racecar"`],
      output: "racecar",
    },
  ],
};
