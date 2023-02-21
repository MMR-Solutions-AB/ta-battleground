import type { Problem } from "../../Problem";

export const data: Problem<{ name: string; type: string }[], number> = {
  name: "Obj diff",
  difficulty: "easy",
  number: 64,
  arguments: [{ name: "objects", type: "{name: string, type:string}[]" }],
  isHidden: true,
  tags: ["strings", "arrays", "objects"],
  testCases: [
    {
      input: [
        [
          { name: "leksak 1", type: "bil" },
          { name: "leksak 2", type: "docka" },
          { name: "leksak 3", type: "bil" },
        ],
      ],
      output: 2,
    },
    {
      input: [
        [
          { name: "leksak 1", type: "docka" },
          { name: "leksak 2", type: "docka" },
          { name: "leksak 3", type: "docka" },
        ],
      ],
      output: 1,
    },
    {
      input: [
        [
          { name: "leksak 1", type: "lego" },
          { name: "leksak 2", type: "docka" },
          { name: "leksak 3", type: "bil" },
        ],
      ],
      output: 3,
    },
    {
      input: [
        [
          { name: "leksak 1", type: "skateboard" },
          { name: "leksak 2", type: "lego" },
          { name: "leksak 2", type: "yo-yo" },
          { name: "leksak 2", type: "lego" },
          { name: "leksak 3", type: "bil" },
        ],
      ],
      output: 4,
    },
    {
      input: [
        [
          { name: "leksak 1", type: "rubics cube" },
          { name: "leksak 2", type: "lego" },
          { name: "leksak 3", type: "bil" },
          { name: "leksak 4", type: "yo-yo" },
        ],
      ],
      output: 4,
    },
  ],
};
