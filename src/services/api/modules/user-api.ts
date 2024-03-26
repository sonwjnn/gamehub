import privateClient from '@/services/api/client/private-client'
import publicClient from '@/services/api/client/public-client'

const userEndpoints = {
  getUserById: ({ userId }: { userId: string }) => `users/${userId}`,
  getUserByUsername: ({ username }: { username: string }) =>
    `users/username/${username}`,
  register: `auth/register`,
  login: `auth/login`,
}

const userApi = {
  login: async (data: any) => {
    try {
      const response = await privateClient.post(userEndpoints.login, data)

      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error: 'Something went wrong' }
    }
  },
  register: async (data: {
    email: string
    username: string
    password: string
  }) => {
    try {
      const response = await privateClient.post(userEndpoints.register, data)

      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error: 'Something went wrong' }
    }
  },
  getUserById: async ({ userId }: { userId: string }) => {
    try {
      const response = await privateClient.get(
        userEndpoints.getUserById({ userId })
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getUserByUsername: async ({ username }: { username: string }) => {
    try {
      const response = await publicClient.get(
        userEndpoints.getUserByUsername({ username })
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default userApi
