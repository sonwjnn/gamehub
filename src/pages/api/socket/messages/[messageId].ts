// import { NextApiResponseServerIo } from "@/types";
// import { NextApiRequest } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponseServerIo
// ) {
//   if (req.method !== "DELETE" && req.method !== "PATCH") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     // const profile = await currentUserPages(req)
//     const user = {
//       id: "clrw47sxe0000ui635jh8ptjs",
//     };
//     const { messageId, serverId, channelId } = req.query;
//     const { content } = req.body;

//     if (!user) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     if (!serverId) {
//       return res.status(400).json({ error: "Server ID missing" });
//     }

//     if (!channelId) {
//       return res.status(400).json({ error: "Channel ID missing" });
//     }

//     const room = await db.room.findFirst({
//       where: {
//         id: roomId as string,
//       },
//       include: {
//         members: true,
//       },
//     });

//     if (!room) {
//       return res.status(404).json({ error: "Room not found" });
//     }

//     const member = server.members.find((member) => member.userId === user.id);

//     if (!member) {
//       return res.status(404).json({ error: "Member not found" });
//     }

//     let message = await db.message.findFirst({
//       where: {
//         id: messageId as string,
//         channelId: channelId as string,
//       },
//       include: {
//         member: {
//           include: {
//             user: true,
//           },
//         },
//       },
//     });

//     if (!message || message.deleted) {
//       return res.status(404).json({ error: "Message not found" });
//     }

//     const isMessageOwner = message.memberId === member.id;

//     if (req.method === "DELETE") {
//       message = await db.message.update({
//         where: {
//           id: messageId as string,
//         },
//         data: {
//           fileUrl: null,
//           content: "This message has been deleted.",
//           deleted: true,
//         },
//         include: {
//           member: {
//             include: {
//               user: true,
//             },
//           },
//         },
//       });
//     }

//     if (req.method === "PATCH") {
//       if (!isMessageOwner) {
//         return res.status(401).json({ error: "Unauthorized" });
//       }

//       message = await db.message.update({
//         where: {
//           id: messageId as string,
//         },
//         data: {
//           content,
//         },
//         include: {
//           member: {
//             include: {
//               user: true,
//             },
//           },
//         },
//       });
//     }

//     const updateKey = `chat:${channelId}:messages:update`;

//     res?.socket?.server?.io?.emit(updateKey, message);

//     return res.status(200).json(message);
//   } catch (error) {
//     console.log("[MESSAGE_ID]", error);
//     return res.status(500).json({ error: "Internal Error" });
//   }
// }
