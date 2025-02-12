import { AppRouter } from '@/server/fetching/routers/app';
import { createTRPCReact } from '@trpc/react-query';

export const trpcReact = createTRPCReact<AppRouter>();
