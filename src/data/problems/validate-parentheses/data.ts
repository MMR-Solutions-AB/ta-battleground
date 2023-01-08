import type { Problem } from "../../Problem";

export const data: Problem<string, boolean> = {
  name: "Validate parentheses",
  difficulty: "medium",
  number: 27,
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
      input: [`"([}{((("`],
      output: false,
    },
  ],
};
