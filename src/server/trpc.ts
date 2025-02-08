import { auth } from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { connectToDb } from './db';

export async function createContext() {
  const db = await connectToDb();
  const session = auth;

  return {
    db,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!(await ctx.session?.$context).session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action',
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});
