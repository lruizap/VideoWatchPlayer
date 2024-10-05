import { videoCollectionRouter } from "./routers/videoCollection";
import { videosRouter } from "./routers/videos";
import { router } from "./trpc";

export const appRouter = router({
  videos: videosRouter,

  get_videos: videosRouter.get,
  get_video: videosRouter.get_video,
  add_video: videosRouter.create,

  videoCollection: videoCollectionRouter,

  get_collections: videoCollectionRouter.get,
  get_collection: videoCollectionRouter.get_collection,
  add_collection: videoCollectionRouter.create,
});

export type AppRouter = typeof appRouter;
