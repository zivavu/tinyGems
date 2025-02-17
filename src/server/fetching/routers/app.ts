import { externalArtistDataRouter } from '@/server/features/externalArtistDataRouter';
import { createTRPCRouter } from '../trpc';
import { userRouter } from './userRouter';

export const appRouter = createTRPCRouter({
  userRouter,
  externalArtistDataRouter,
});

export type AppRouter = typeof appRouter;
