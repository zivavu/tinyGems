import 'server-only';

import { auth } from '@/lib/auth';
import { initTRPC } from '@trpc/server';
import { connectToDb } from '../db/db';

export async function createContext() {
  const db = await connectToDb();
  const session = auth;

  return {
    db,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
