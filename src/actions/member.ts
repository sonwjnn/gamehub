import axios from "axios";

export const getCurrentMemberOfRoom = async (
  roomId: string,
  userId: string
) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/member/${roomId}/${userId}`
  );

  if (response.status === 404) {
    return null;
  }

  return response.data;
};
