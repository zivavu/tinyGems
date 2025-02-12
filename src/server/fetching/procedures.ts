import { auth } from '@/server/auth';
import { TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { t } from './trpc';

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action',
    });
  }

  return next({
    ctx: {
      ...ctx,
      userId,
      session: ctx.session,
    },
  });
});
