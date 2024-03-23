import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type User = {
  id?: string;
  username?: string;
  email?: string;
  image?: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Room = {
  id: string;
  name: string;
  dealerId: string;
  eventId: string;

  userId: string;
  user?: User;

  min: number;
  max: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Member = {
  id: string;

  userId: string;
  user?: User;

  roomId: string;
};

export type Message = {
  id: string;
  content: string;
  memberId: string;
  member?: Member;
  deleted: boolean;
  createdAt: Date;
};

// export type DirectMessage = {
//   id: string;
//   content: string;
//   userId: string;
//   conversationId: string;
//   deleted: boolean;

//   createdAt: Date;
//   updatedAt: Date;
// };

// export type Conversation = {
//   id: string;
//   userOneId: string;
//   userTwoId: string;
// };

// export type MemberWithUser = Member & { user: User };

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
