import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findMany({
        where: { id: input.id },
        select: {
          id: true,
          _count: {
            select: {
              accounts: {
                where: {
                  userId: { not: input.id },
                },
              },
            },
          },
          image: true,
          github_login: true,
          completedProblems: true,
          name: true,
          score: true,
          batch: true,
          createdAt: true,
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
                },
              },
            },
            distinct: ["problemId"],
            orderBy: {
              score: "desc",
            },
          },
        },
        take: 1,
      });

      if (!user[0]) return null;

      const rank = await ctx.prisma.user.count({
        where: {
          score: {
            gt: user[0].score,
          },
        },
      });

      return { ...user[0], rank };
    }),
});
