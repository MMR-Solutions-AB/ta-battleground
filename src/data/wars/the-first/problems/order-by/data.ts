import type { Problem } from "../../../../Problem";

export const data: Problem<string, string> = {
  name: "Order-by",
  difficulty: "medium",
  number: 54,
  arguments: [{ name: "s", type: "string" }],
  tags: ["arrays"],
  testCases: [
    {
      input: [`"s"`],
      output: "a",
    },
  ],
};
