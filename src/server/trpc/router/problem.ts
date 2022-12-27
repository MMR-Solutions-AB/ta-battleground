import { z } from "zod";
import { main } from "../../../data/gen";
import { router, publicProcedure } from "../trpc";

export const problemRouter = router({
  seed: publicProcedure.query(async ({ ctx }) => {
    const problems = await main();
    console.log(problems);

    return ctx.prisma.problem.findMany({});
    // return ctx.prisma.problem.createMany({ data: problems });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.problem.findMany({
      select: {
        id: true,
        name: true,
        difficulty: true,
        submissions: {
          where: {
            status: "completed",
          },
          select: {
            createdAt: true,
          },
        },
      },
    });
  }),
});
