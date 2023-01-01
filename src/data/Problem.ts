import type { Problem as PrismaProblem } from "@prisma/client";

export type TestCase<I = any, O = any> = { input: Array<I>; output: O };
export type ProblemCreate<I = any, O = any> = Omit<
  PrismaProblem,
  "id" | "createdAt" | "updatedAt"
> & {
  testCases: TestCase<I, O>[];
  arguments: string[];
};
export type Problem<I, O> = Omit<ProblemCreate<I, O>, "description">;
