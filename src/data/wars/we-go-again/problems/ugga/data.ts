import type { Problem } from "../../../../Problem";
  
export const data: Problem<string, string> = {
    name: "Ugga",
    difficulty: "medium",
    number: 60,
    arguments: [{name: "s", type: "string"}],
    tags: ["numbers", "objects", "strings"],
    testCases: [
      {
        input: [`"s"`],
        output: "a",
      },
    ],
  };
    