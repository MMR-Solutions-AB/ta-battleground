import type { Problem } from "../../../../Problem";

export const data: Problem<string, number> = {
  name: "Months between",
  difficulty: "medium",
  number: 61,
  arguments: [
    { name: "date1", type: "string" },
    { name: "date2", type: "string" },
  ],
  isHidden: true,
  tags: ["strings", "numbers", "functions"],
  testCases: [
    {
      input: [`"2021-01-01"`, `"2021-03-01"`],
      output: 2,
    },
    {
      input: [`"2021-01-01"`, `"2021-07-01"`],
      output: 6,
    },
    {
      input: [`"2021-01-01"`, `"2021-09-01"`],
      output: 8,
    },
    {
      input: [`"2022-05-01"`, `"2021-03-01"`],
      output: 14,
    },
    {
      input: [`"2022-05-01"`, `"2020-03-01"`],
      output: 26,
    },
    {
      input: [`"2022-05-01"`, `"2021-03-01"`],
      output: 14,
    },
  ],
};
