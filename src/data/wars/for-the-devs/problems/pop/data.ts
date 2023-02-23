import type { Problem } from "../../../../Problem";
  
export const data: Problem<string, string> = {
    name: "Pop",
    difficulty: "easy",
    number: 75,
    arguments: [{name: "s", type: "string"}],
    tags: ["strings"],
    testCases: [
      {
        input: [`"s"`],
        output: "a",
      },
    ],
  };
    