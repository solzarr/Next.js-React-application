import { z } from 'zod';

export const zodRegisterProfile = z.object({
  name: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  skills: z.string().optional(),
  experience: z.string().optional(),
  cv: z.string(),
});

export type TRegisterProfile = z.infer<typeof zodRegisterProfile>;
