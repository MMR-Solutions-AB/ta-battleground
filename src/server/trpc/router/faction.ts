import { router, protectedProcedure } from "../trpc";

export const factionRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.faction.findMany({
      select: {
        id: true,
        name: true,
        members: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        allTimeScore: true,
      },
    });
  }),
});
