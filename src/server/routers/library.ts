import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

const toggleLikeSchema = z.object({
  id: z.string(),
  type: z.enum(['song', 'album', 'artist']),
});

export const libraryRouter = createTRPCRouter({
  toggleLike: protectedProcedure.input(toggleLikeSchema).mutation(async ({ ctx, input }) => {
    const { id, type } = input;

    // Better-Auth session access
    if (!(await ctx.session?.$context).session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not authenticated',
      });
    }

    const userId = (await ctx.session?.$context).session?.user.id;

    try {
      // Check if like exists
      const existingLike = await ctx.db.like.findFirst({
        where: {
          userId,
          itemId: id,
          type,
        },
      });

      if (existingLike) {
        // Unlike
        await ctx.db.like.delete({
          where: {
            id: existingLike.id,
          },
        });
        return { liked: false };
      } else {
        // Like
        await ctx.db.like.create({
          data: {
            userId,
            itemId: id,
            type,
          },
        });
        return { liked: true };
      }
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to toggle like',
      });
    }
  }),

  getLikes: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user?.id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not authenticated',
      });
    }

    const userId = ctx.session.user.id;

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
