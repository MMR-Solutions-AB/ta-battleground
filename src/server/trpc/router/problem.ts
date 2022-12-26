import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const problemRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.problem.findMany();
  }),
});
