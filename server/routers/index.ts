import { router } from '@/server';
import { RouterPublic } from './_router.public';

export const appRouter = router({
  Public: RouterPublic,
});

export type AppRouter = typeof appRouter;
