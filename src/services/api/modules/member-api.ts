import privateClient from "@/services/api/client/private-client";

const memberEndpoints = {
  getCurrentMemberOfRoom: ({
    roomId,
    userId,
  }: {
    roomId: string;
    userId: string;
  }) => `member/${roomId}/${userId}`,
};

const memberApi = {
  getCurrentMemberOfRoom: async (data: { roomId: string; userId: string }) => {
    try {
      const response = await privateClient.get(
        memberEndpoints.getCurrentMemberOfRoom(data)
      );
      if (response && response.data) return { response: response.data };
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default memberApi;
