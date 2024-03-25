import privateClient from '@/services/api/client/private-client'
import publicClient from '@/services/api/client/public-client'

const userEndpoints = {
  getUserById: ({ userId }: { userId: string }) => `users/${userId}`,
  getUserByUsername: ({ username }: { username: string }) =>
    `users/username/${username}`,
  register: `users/register`,
  login: `users/login`,
}

const userApi = {
  register: async (data: any) => {
    try {
      const response = await privateClient.post(userEndpoints.register, {
        ...data,
        member_id: data.memberId,
      })
      if (response && response.data)
        return {
          response: response.data,
          success: 'Register successfully!',
        }
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
