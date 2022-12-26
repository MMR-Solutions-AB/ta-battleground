import type { Problem as PrismaProblem } from "@prisma/client";

export type TestCase<I, O> = { input: Array<I>; output: O };
export type Problem<I, O> = Omit<
  PrismaProblem,
  "id" | "createdAt" | "updatedAt" | "description"
> & {
  testCases: TestCase<I, O>[];
};

const f: Problem<string, number> = {
  name: "asd",
  difficulty: "easy",
  testCases: [
    {
      input: ["asd", "asd", "asd"],
      output: 21123,
    },
  ],
};

console.log(f);
