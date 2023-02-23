import type { Problem } from "../../../../Problem";

export const data: Problem<string[], string> = {
  name: "Prefix",
  difficulty: "medium",
  number: 67,
  arguments: [{ name: "s", type: "string[]" }],
  isHidden: true,
  tags: ["strings", "arrays"],
  testCases: [
    {
      input: [["cartier", "car", "camera"]],
      output: "ca",
    },
    {
      input: [["flower", "flow", "flight"]],
      output: "fl",
    },
    {
      input: [["dog", "racecar", "car"]],
      output: "",
    },
    {
      input: [["abcdefgh", "abcdefg", "abcdef"]],
      output: "abcdef",
    },
  ],
};
