import { createTRPCRouter } from '../trpc';
import { userRouter } from './userRouter';

export const appRouter = createTRPCRouter({
  userRouter,
});

export type AppRouter = typeof appRouter;
