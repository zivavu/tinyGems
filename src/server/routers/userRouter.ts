import { auth } from '@/lib/auth';
import { TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

const toggleLikeSchema = z.object({
  id: z.string(),
  type: z.enum(['song', 'album', 'artist']),
});

export const userRouter = createTRPCRouter({
  toggleLike: protectedProcedure.input(toggleLikeSchema).mutation(async ({ ctx, input }) => {
    const { id, type } = input;
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    if (!userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    try {
      const users = ctx.db.collection('users');
      const user = await users.findOne({ id: userId });
      const likes = user?.likes || [];

      const existingLikeIndex = likes.findIndex((like) => like.itemId === id && like.type === type);

      if (existingLikeIndex > -1) {
        likes.splice(existingLikeIndex, 1);
        await users.updateOne({ id: userId }, { $set: { likes } });
        return { liked: false };
      }

      likes.push({ itemId: id, type, createdAt: new Date() });
      await users.updateOne({ id: userId }, { $set: { likes } });
      return { liked: true };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to toggle like',
      });
    }
  }),

  getLikes: protectedProcedure.query(async ({ ctx }) => {
    const userId = (await ctx.session?.$context).session?.user?.id;
    if (!userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',

        message: 'User not authenticated',
      });
    }

    try {
      const likes = await ctx.db.like.findMany({
        where: {
          userId,
        },
        select: {
          itemId: true,
          type: true,
        },
      });

      return likes;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch likes',
      });
    }
  }),
});
