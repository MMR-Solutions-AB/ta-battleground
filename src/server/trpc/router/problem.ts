import { z } from "zod";
import { main } from "../../../data/gen";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const problemRouter = router({
  seed: publicProcedure.query(async ({ ctx }) => {
    const problems = await main();
    console.log(problems);

    return ctx.prisma.problem.findMany({});
    // return ctx.prisma.problem.createMany({ data: problems });
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.problem.findMany({
      select: {
        id: true,
        name: true,
        difficulty: true,
        submissions: {
          where: {
            userId: ctx.session.user.id,
          },
          select: {
            status: true,
            createdAt: true,
          },
          orderBy: {
            status: "asc",
          },
          take: 1,
        },
      },
    });
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.problem.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          name: true,
          difficulty: true,
          description: true,
        },
      });
    }),
});
