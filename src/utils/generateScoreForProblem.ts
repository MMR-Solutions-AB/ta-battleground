import type { Problem } from "@/data/Problem";

export function generateScoreForProblem(
  codeLength: number,
  completed: boolean,
  difficulty: Problem<any, any>["difficulty"]
): number {
  if (!completed) return 0;

  const baseScore =
    difficulty === "hard" ? 600 : difficulty === "medium" ? 400 : 200;

  const addedScore = 200 * ((800 - codeLength) / 800);

  return baseScore + addedScore;
}
