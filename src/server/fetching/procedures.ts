import 'server-only';
import { t } from './trpc';
import { TRPCError } from '@trpc/server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

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
