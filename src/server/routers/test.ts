import { createTRPCRouter, publicProcedure } from '../trpc';

export const testRouter = createTRPCRouter({
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
