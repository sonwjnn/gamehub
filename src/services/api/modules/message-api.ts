import publicClient from '@/services/api/client/public-client'
import privateClient from '@/services/api/client/private-client'

const messsageEndpoints = {
  getMessagesByRoomIdWithCursor: ({
    cursor,
    roomId,
  }: {
    cursor: string
    roomId: string
  }) => `messages/room/${roomId}/${cursor}`,
  getMessagesByRoomId: ({ roomId }: { roomId: string }) =>
    `messages/room/${roomId}`,
  createMessage: `messages/room`,
}

const messsageApi = {
  getMessagesByRoomIdWithCursor: async (data: {
    cursor: string
    roomId: string
  }) => {
    try {
      const response = await publicClient.get(
        messsageEndpoints.getMessagesByRoomIdWithCursor(data)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getMessagesByRoomId: async (data: { roomId: string }) => {
    try {
      const response = await publicClient.get(
        messsageEndpoints.getMessagesByRoomId(data)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  createMessage: async (data: any) => {
    try {
      const response = await privateClient.post(
        messsageEndpoints.createMessage,
        { ...data, member_id: data.memberId }
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default messsageApi
