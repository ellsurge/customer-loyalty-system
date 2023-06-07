import {z} from "zod"

export const LoginReqSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  
export const LoginResSchecma = z.object({
    token:z.string(),
  })

export const UsersAddSchema = z.object({
    name: z.string(),
    province: z.string(),
    country: z.string(),
    address: z.string(),
    email: z.string().email(),
    password: z.string().min(3),
    Role: z.enum(["USER", "ADMIN", "CASHIER"]),

  });
  export const CatAddSchema = z.object({
    name: z.string(),
    point: z.number({
      required_error: "point is required",
      invalid_type_error: "point must be a number",
    }).int()
  })
  export const OrderAddSchema = z.object({
    userId: z.string(),
    itemId: z.string(),
    cashierId: z.string(),
    quantity: z.number({
      required_error: "point is required",
      invalid_type_error: "point must be a number",
    }).int(),
    price: z.number(),
    point:z.number(),
  })
  export const ItemAddSchema = z.object({
    name: z.string(),
    // userId: z.string(),
    catId: z.string(),
    price: z.number({
      required_error: "point is required",
      invalid_type_error: "point must be a number",
    }).int()
  })
export enum Role{
  USER,
  ADMIN,
  CASHIER
}
  
