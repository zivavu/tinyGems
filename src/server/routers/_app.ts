import { router } from '../trpc';
import { testRouter } from './test';

export const appRouter = router({
  test: testRouter,
});

export type AppRouter = typeof appRouter;
