import { createTRPCRouter } from '../trpc';
import { libraryRouter } from './library';

export const appRouter = createTRPCRouter({
  library: libraryRouter,
});

export type AppRouter = typeof appRouter;
