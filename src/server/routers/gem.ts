import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const gemRouter = router({
  getAll: publicProcedure.query(async () => {
    // Replace with actual database query later
    return [
      { id: '1', title: 'First Gem' },
      { id: '2', title: 'Second Gem' },
    ];
  }),

  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    // Replace with actual database query later
    return { id: input, title: `Gem ${input}` };
  }),
});
