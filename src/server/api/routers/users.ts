import z from 'zod'
import { router , protectedProcedure, publicProcedure} from '../trpc'

const userRouter = router({
    delete: protectedProcedure
    .input(z.object({
        userId: z.string()
    }))
    .mutation( async (opts)=>{
        return await opts.ctx.prisma.item.delete({
            where: { id: opts.input.userId}
        })
        
    }),

    getAll: protectedProcedure
    .query(({ctx})=>{
        return ctx.prisma.user.findMany()
    }),

})