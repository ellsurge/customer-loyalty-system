import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { CatAddSchema, ItemAddSchema, OrderAddSchema } from '@/utils/dto';

export const ordersRouter = router({
    getCart: publicProcedure.
    input(z.object({
        id:z.string()
    }))
    .query(({ ctx, input }) => {
        return ctx.prisma.transactions.findMany({
            where:{
                userId:input.id,
                status: "PENDING"
            },
            include:{
                item:{
                    select:{
                        name:true,
                    },
                },
            },
        });
      }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transactions.findMany({
        include:{
            item:{
                select:{
                    name:true,
                },
            },
        },
    });
  }),
  getCat: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
  create: publicProcedure
    .input(OrderAddSchema)
    .mutation(async ({ ctx, input }) => {

      const user = await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          points: {
            increment: input.point,
          },
        },
      });

      const total = input.price * input.quantity;

      const order = await ctx.prisma.transactions.create({
        data: {
          userId: input.userId,
          itemId: input.itemId,
          cashierId: input.cashierId,
          quantity: input.quantity,
          total: total,
        },
      });

      return order;
    }),
  addCat: publicProcedure
    .input(CatAddSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.category.create({
        data: {
          name: input.name,
          point: input.point,
        },
      });
    }),
    cancel: publicProcedure
    .input(z.object({id:z.string()}))
    .mutation(async ({ ctx, input }) => {

      return await ctx.prisma.transactions.update({
        where: {
          id: input.id,
        },
        data: {
          status:'CANCELED'
        },
      });
    }),
});
