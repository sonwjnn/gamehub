import publicClient from '@/services/api/client/private-client'

const roomEndpoints = {
  getRoomById: ({ roomId }: { roomId: string }) => `rooms/${roomId}`,
  getRooms: 'rooms/',
}

const roomApi = {
  getRoomById: async (data: { roomId: string }) => {
    try {
      const response = await publicClient.get(roomEndpoints.getRoomById(data))
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getRooms: async () => {
    try {
      const response = await publicClient.get(roomEndpoints.getRooms)
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default roomApi
