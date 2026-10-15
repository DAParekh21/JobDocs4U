import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { registerUser, verifyUser } from '../auth';

const t = initTRPC.create();

const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const loginInput = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const appRouter = t.router({
  auth: t.router({
    register: t.procedure
      .input(signupInput)
      .mutation(async ({ input }) => {
        const user = await registerUser(input.email, input.password);
        return { ok: true, user };
      }),

    login: t.procedure
      .input(loginInput)
      .mutation(async ({ input }) => {
        const user = await verifyUser(input.email, input.password);
        if (!user) {
          throw new Error('Invalid email or password');
        }
        return { ok: true, user };
      })
  }),

  health: t.procedure.query(() => ({ ok: true, message: 'JobDocs4U API healthy' }))
});

export type AppRouter = typeof appRouter;
