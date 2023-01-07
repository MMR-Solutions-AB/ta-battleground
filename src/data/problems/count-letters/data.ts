import type { Problem } from "../../Problem";

export const data: Problem<string, number> = {
  name: "Count letters",
  difficulty: "easy",
  number: 45,
  arguments: ["letter", "s"],
  tags: ["strings"],
  testCases: [
    {
      input: [`"e"`, `"techover"`],
      output: 2,
    },
    {
      input: [`"a"`, `"pizza"`],
      output: 1,
    },
    {
      input: [`"k"`, `"abba"`],
      output: 0,
    },
    {
      input: [`"l"`, `"lolol"`],
      output: 3,
    },
  ],
};
