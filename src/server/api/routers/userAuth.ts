
import {z} from 'zod'
import { publicProcedure } from '../trpc';
import { router } from '../trpc';
import { LoginReqSchema,LoginResSchecma,UsersAddSchema  } from '@/utils/dto';
// import jwt from 'jsonwebtoken';
import { hash } from '@/utils/auth';

export const authRouter = router({
  // login: publicProcedure.
  // input(LoginReqSchema).
  // query(async (opts)=>{
  //   const {email, password} = opts.input
  //   const user = opts.ctx.prisma.user.findUnique({
  //     where:{
  //       email: email,
  //       password?: password,
  //     },
  //   });
  //   if (!user){
  //     throw new Error ('invalid email or password')
  //   }
  //   const token  = jwt.sign({userId: user!.id}, 'ligma');
  //   return {token} || []

  // }),
  create:publicProcedure.
  input(UsersAddSchema).
  mutation(async (opts)=>{
    const {name, email, password, Role }=  opts.input;
    // console.log(name, email, password);
    const hashedPassword = await hash(password);
    const user = await opts.ctx.prisma.user.create({
      data:{
        email,
        password: hashedPassword,
        Role,
        name
      },
    }); 
    if(Role === "USER"){
      const {country,province, address} = opts.input
      const shipping = await opts.ctx.prisma.shipping.create({
      data:{
        country,
        province,
        address,
        userId: user.id
      }
    })
    }else{
      const staff = await opts.ctx.prisma.staff.create({
        data:{
          userId: user.id,
          // user: user
        }
      })
    }
    return {user, staff:null, shipping:null} || [];
  })

});