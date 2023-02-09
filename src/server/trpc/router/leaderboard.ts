import { router, protectedProcedure } from "../trpc";

export const leaderboardRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        score: true,
        batch: true,
        completedProblems: true,
      },
      orderBy: {
        score: "desc",
      },
    });
  }),
});
