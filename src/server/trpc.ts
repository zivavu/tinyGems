import { initTRPC } from '@trpc/server';
import { connectToDb } from './db';

export async function createContext() {
  const db = await connectToDb();
  return { db };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
