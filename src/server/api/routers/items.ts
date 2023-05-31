import {z} from 'zod'
import {router, protectedProcedure} from "../trpc";

export const itemsRouter = router({
    
    getAll: protectedProcedure
    .query(({ ctx }) => {
        return ctx.prisma.item.findMany({
            where:{
                userId: ctx.session.user.id,
            }
        });
      }),

    create: protectedProcedure
    .input(z.object({
        name:z.string(),
    }))
    .mutation(( {ctx, input})=>{
        return ctx.prisma.item.create({
            data: {
                name: input.name,
                userId: ctx.session.user.id,
            }
        })

    })
})