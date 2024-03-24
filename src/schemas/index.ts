// import { ChannelType, CleaningDelay, Statuses } from '@prisma/client'
import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, { message: "User name is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  username: z.string().min(6, { message: "Minimun 6 characters required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimun 6 characters required" }),
  // name: z
  //   .string()
  //   .min(1, { message: "User name is required" })
  //   .refine((name) => !name.includes(" "), {
  //     message: "User name cannot contain spaces",
  //   }),
});

export const ChatItemSchema = z.object({
  content: z.string().min(1),
});

// export const ResetSchema = z.object({
// 	email: z.string().email({ message: 'Email is required' }),
// })

// export const NewPasswordSchema = z.object({
// 	password: z.string().min(6, {
// 		message: 'Minimum 6 characters is required',
// 	}),
// })
