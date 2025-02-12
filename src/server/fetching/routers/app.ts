import { externalArtistRouter } from '@/server/features/externalArtistRouter';
import { createTRPCRouter } from '../trpc';
import { userRouter } from './userRouter';

export const appRouter = createTRPCRouter({
  userRouter,
  artistRouter: externalArtistRouter,
});

export type AppRouter = typeof appRouter;
