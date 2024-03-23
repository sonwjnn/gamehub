import { getCurrentMemberOfRoom } from "@/actions/member";
import { getRoomById } from "@/actions/room";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { useEffect } from "react";

const HomePage = async () => {
  const currentUser = {
    id: "1",
    name: "user1",
    username: "user1",
    email: "user1@gmail.com",
    password: "123456789",
  };

  const roomId = "2";
  const room = await getRoomById(roomId);

  const member = await getCurrentMemberOfRoom(roomId, currentUser.id);

  return (
    <div className="w-full h-full">
      <ChatMessages
        member={member}
        name={room.name}
        // chatId={room.id}
        chatId={roomId}
        type="room"
        socketUrl="/api/socket/messages"
        socketQuery={{
          // roomId: room.id,
          roomId: roomId,
        }}
        // roomId={room.id}
        roomId={roomId}
      />
      <ChatInput
        name={room.name}
        type="room"
        apiUrl="/api/socket/messages"
        query={{
          roomId: roomId,
        }}
      />
    </div>
  );
};

export default HomePage;
