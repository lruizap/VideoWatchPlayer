import { videoCollectionRouter } from "./routers/videoCollection";
import { videosRouter } from "./routers/videos";
import { router } from "./trpc";

export const appRouter = router({
  videos: videosRouter,

  get_videos: videosRouter.get,
  get_video: videosRouter.get_video,

  videoCollection: videoCollectionRouter,

  get_collections: videoCollectionRouter.get,
  get_collection: videoCollectionRouter.get_collection,
});

export type AppRouter = typeof appRouter;
