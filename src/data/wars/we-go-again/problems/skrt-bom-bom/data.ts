import type { Problem } from "../../../../Problem";

export const data: Problem<string, string> = {
  name: "Skrt bom bom",
  difficulty: "easy",
  number: 62,
  arguments: [{ name: "s", type: "string" }],
  tags: ["numbers", "objects", "strings", "functions"],
  testCases: [
    {
      input: [`"s"`],
      output: "a",
    },
  ],
};
