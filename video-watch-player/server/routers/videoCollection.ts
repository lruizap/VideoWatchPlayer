import { publicProcedure, router } from "../trpc";
import { z } from "zod";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const videoCollectionRouter = router({
  get: publicProcedure.query(async () => {
    return prisma.videoCollection.findMany();
  }),

  get_collection: publicProcedure
    .input(
      z.object({
        id: z.string().transform((val) => Number(val)),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return prisma.videoCollection.findUnique({
        where: {
          id: input.id,
        },
        include: {
          videos: true,
        },
      });
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return prisma.videoCollection.findUnique({
        where: {
          id: input.id,
        },
        include: {
          videos: true,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.videoCollection.create({
        data: {
          title: input.title,
          description: input.description,
        },
      });
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.videoCollection.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
