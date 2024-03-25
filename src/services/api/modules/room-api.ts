import publicClient from '@/services/api/client/private-client'

const roomEndpoints = {
  getRoomById: ({ roomId }: { roomId: string }) => `room/${roomId}`,
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
}

export default roomApi
