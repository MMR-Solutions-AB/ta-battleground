import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: { id: input.id },
        select: {
          id: true,
          image: true,
          github_login: true,
          completedProblems: true,
          name: true,
          score: true,
          batch: true,
          createdAt: true,
          faction: {
            select: {
              createdAt: true,
              faction: {
                select: {
                  allTimeScore: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
          submissions: {
            select: {
              id: true,
              code: true,
              createdAt: true,
              score: true,
              status: true,
              problem: {
                select: {
                  id: true,
                  name: true,
                  number: true,
                  difficulty: true,
                  tags: true,
                  war: true,
                },
              },
            },
            distinct: ["problemId"],
            orderBy: {
              score: "desc",
            },
          },
        },
      });

      const totalUsers = await ctx.prisma.user.count({});

      const rank = await ctx.prisma.user.count({
        where: {
          score: {
            gt: user.score,
          },
        },
      });

      return { ...user, rank, totalUsers };
    }),
  updateBatch: protectedProcedure
    .input(z.object({ batch: z.number().gt(0) }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: { batch: input.batch },
      });

      return user;
    }),
});
