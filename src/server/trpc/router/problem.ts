import { z } from "zod";
import { main } from "../../../data/gen";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const problemRouter = router({
  getAll: protectedProcedure
    .input(
      z.object({
        sortBy: z.string().optional(),
        order: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      const { sortBy, order } = input;
      console.log(sortBy, order);

      const validOrdering = z.object({
        sortBy: z.enum(["name", "number", "difficulty", "submissions"]),
        order: z.enum(["asc", "desc"]),
      });

      const isValidOrdering = validOrdering.safeParse({
        sortBy,
        order,
      }).success;
      console.log(isValidOrdering);

      return ctx.prisma.problem.findMany({
        select: {
          id: true,
          name: true,
          number: true,
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
          _count: {
            select: {
              submissions: true,
            },
          },
        },
        orderBy: !isValidOrdering
          ? {
              number: "asc",
            }
          : sortBy === "submissions"
          ? {
              submissions: {
                _count: order as z.infer<typeof validOrdering>["order"],
              },
            }
          : {
              [sortBy as z.infer<typeof validOrdering>["sortBy"]]:
                order as z.infer<typeof validOrdering>["order"],
            },
      });
    }),
  getLeaderboard: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.submission.findMany({
        where: { problemId: input.id },
        distinct: ["userId"],
        select: {
          id: true,
          code: true,
          score: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: [
          {
            score: "desc",
          },
          { createdAt: "asc" },
        ],
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
          arguments: true,
          number: true,
        },
      });
    }),
  getMySubmissions: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.submission.findMany({
        where: {
          userId: ctx.session.user.id,
          problemId: input.id,
        },
        select: {
          id: true,
          code: true,
          updatedAt: true,
          status: true,
          testCases: true,
          score: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 30,
      });
    }),
  seed: publicProcedure.query(async ({ ctx }) => {
    // const problems = await main();
    // console.log(problems);
    // console.log("HEEEEEJE");
    // console.log(":;;;;;;;;;;;;;;;;;;;;;");

    // for (let i = 0; i < problems.length; i++) {
    //   const problem = problems[i];
    //   if (!problem) continue;
    //   console.log({
    //     description: problem.description,
    //     name: problem.name,
    //     testCases: problem.testCases,
    //     arguments: problem.arguments,
    //     number: problem.number,
    //     difficulty: problem.difficulty,
    //   });

    // await ctx.prisma.problem.upsert({
    //   where: { number: problem.number },
    //   update: {
    //     description: problem.description,
    //     name: problem.name,
    //     testCases: problem.testCases,
    //     arguments: problem.arguments,
    //     number: problem.number,
    //     difficulty: problem.difficulty,
    //   },
    //   create: {
    //     description: problem.description,
    //     name: problem.name,
    //     arguments: problem.arguments,
    //     testCases: problem.testCases,
    //     number: problem.number,
    //     difficulty: problem.difficulty,
    //   },
    // });
    // }

    return ctx.prisma.problem.findMany({});
    // return ctx.prisma.problem.createMany({ data: problems });
  }),
});
