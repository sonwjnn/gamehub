import privateClient from '@/services/api/client/private-client'
import qs from 'query-string'

const playerEndpoints = {
  getCurrentPlayerOfTable: ({
    tableId,
    userId,
  }: {
    tableId: string
    userId: string
  }) => `players/${tableId}/${userId}`,
  getCurrentPlayerWithoutTable: ({ userId }: { userId: string }) =>
    `players/table/user/${userId}`,
  createPlayer: 'players/',
  removePlayer: (playerId: string) => `players/${playerId}`,
  updatePlayer: (playerId: string) => `players/${playerId}`,
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

  getCurrentPlayerWithoutTable: async (data: { userId: string }) => {
    try {
      const response = await privateClient.get(
        playerEndpoints.getCurrentPlayerWithoutTable(data)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  createPlayer: async (data: {
    tableId: string
    userId: string
    socketId: string
    buyIn: number
  }) => {
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
  removePlayer: async ({
    tableId,
    playerId,
  }: {
    tableId: string
    playerId: string
  }) => {
    try {
      const url = qs.stringifyUrl({
        url: `${playerEndpoints.removePlayer(playerId)}`,
        query: {
          tableId,
        },
      })

      const response = await privateClient.delete(url)
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },

  updatePlayer: async (data: any) => {
    try {
      const response = await privateClient.put(
        playerEndpoints.updatePlayer(data.id),
        data
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default playerApi
