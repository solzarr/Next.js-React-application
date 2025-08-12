'use client';

import { queryClient, TRPC, trpcClient } from '@/utils/trpc';
import { QueryClientProvider } from '@tanstack/react-query';

export const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPC.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TRPC.Provider>
  );
};
