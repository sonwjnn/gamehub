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
  chipsAmount: number
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
  matches?: Match[]

  minBuyIn: number
  maxBuyIn: number
  // limit: number
  maxPlayers: number
  // smallBlind: number
  // bigBlind: number
  // pot: number
  // mainPot: number
  // callAmount: number
  // wentToShowdown: boolean
  // minBet?: number
  // minRaise?: number
  // sidePots: string
  // buttonId?: string
  // turn: boolean

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

  isTurn: boolean

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

export type Deck = {
  id: string
  tableId: string
  table: Table
  cards?: Card[]
  matches?: Match[]
}

export type Match = {
  id: string
  tableId: string
  table: Table
  numberPlayers: number
  deckId: string
  deck: Deck
  participants: Participant[]
  board: Card[]
}

export type Participant = {
  id: string
  matchId: string
  match: string
  playerId: string
  player: Player
  cardOne: Card
  cardTwo: Card
}

export type PlayerWithUser = Player & { user: User }

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

export enum PokerActions {
  FOLD = 'FOLD',
  CHECK = 'CHECK',
  CALL = 'CALL',
  RAISE = 'RAISE',
  WINNER = 'WINNER',
  FETCH_LOBBY_INFO = 'FETCH_LOBBY_INFO',
  RECEIVE_LOBBY_INFO = 'RECEIVE_LOBBY_INFO',
  PLAYERS_UPDATED = 'PLAYERS_UPDATED',
  JOIN_TABLE = 'JOIN_TABLE',
  TABLE_JOINED = 'TABLE_JOINED',
  LEAVE_TABLE = 'LEAVE_TABLE',
  TABLE_LEFT = 'TABLE_LEFT',
  TABLES_UPDATED = 'TABLES_UPDATED',
  TABLE_UPDATED = 'TABLE_UPDATED',
  TABLE_MESSAGE = 'TABLE_MESSAGE',
  REBUY = 'REBUY',
  SIT_DOWN = 'SIT_DOWN',
  STAND_UP = 'STAND_UP',
  SITTING_OUT = 'SITTING_OUT',
  SITTING_IN = 'SITTING_IN',
  DISCONNECT = 'DISCONNECT',
  MATCH_STARTED = 'MATCH_STARTED',
  CHANGE_TURN = 'CHANGE_TURN',
}
