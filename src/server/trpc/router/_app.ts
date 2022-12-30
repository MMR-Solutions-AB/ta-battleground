import { router } from "../trpc";
import { authRouter } from "./auth";
import { executeRouter } from "./execute";
import { leaderboardRouter } from "./leaderboard";
import { problemRouter } from "./problem";

export const appRouter = router({
  auth: authRouter,
  execute: executeRouter,
  leaderboard: leaderboardRouter,
  problem: problemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
