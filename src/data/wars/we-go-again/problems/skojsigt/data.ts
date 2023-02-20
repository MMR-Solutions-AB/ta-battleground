import type { Problem } from "../../../../Problem";

export const data: Problem<string, string> = {
  name: "Skojsigt",
  difficulty: "medium",
  number: 64,
  arguments: [{ name: "s", type: "string" }],
  tags: ["objects"],
  testCases: [
    {
      input: [`"s"`],
      output: "a",
    },
  ],
};
