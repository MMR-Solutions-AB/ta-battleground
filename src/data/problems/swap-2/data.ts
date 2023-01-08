import type { Problem } from "../../Problem";

export const data: Problem<string, string> = {
  name: "Swap 2",
  difficulty: "medium",
  number: 23,
  arguments: [{ name: "s", type: "string" }],
  tags: ["strings"],
  testCases: [
    {
      input: [`"abcd"`],
      output: "badc",
    },
    {
      input: [`"mendes"`],
      output: "emdnse",
    },
    {
      input: [`"gunillas"`],
      output: "uginllsa",
    },
    {
      input: [`"xy"`],
      output: "yx",
    },
  ],
};
