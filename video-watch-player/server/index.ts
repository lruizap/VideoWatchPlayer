import { videoCollectionRouter } from "./routers/videoCollection";
import { videosRouter } from "./routers/videos";
import { router } from "./trpc";

export const appRouter = router({
  videoCollection: videoCollectionRouter,
  videos: videosRouter,
});

export type AppRouter = typeof appRouter;
