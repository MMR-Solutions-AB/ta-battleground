import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import type { Tags } from "@/data/Problem";
import _ from "lodash";
import { tags as allTags } from "@/data/Problem";

export const problemRouter = router({
  getAll: protectedProcedure
    .input(
      z.object({
        sortBy: z.string().optional(),
        order: z.string().optional(),
        tags: z.array(z.string()).nullable(),
      })
    )
    .query(({ ctx, input }) => {
      const { sortBy, order, tags } = input;

      const validOrdering = z.object({
        sortBy: z.enum(["name", "number", "difficulty", "submissions"]),
        order: z.enum(["asc", "desc"]),
      });

      const isValidOrdering = validOrdering.safeParse({
        sortBy,
        order,
      }).success;

      const validTags = _.intersection(allTags, tags) as Tags[] | undefined;

      return ctx.prisma.problem.findMany({
        where: {
          AND: [
            {
              // don't show problems where the war has not started yet
              OR: [
                { war: null },
                {
                  war: {
                    startTime: { lt: new Date() },
                  },
                },
              ],
            },
            validTags && validTags.length > 0
              ? {
                  tags: {
                    some: {
                      name: { in: validTags },
                    },
                  },
                }
              : {},
          ],
        },
        select: {
          id: true,
          name: true,
          number: true,
          difficulty: true,
          war: {
            select: {
              id: true,
              name: true,
            },
          },
          topSolution: {
            select: {
              code: true,
              score: true,
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
          tags: {
            select: {
              id: true,
              name: true,
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
              batch: true,
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
      return ctx.prisma.problem.findFirstOrThrow({
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
          submissions: {
            // för att hämta den senaste koden och visa det som start kod istället för den vanliga start koden
            where: { userId: ctx.session.user.id },
            select: {
              code: true,
            },
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
          },
          war: {
            select: {
              id: true,
              name: true,
            },
          },
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
});
