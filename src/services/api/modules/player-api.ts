import privateClient from '@/services/api/client/private-client'

const playerEndpoints = {
  getCurrentPlayerOfTable: ({
    tableId,
    userId,
  }: {
    tableId: string
    userId: string
  }) => `players/${tableId}/${userId}`,
  createPlayer: 'players/',
  removePlayer: ({
    tableId,
    playerId,
  }: {
    tableId: string
    playerId: string
  }) => `players/${tableId}/${playerId}`,
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
  createPlayer: async (data: { tableId: string; userId: string }) => {
    try {
      const response = await privateClient.post(
        playerEndpoints.createPlayer,
        data
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  removePlayer: async (data: { tableId: string; playerId: string }) => {
    try {
      const response = await privateClient.delete(
        playerEndpoints.removePlayer(data)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default playerApi
