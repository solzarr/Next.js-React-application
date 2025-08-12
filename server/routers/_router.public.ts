import { publicProcedure, router } from '@/server';
import { RegisterProfile } from '@/server/actions';
import { TRegisterProfile, zodRegisterProfile } from '@/utils/zod';

export const RouterPublic = router({
  Register: publicProcedure
    .input(zodRegisterProfile)
    .mutation(async ({ input }) => await RegisterProfile(input as TRegisterProfile)),
});
