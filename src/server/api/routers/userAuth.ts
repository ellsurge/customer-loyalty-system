// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { type GetServerSidePropsContext } from "next";
// import {
//   getServerSession,
//   type NextAuthOptions,
//   type DefaultSession,
// } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import { env } from "@/env.mjs";
// import { prisma } from "@/server/db";

// /**
//  * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
//  * object and keep type safety.
//  *
//  * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
//  */
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       // ...other properties
//       // role: UserRole;
//     } & DefaultSession["user"];
//   }

//   // interface User {
//   //   // ...other properties
//   //   // role: UserRole;
//   // }
// }

// /**
//  * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
//  *
//  * @see https://next-auth.js.org/configuration/options
//  */
// export const authOptions: NextAuthOptions = {
//   callbacks: {
//     session: ({ session, user }) => ({
//       ...session,
//       user: {
//         ...session.user,
//         id: user.id,
//       },
//     }),
//   },
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GitHubProvider({
//       clientId: env.GITHUB_CLIENT_ID,
//       clientSecret: env.GITHUB_CLIENT_SECRET,
//     }),
//     /**
//      * ...add more providers here.
//      *
//      * Most other providers require a bit more work than the Discord provider. For example, the
//      * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
//      * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
//      *
//      * @see https://next-auth.js.org/providers/github
//      */
//   ],
// };

// /**
//  * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
//  *
//  * @see https://next-auth.js.org/configuration/nextjs
//  */
// export const getServerAuthSession = (ctx: {
//   req: GetServerSidePropsContext["req"];
//   res: GetServerSidePropsContext["res"];
// }) => {
//   return getServerSession(ctx.req, ctx.res, authOptions);
// };

import {z} from 'zod'
import { publicProcedure } from '../trpc';
import { router } from '../trpc';
import { LoginReqSchema,LoginResSchecma,UsersAddSchema  } from '@/utils/dto';
import jwt from 'jsonwebtoken';
import { hash } from '@/utils/auth';

export const authRouter = router({
  login: publicProcedure.
  input(LoginReqSchema).
  query(async (opts)=>{
    const {email, password} = opts.input
    const user = opts.ctx.prisma.user.findUnique({
      where:{
        email: email,
        password: password,
      },
    });
    if (!user){
      throw new Error ('invalid email or password')
    }
    const token  = jwt.sign({userId: user.id}, 'ligma');
    return {token}

  }),
  create:publicProcedure.
  input(UsersAddSchema).
  mutation(async (opts)=>{
    const {name, email, password, Role }=  opts.input;
    console.log(name, email, password);
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
    return {user, staff:null, shipping:null};
  })

});