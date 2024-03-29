import { Server as NetServer, Socket } from 'net'
import { NextApiResponse } from 'next'
import { Server as SocketIOServer } from 'socket.io'

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type User = {
  id: string
  username: string
  email: string
  image: string
  token: string
  salt: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export type Card = {
  id: string
  rank: string
  suit: string
}

export type History = {
  id: string

  content: string
  deleted: boolean
  tableId: string
  table?: Table

  playerId: string
  player?: Player

  createdAt: Date
}

export type Table = {
  id: string
  name: string
  eventId: string
  event?: Event

  userId: string
  user?: User

  players: Player[]
  messages: Message[]

  limit: number
  maxPlayers: number
  seats: number
  smallBlind: number
  bigBlind: number
  pot: number
  mainPot: number
  callAmount: number
  wentToShowdown: boolean
  minBet?: number
  minRaise?: number
  deck: Card[]
  board: Card[]
  sidePots: string
  buttonId?: string
  turn: boolean

  histories: History[]

  createdAt: Date
  updatedAt: Date
}

export type Player = {
  id: string

  userId: string
  user?: User

  tableId: string
  table?: Table

  createdAt: Date
}

export type Message = {
  id: string
  content: string

  playerId: string
  player?: Player

  tableId: string
  table?: Table

  deleted: boolean
  createdAt: Date
}

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

// export type PlayerWithUser = Player & { user: User };

export type TableWithPlayers = Table & {
  players: Player[]
}

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}
