import superjson from 'superjson';
import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const middleware = t.middleware;
export const router = t.router;
export const mergeRouters = t.mergeRouters;

export const publicProcedure = t.procedure.use(async (opts) => {
  const { signature } = opts.ctx;
  if (!signature || signature !== process.env.NEXT_PUBLIC_DEFAULT) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid token' });
  }
  return opts.next();
});
