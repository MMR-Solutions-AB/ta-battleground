import type { Problem } from "../../Problem";

export const data: Problem<string, string> = {
  name: "First unique character",
  difficulty: "medium",
  number: 35,
  arguments: [{ name: "s", type: "string" }],
  tags: ["strings", "arrays", "objects"],
  testCases: [
    {
      input: [`"abcba"`],
      output: "c",
    },
    {
      input: [`"skrtskrt"`],
      output: "none",
    },
    {
      input: [`"mamamia"`],
      output: "i",
    },
    {
      input: [`"fredrik"`],
      output: "f",
    },
  ],
};
