import { auth } from '@/lib/auth';
import { TRPCError } from '@trpc/server';
import { ObjectId, type Document } from 'mongodb';
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

    try {
      const users = ctx.db.collection<Document>('users');
      const likeField = `liked${type.charAt(0).toUpperCase() + type.slice(1)}Ids`;

      const userFind = users.find({ _id: new ObjectId(userId) });
      const user = await userFind[0];
      const currentLikes = user?.[likeField] || [];

      if (!user) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'User not found' });
      }

      await users.updateOne(
        { id: userId },

        {
          $set: { [likeField]: currentLikes.includes(id) ? currentLikes.filter((likeId: string) => likeId !== id) : [...currentLikes, id] },
        },
      );

      return { liked: !currentLikes.includes(id) };
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
