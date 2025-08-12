import superjson from 'superjson';

import { AppRouter } from '@/server/routers';
import { QueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { EnvConfig } from './common';

export const TRPC = createTRPCReact<AppRouter>();

export const queryClient = new QueryClient();

export const trpcClient = TRPC.createClient({
  links: [
    httpBatchLink({
      url: `${EnvConfig.Api.Url}/api`,
      transformer: superjson,
      headers() {
        return {
          'x-cadalzolc': EnvConfig.Api.Default,
        };
      },
    }),
  ],
});
