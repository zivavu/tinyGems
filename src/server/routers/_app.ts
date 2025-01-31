import { router } from '../trpc';
import { gemRouter } from './gem';
import { testRouter } from './test';

export const appRouter = router({
  gem: gemRouter,
  test: testRouter,
});

export type AppRouter = typeof appRouter;
