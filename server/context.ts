import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export async function createContext({ req }: FetchCreateContextFnOptions) {
  const signature = req.headers.get('x-cadalzolc') ?? undefined;
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() ?? 'unknown';

  return {
    signature,
    ip,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
