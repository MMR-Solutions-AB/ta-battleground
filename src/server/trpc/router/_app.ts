import { router } from "../trpc";
import { authRouter } from "./auth";
import { problemRouter } from "./problem";

export const appRouter = router({
  problem: problemRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
