import type { Problem } from "../../Problem";

export const data: Problem<number | string, number> = {
  name: "Counting Valleys",
  difficulty: "medium",
  number: 4,
  arguments: ["s", "path"],
  tags: ["strings"],
  testCases: [
    {
      input: [8, `"UNNNUNUU"`],
      output: 1,
    },
    {
      input: [6, `"NUNUNU"`],
      output: 3,
    },
    {
      input: [26, `"NNUNUUUUNNUUNNUNUNUNUNUNNU"`],
      output: 2,
    },
    {
      input: [16, `"UUUUUUUUNNNNNNNN"`],
      output: 0,
    },
    {
      input: [48, `"NUNUNUNUNUNUNUNUNUNUNUNUNUNUNUNUNNUNNUNUNUNUNUUU"`],
      output: 17,
    },
  ],
};
