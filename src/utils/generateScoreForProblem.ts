import type { Problem } from "@/data/Problem";

export function generateScoreForProblem(
  codeLength: number,
  completed: boolean,
  difficulty: Problem<any, any>["difficulty"]
): number {
  if (!completed) return 0;

  const baseScore =
    difficulty === "hard" ? 500 : difficulty === "medium" ? 300 : 50;

  const addedScore = parseFloat((500 * ((550 - codeLength) / 400)).toFixed(2));

  return baseScore + addedScore;
}
