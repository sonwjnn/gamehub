import userApi from '@/services/api/modules/user-api'
import { LoginSchema } from '@/schemas'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { generateFakeCurrentUser } from './lib/mock'
import { User } from './types'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { username, password } = validatedFields.data

          const { response } = await userApi.login({ username, password })

          if (!response) {
            return null
          }

          const user = response.user

          return user
          // const fakeCurrentUserData = generateFakeCurrentUser()
          // return fakeCurrentUserData
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
