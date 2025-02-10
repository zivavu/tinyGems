import { auth } from '@/lib/auth';
import { TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

interface LikeDocument {
  userId: string;
  itemId: string;
  type: 'song' | 'album' | 'artist';
  createdAt: Date;
}

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
      const likes = ctx.db.collection<LikeDocument>('likes');

      const existingLike = await likes.findOne({
        userId,
        itemId: id,
        type,
      });

      if (existingLike) {
        await likes.deleteOne({ userId, itemId: id, type });
        return { success: true, isLiked: false };
      }

      await likes.insertOne({
        userId,
        itemId: id,
        type,
        createdAt: new Date(),
      });

      return { success: true, isLiked: true };
    } catch (error) {
      console.error('Detailed error:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to toggle like',
      });
    }
  }),

  getLikes: protectedProcedure.query(async ({ ctx }) => {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    try {
      const likes = ctx.db.collection<LikeDocument>('likes');

      const userLikes = await likes.find({ userId }).toArray();

      return {
        songs: userLikes.filter((like) => like.type === 'song').map((like) => like.itemId),
        albums: userLikes.filter((like) => like.type === 'album').map((like) => like.itemId),
        artists: userLikes.filter((like) => like.type === 'artist').map((like) => like.itemId),
      };
    } catch (error) {
      console.error('Detailed error:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch likes',
      });
    }
  }),
});
