import type { Problem } from "../../../../Problem";
  
export const data: Problem<string, string> = {
    name: "Human tings",
    difficulty: "easy",
    number: 63,
    arguments: [{name: "s", type: "string"}],
    tags: ["basics", "numbers", "objects"],
    testCases: [
      {
        input: [`"s"`],
        output: "a",
      },
    ],
  };
    