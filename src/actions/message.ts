"use server";

import { Message } from "@/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const getMessagesByRoomIdWithCursor = async (
  cursor: string,
  roomId: string
) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages/room/${roomId}/${cursor}`
  );

  if (response.status === 404) {
    return null;
  }
  return response.data;
};

export const getMessagesByRoomId = async (roomId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages/room/${roomId}`
  );

  if (response.status === 404) {
    return null;
  }

  return {
    items: Object.values(response.data),
    nextCursor: 1,
  };
};

export const createMessage = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages/room`,
      { ...data, member_id: data.memberId }
    );

    if (response.status === 404) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.log("[CREATE_MESSAGE]", error);
  }
};

1;
