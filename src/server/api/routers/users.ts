import { z } from 'zod'
import { router, protectedProcedure, publicProcedure } from '../trpc'

export const userRouter = router({
  delete: protectedProcedure
    .input(z.object({
      userId: z.string()
    }))
    .mutation(async (opts) => {
      await opts.ctx.prisma.item.delete({
        where: { id: opts.input.userId }
      });
      return [];
    }),

  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.user.findMany({
        where: {
          Role: "USER"
        },
        include: {
          shipping: true,
          transactions: {
            select: {
              total: true
            }
          },
        }
      });
    }),

  fetch: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id
        }
      });
    }),
});
