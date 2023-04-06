import type { Problem } from "../../../../Problem";

export const data: Problem<string, boolean> = {
  name: "Validate parentheses",
  difficulty: "hard",
  number: 64,
  arguments: [{ name: "s", type: "string" }],
  tags: ["strings"],
  testCases: [
    {
      input: [`"({})"`],
      output: true,
    },
    {
      input: [`"({}[({})])"`],
      output: true,
    },
    {
      input: [`"{]}"`],
      output: false,
    },
    {
      input: [`"{}"`],
      output: true,
    },
    {
      input: [`"([}{((("`],
      output: false,
    },
    {
      input: [`"{{}}[{()}()]"`],
      output: true,
    },
    {
      input: [`"({])"`],
      output: false,
    },
  ],
};
