import type { Problem } from "../../../../Problem";

export const data: Problem<
  { [key: string]: number },
  { [key: number]: string[] }
> = {
  name: "Objectively freaky friday",
  difficulty: "medium",
  number: 62,
  arguments: [{ name: "d", type: "Object.<string, number>" }],
  tags: ["strings", "objects"],
  testCases: [
    {
      input: [{ a: 1, b: 2, c: 1 }],
      output: { 1: ["a", "c"], 2: ["b"] },
    },
    {
      input: [{ abc: 12, skrt: 44 }],
      output: { 12: ["abc"], 44: ["skrt"] },
    },
    {
      input: [{ dede: 9, lol: 9, popo: 9, matu: 9 }],
      output: { 9: ["dede", "lol", "popo", "matu"] },
    },
  ],
};
