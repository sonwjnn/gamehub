import privateClient from '@/services/api/client/private-client'

const playerEndpoints = {
  getCurrentPlayerOfTable: ({
    tableId,
    userId,
  }: {
    tableId: string
    userId: string
  }) => `players/${tableId}/${userId}`,
}

const playerApi = {
  getCurrentPlayerOfTable: async (data: {
    tableId: string
    userId: string
  }) => {
    try {
      const response = await privateClient.get(
        playerEndpoints.getCurrentPlayerOfTable(data)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default playerApi
