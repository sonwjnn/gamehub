import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import roomApi from "@/services/api/modules/room-api";
import memberApi from "@/services/api/modules/member-api";
import messsageApi from "@/services/api/modules/message-api";

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

    const room = await roomApi.getRoomById({ roomId: roomId as string });

    if (!room) {
      return res.status(404).json({ message: "room not found" });
    }

    const currentMember = await memberApi.getCurrentMemberOfRoom({
      roomId: roomId as string,
      userId: "2",
    });

    if (!currentMember) {
      return res
        .status(404)
        .json({ message: "Current member of room not found" });
    }

    const message = await messsageApi.createMessage({
      content,
      memberId: currentMember.id,
      deleted: 0,
      createdAt: new Date(),
    });

    const roomKey = `chat:${roomId}:messages`;

    res?.socket?.server?.io?.emit(roomKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
