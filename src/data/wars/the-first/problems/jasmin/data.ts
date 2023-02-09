import type { Problem } from "../../../../Problem";
  
export const data: Problem<string, string> = {
    name: "Jasmin",
    difficulty: "medium",
    number: 58,
    arguments: [{name: "s", type: "string"}],
    tags: ["arrays", "basics", "strings"],
    testCases: [
      {
        input: [`"s"`],
        output: "a",
      },
    ],
  };
    