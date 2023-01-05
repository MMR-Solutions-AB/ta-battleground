import { router, protectedProcedure } from "../trpc";

export const leaderboardRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    // await ctx.prisma.user.create({
    //   data: {
    //     email: "asasb@asdadasdsdsdasdas.com",
    //     image: "https://avatars.githubusercontent.com/u/1?&v=4",
    //     name: "Tom Preston",
    //     submissions: {
    //       createMany: {
    //         data: [
    //           {
    //             code: "a",
    //             status: "failed",
    //             testCases: {},
    //             problemId: "clc6d2dco0000hjjhivfa71b4",
    //           },
    //         ],
    //       },
    //     },
    //   },
    // });

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

// const x = {
//   100: [
//     [54, 839.08],
//     [55, 836.81],
//     [56, 834.56],
//     [57, 832.34],
//     [58, 830.13],
//     [59, 827.95],
//     [60, 825.79],

//     [1000, 600.0],
//     [900, 600.08],
//     [800, 600.2],
//     [700, 600.51],
//     [600, 601.31],
//     [500, 603.41],
//     [400, 608.84],
//     [300, 622.92],
//     [200, 659.46],
//     [100, 754.22],
//     [90, 769.64],
//   ],
//   50: [
//     [54, 839.08],
//     [55, 836.81],
//     [56, 834.56],
//     [57, 832.34],
//     [58, 830.13],
//     [59, 827.95],
//     [60, 825.79],
//   ],
// } as const;
