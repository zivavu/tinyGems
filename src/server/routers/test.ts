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
});
