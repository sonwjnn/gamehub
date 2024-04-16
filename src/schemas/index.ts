// import { ChannelType, CleaningDelay, Statuses } from '@prisma/client'
import * as z from 'zod'

export const LoginSchema = z.object({
  username: z.string().min(1, { message: 'User name is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  username: z.string().min(6, { message: 'Minimun 6 characters required' }),
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Minimun 6 characters required' }),
})

export const ChatItemSchema = z.object({
  content: z.string().min(1),
})

export const UserSchema = z.object({
  username: z.string().min(1, { message: 'User name is required' }),
  email: z.string().email({ message: 'Email is required' }),
  name: z.string().min(1, { message: 'User name is required' }),
  image: z.string().min(1, { message: 'User image is required' }),
})

// export const ResetSchema = z.object({
// 	email: z.string().email({ message: 'Email is required' }),
// })

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: 'Minimum 6 characters is required',
    }),
    newPassword: z.string().min(6, {
      message: 'Minimum 6 characters is required',
    }),
    confirmNewPassword: z.string().min(6, {
      message: 'Minimum 6 characters is required',
    }),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  })
