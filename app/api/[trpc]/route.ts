import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createContext } from '@/server/context';
import { appRouter } from '@/server/routers';
import { EnvConfig } from '@/utils/common';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api',
    req,
    router: appRouter,
    createContext: createContext,
  });

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;

export const OPTIONS = (req: Request) => {
  const origin = req.headers.get('origin');
  const allowedOrigins = EnvConfig.Cors;
  const isAllowed = origin && allowedOrigins.includes(origin);
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': isAllowed ? origin : 'https://cadalzolc.com',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      Vary: 'Origin',
    },
  });
};
