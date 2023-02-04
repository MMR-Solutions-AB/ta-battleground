import type { War as PrismaWar } from "@prisma/client";

export type WarCreate = Omit<PrismaWar, "id" | "createdAt" | "updatedAt">;
