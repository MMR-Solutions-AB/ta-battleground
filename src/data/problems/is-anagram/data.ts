import type { Problem } from "../../Problem";

export const data: Problem<string, boolean> = {
  name: "Is anagram",
  difficulty: "medium",
  number: 48,
  arguments: [
    { name: "s1", type: "string" },
    { name: "s2", type: "string" },
  ],
  tags: ["strings"],
  testCases: [
    {
      input: [`"anagram"`, `"nagaram"`],
      output: true,
    },
    {
      input: [`"bil"`, `"sil"`],
      output: false,
    },
    {
      input: [`"matheus"`, `"suehtam"`],
      output: true,
    },
    {
      input: [`"gunnart"`, `"frank"`],
      output: false,
    },
  ],
};
