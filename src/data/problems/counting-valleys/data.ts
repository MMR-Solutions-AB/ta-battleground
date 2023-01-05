import type { Problem } from "../../Problem";
[].reduce;
export const data: Problem<string, number> = {
  name: "Counting Valleys",
  difficulty: "medium",
  number: 4,
  arguments: ["path"],
  tags: ["strings"],
  testCases: [
    {
      input: [`"UNNNUNUU"`],
      output: 1,
    },
    {
      input: [`"NUNUNU"`],
      output: 3,
    },
    {
      input: [`"NNUNUUUUNNUUNNUNUNUNUNUNNU"`],
      output: 2,
    },
    {
      input: [`"UUUUUUUUNNNNNNNN"`],
      output: 0,
    },
    {
      input: [`"NUNUNUNUNUNUNUNUNUNUNUNUNUNUNUNUNNUNNUNUNUNUNUUU"`],
      output: 17,
    },
  ],
};
