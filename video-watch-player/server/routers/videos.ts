import { publicProcedure, router } from "../trpc";
import { set, z } from "zod";

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
      await prisma.video.delete({
        where: {
          id: input.id,
        },
      });
    }),

  like: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.video.update({
        data: {
          likes: {
            increment: 1,
          },
        },
        where: {
          id: input.id,
        },
      });
    }),

  dislike: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const video = await prisma.video.findUnique({
        where: {
          id: input.id,
        },
        select: {
          likes: true,
        },
      });

      if (video && video.likes > 0) {
        await prisma.video.update({
          data: {
            likes: {
              decrement: 1,
            },
          },
          where: {
            id: input.id,
          },
        });
      }
    }),

  view: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const video = await prisma.video.update({
        where: { id: input.id },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    }),
});
