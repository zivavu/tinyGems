import { AppRouter } from '@/server/fetching/routers/_app';
import { createTRPCReact } from '@trpc/react-query';

export const trpcReact = createTRPCReact<AppRouter>();
