import type {
  Problem as PrismaProblem,
  Tag as PrismaTag,
} from "@prisma/client";

export type Tags = PrismaTag["name"];
export const tags: Tags[] = [
  "basics",
  "strings",
  "numbers",
  "arrays",
  "objects",
  "functions",
];

export const difficulties: Problem<any, any>["difficulty"][] = [
  "easy",
  "medium",
  "hard",
];

type LooseAutocomplete<T extends string> = T | Omit<string, T>;
export type ProblemArgument = {
  name: string;
  type: LooseAutocomplete<
    "string" | "number" | "boolean" | "string[]" | "number[]"
  >;
};

export type TestCase<I = any, O = any> = { input: Array<I>; output: O };
export type ProblemCreate<I = any, O = any> = Omit<
  PrismaProblem,
  "id" | "createdAt" | "updatedAt" | "warId"
> & {
  testCases: TestCase<I, O>[];
  arguments: ProblemArgument[];
  tags: Tags[];
};

export type Problem<I, O> = Omit<ProblemCreate<I, O>, "description" | "warId">;
