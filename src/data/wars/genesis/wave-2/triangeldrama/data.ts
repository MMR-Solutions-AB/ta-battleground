import type { Problem } from "../../../../Problem";

export const data: Problem<number, string> = {
  name: "Triangeldrama",
  difficulty: "hard",
  number: 63,
  arguments: [
    { name: "a", type: "number" },
    { name: "b", type: "number" },
    { name: "c", type: "number" },
  ],
  tags: ["strings", "numbers"],
  testCases: [
    {
      input: [2, 2, 2],
      output: "liksidig",
    },
    {
      input: [3, 4, 4],
      output: "likbent",
    },
    {
      input: [3, 4, 5],
      output: "oliksidig",
    },
    {
      input: [7, 1, 1],
      output: "no",
    },
    {
      input: [4, 4, 4],
      output: "liksidig",
    },
    {
      input: [42, 29, 40],
      output: "oliksidig",
    },
    {
      input: [9, 7, 9],
      output: "likbent",
    },
    {
      input: [49, 20, 1],
      output: "no",
    },
  ],
};
