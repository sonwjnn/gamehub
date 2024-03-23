import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import axios from "axios";
import { getRoomById } from "@/actions/room";
import { getCurrentMemberOfRoom } from "@/actions/member";
import { createMessage } from "@/actions/message";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { content, user } = req.body;
    const { roomId } = req.query;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!roomId) {
      return res.status(400).json({ error: "Channel ID missing" });
    }

    if (!content) {
      return res.status(400).json({ error: "Content missing" });
    }

    const room = await getRoomById(roomId as string);

    if (!room) {
      return res.status(404).json({ message: "room not found" });
    }

    const currentMember = await getCurrentMemberOfRoom(room.id, "2");

    if (!currentMember) {
      return res
        .status(404)
        .json({ message: "Current member of room not found" });
    }

    console.log(currentMember);

    const { data: messageData } = await createMessage({
      content,
      memberId: currentMember.id,
      deleted: 0,
      createdAt: new Date(),
    });

    console.log(messageData);

    const roomKey = `chat:${roomId}:messages`;

    res?.socket?.server?.io?.emit(roomKey, messageData);

    return res.status(200).json(messageData);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
