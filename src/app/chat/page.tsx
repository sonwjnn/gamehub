import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { currentUser } from "@/lib/auth";
import memberApi from "@/services/api/modules/member-api";
import roomApi from "@/services/api/modules/room-api";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const roomId = "2";
  const { response: room } = await roomApi.getRoomById({ roomId });

  const { response: member } = await memberApi.getCurrentMemberOfRoom({
    roomId,
    userId: user.id,
  });

  if (!room || !member) {
    return redirect("/");
  }

  return (
    <div className="w-full h-full">
      <ChatMessages
        member={member}
        name={room?.name}
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
        name={room?.name}
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
