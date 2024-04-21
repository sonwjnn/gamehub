import publicClient from '@/services/api/client/private-client'

const historyEndpoints = {
  getAllByUserId: (userId: string) => `histories/user/${userId}`,
}

const historyApi = {
  getAllByUserId: async ({ userId }: { userId: string }) => {
    try {
      const response = await publicClient.get(
        historyEndpoints.getAllByUserId(userId)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default historyApi
