import {z} from 'zod'
import {router, protectedProcedure, publicProcedure} from "../trpc";
import { ItemAddSchema } from '@/utils/dto';

export const itemsRouter = router({
    
    getAll: publicProcedure
    .query(({ ctx }) => {
        return ctx.prisma.item.findMany({
            include:{
                transaction:true,
                category:true,

            }
        });
      }),
    find:publicProcedure
    .input(z.object({
        id: z.string()
    })).
    mutation(async({ctx, input}) =>{
        const item = await ctx.prisma.item.findUnique({
            where: {
              id: input.id,
            },
            include: {
              category: {
                select:{
                    point:true,
                }
              }
            },
          });
          return item
    }),
    create: publicProcedure
    .input(ItemAddSchema)
    .mutation(( {ctx, input})=>{
        return ctx.prisma.item.create({
            data: input
        })

    })
})