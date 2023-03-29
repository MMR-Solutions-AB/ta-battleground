import { router, protectedProcedure } from "../trpc";

export const warRouter = router({
  getCurrentWar: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.war.findFirst({
      where: {
        endTime: {
          gt: new Date(),
        },
      },
      orderBy: {
        startTime: "asc",
      },
      select: {
        id: true,
        name: true,
        number: true,
        startTime: true,
        endTime: true,
        problems: {
          select: {
            id: true,
            name: true,
            difficulty: true,
            number: true,
            tags: true,
            topSolution: {
              select: {
                id: true,
                code: true,
                score: true,
                user: {
                  select: {
                    faction: {
                      select: {
                        faction: {
                          select: {
                            id: true,
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            submissions: {
              where: {
                userId: ctx.session.user.id,
              },
              select: {
                status: true,
                score: true,
                code: true,
                createdAt: true,
              },
              orderBy: [
                {
                  score: "desc",
                },
              ],
              take: 1,
            },
          },
          orderBy: {
            number: "asc",
          },
        },
        contenders: {
          select: {
            id: true,
            faction: {
              include: {
                members: {
                  include: {
                    user: {
                      include: {
                        submissions: {
                          distinct: ["problemId"],
                          include: {
                            problem: {
                              select: {
                                warId: true,
                              },
                            },
                          },
                          where: {
                            problem: {
                              war: {
                                endTime: {
                                  gt: new Date(),
                                },
                              },
                            },
                          },
                          orderBy: {
                            score: "desc",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            score: true,
          },
          orderBy: {
            score: "desc",
          },
        },
      },
    });
  }),
});
