import type { Problem } from "../../../../Problem";

export const data: Problem<string | string[], number> = {
  name: "Water borne",
  difficulty: "easy",
  number: 74,
  arguments: [
    { name: "transport", type: "string" },
    { name: "hamn", type: "string[]" },
  ],
  tags: ["strings", "arrays"],
  testCases: [
    {
      input: [`"båt"`, ["fartyg", "båt", "kryssningsfartyg", "båt"]],
      output: 2,
    },
    {
      input: [
        `"kryssningsfartyg"`,
        ["fartyg", "båt", "kryssningsfartyg", "båt", "färja"],
      ],
      output: 1,
    },
    {
      input: [`"färja"`, ["färja", "båt", "kryssningsfartyg", "kajak"]],
      output: 1,
    },
    {
      input: [
        `"kajak"`,
        ["kajak", "båt", "kryssningsfartyg", "båt", "kajak", "färja"],
      ],
      output: 2,
    },
    {
      input: [
        `"båt"`,
        ["fartyg", "båt", "fartyg", "kajak", "båt", "fartyg", "fartyg"],
      ],
      output: 4,
    },
  ],
};
