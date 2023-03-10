import { router } from "../trpc";
import { authRouter } from "./auth";
import { executeRouter } from "./execute";
import { factionRouter } from "./faction";
import { leaderboardRouter } from "./leaderboard";
import { problemRouter } from "./problem";
import { userRouter } from "./user";
import { warRouter } from "./war";

export const appRouter = router({
  auth: authRouter,
  execute: executeRouter,
  user: userRouter,
  war: warRouter,
  faction: factionRouter,
  leaderboard: leaderboardRouter,
  problem: problemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
