import { publicProcedure, router } from "../trpc";

export const videosRouter = router({
  get: publicProcedure.query(() => {
    return ["orc"];
  }),
});
