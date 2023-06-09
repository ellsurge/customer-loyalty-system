import { exampleRouter } from "@/server/api/routers/example";
import { router } from "@/server/api/trpc";
import {itemsRouter} from './routers/items'
import { authRouter } from "./routers/userAuth";
import { userRouter } from "./routers/users";
import { ordersRouter } from "./routers/orders";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  example: exampleRouter,
  items: itemsRouter,
  userAuth: authRouter,
  users: userRouter,
  orders: ordersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
