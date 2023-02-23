import type { Problem } from "../../../../Problem";
  
export const data: Problem<string, string> = {
    name: "Test",
    difficulty: "medium",
    number: 74,
    arguments: [{name: "s", type: "string"}],
    tags: ["strings", "numbers"],
    testCases: [
      {
        input: [`"s"`],
        output: "a",
      },
    ],
  };
    