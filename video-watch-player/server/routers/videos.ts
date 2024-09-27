import { publicProcedure, router } from "../trpc";
import { z } from "zod";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const videosRouter = router({
  get: publicProcedure.query(async () => {
    return prisma.video.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        url: z.string(),
        videoCollectionId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.video.create({
        data: {
          title: input.title,
          description: input.description,
          url: input.url,
          videoCollectionId: input.videoCollectionId,
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
      prisma.video.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
