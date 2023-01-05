import type { Problem } from "@/data/Problem";

export function generateScoreForProblem(
  codeLength: number,
  completed: boolean,
  difficulty: Problem<any, any>["difficulty"]
): number {
  if (!completed) return 0;

  const baseScore =
    difficulty === "hard" ? 500 : difficulty === "medium" ? 250 : 0;

  const addedScore = 3500 / (codeLength * 0.75);

  return Number((baseScore + addedScore + 600).toFixed(2));
}

// b = 0.25
// a = 3500

// 0.75
// 11 000
