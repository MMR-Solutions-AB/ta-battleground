import type { Problem } from "../../../../Problem";

export const data: Problem<number, string> = {
  name: "Triangeldrama",
  difficulty: "medium",
  number: 64,
  arguments: [
    { name: "a", type: "number" },
    { name: "b", type: "number" },
    { name: "c", type: "number" },
  ],
  tags: ["strings", "numbers"],
  testCases: [
    {
      input: [3, 4, 4],
      output: "likbent",
    },
    {
      input: [3, 3, 3],
      output: "liksidig",
    },
    {
      input: [3, 4, 5],
      output: "oliksidig",
    },
    {
      input: [4, 4, 4],
      output: "liksidig",
    },
    {
      input: [7, 3, 2],
      output: "Inte en triangel",
    },
  ],
};
