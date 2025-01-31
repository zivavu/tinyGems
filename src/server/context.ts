import { inferAsyncReturnType } from '@trpc/server';

export async function createContext() {
  return {
    // Add any context you want to share between procedures
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
