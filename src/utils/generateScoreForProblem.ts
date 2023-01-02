import type { Problem } from "@/data/Problem";

export function generateScoreForProblem(
  codeLength: number,
  completed: boolean,
  difficulty: Problem<any, any>["difficulty"]
): number {
  if (!completed) return 0;

  const baseScore =
    difficulty === "hard" ? 350 : difficulty === "medium" ? 200 : 0;

  const addedScore = parseFloat((400 * ((400 - codeLength) / 193)).toFixed(2));

  return baseScore + addedScore;
}
