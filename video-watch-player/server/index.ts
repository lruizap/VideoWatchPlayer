import { videoCollectionRouter } from "./routers/videoCollection";
import { videosRouter } from "./routers/videos";
import { router } from "./trpc";

export const appRouter = router({
  videos: videosRouter,
  videoCollection: videoCollectionRouter,
});

export type AppRouter = typeof appRouter;
