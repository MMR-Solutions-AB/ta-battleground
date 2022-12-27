import { router } from "../trpc";
import { authRouter } from "./auth";
import { executeRouter } from "./execute";
import { problemRouter } from "./problem";

export const appRouter = router({
  auth: authRouter,
  execute: executeRouter,
  problem: problemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
