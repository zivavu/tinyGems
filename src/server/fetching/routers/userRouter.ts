import { protectedProcedure } from '@/server/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createTRPCRouter } from '../trpc';

export const likeTypeEnum = z.enum(['song', 'album', 'artist']);
export type LikeType = z.infer<typeof likeTypeEnum>;

interface LikeDocument {
  userId: string;

  itemId: string;
  type: LikeType;
  createdAt: Date;
}

const toggleLikeSchema = z.object({
  id: z.string(),
  type: likeTypeEnum,
});

export const userRouter = createTRPCRouter({
  toggleLike: protectedProcedure.input(toggleLikeSchema).mutation(async ({ ctx, input }) => {
    const { id, type } = input;
    const { userId } = ctx;

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

  getLikes: protectedProcedure.input(z.object({ type: likeTypeEnum })).query(async ({ ctx, input }) => {
    const { type } = input;
    const { userId } = ctx;

    try {
      const likes = ctx.db.collection<LikeDocument>('likes');

      const userLikes: LikeDocument[] = await likes.find({ userId, type }).toArray();

      return userLikes.map((like) => like.itemId);
    } catch (error) {
      console.error('Detailed error:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch likes',
      });
    }
  }),
});
