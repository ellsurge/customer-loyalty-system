import { exampleRouter } from "@/server/api/routers/example";
import { router } from "@/server/api/trpc";
import {itemsRouter} from './routers/items'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  example: exampleRouter,
  item: itemsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
