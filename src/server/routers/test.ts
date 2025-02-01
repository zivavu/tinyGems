import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const testRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name ?? 'World'}!`,
        time: new Date().toISOString(),
      };
    }),

  counter: publicProcedure.query(() => {
    return { count: Math.floor(Math.random() * 100) };
  }),

  testMongo: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.db) {
      return {
        success: false,
        message: 'MongoDB connection not established',
      };
    }
    try {
      const db = ctx.db;
      const result = await db.command({ ping: 1 });
      return {
        success: true,
        message: 'Successfully connected to MongoDB',
        ping: result,
      };
    } catch (error) {
      console.error('MongoDB connection test failed:', error);
      return {
        success: false,
        message: 'Failed to connect to MongoDB',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }),
});
