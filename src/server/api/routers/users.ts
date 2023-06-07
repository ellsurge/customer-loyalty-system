import z from 'zod'
import { router , protectedProcedure, publicProcedure} from '../trpc'

export const userRouter = router({
    delete: protectedProcedure
    .input(z.object({
        userId: z.string()
    }))
    .mutation( async (opts)=>{
        return await opts.ctx.prisma.item.delete({
            where: { id: opts.input.userId}
        }) || []
        
    }),

    getAll: publicProcedure
    .query(({ctx})=>{
        return ctx.prisma.user.findMany({
            where:{
                Role:"USER"
            },
            include:{
                shipping: true,
                transactions: {
                    select:{
                        total:true
                    }
                },
            }
        }) || []
    }),
    fetch: publicProcedure
    .input(z.object({id:z.string()}))
    .query(({ctx, input})=>{
        return ctx.prisma.user.findUnique({
            where:{
                id: input.id

            }
        }) || [];
    }),
})