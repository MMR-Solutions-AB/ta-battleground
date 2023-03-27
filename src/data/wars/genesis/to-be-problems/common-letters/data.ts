import type { Problem } from "../../../../Problem";

export const data: Problem<string, string> = {
  name: "Common letters",
  difficulty: "medium",
  number: 70,
  arguments: [
    { name: "s1", type: "string" },
    { name: "s2", type: "string" },
  ],
  tags: ["strings", "functions"],
  testCases: [
    {
      input: [`"abcdef"`, `"defghij"`],
      output: "def",
    },
    {
      input: [`"hello"`, `"world"`],
      output: "lo",
    },
    {
      input: [`"matheus"`, `"mendes"`],
      output: "ems",
    },
    {
      input: [`"jakob"`, `"kebede"`],
      output: "bk",
    },
  ],
};
