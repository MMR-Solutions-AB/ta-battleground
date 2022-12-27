import type { Problem as PrismaProblem } from "@prisma/client";

export type TestCase<I, O> = { input: Array<I>; output: O };
export type ProblemCreate<I, O> = Omit<
  PrismaProblem,
  "id" | "createdAt" | "updatedAt"
> & {
  testCases: TestCase<I, O>[];
};
export type Problem<I, O> = Omit<ProblemCreate<I, O>, "description">;
