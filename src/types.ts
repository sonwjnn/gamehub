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
  name: string
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
  isHandOver: boolean
  chatBanned: boolean

  minBuyIn: number
  maxBuyIn: number
  ante: number
  maxPlayers: number

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
  stack: number
  buyIn: number
  socketId: string

  isTurn: boolean
  leaveNextMatch: boolean

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

export type WinMessages = {
  id: string
  amount: string
  matchId: string
  match?: Match
  handName: string
  bestHand?: string
  winnerHand?: string
  content: string
  createdAt: Date
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
  isPreFlop: boolean
  isFlop: boolean
  isTurn: boolean
  isRiver: boolean
  isShowdown: boolean
  isAllAllIn: boolean
  winners?: Player[]
  bigBlindId?: string
  bigBlind?: Player
  smallBlindId?: string
  smallBlind?: Player
  callAmount: number
  minRaise: number
  minBet: number
  pot: number
  winMessages?: WinMessages[]
}

export type Participant = {
  id: string
  matchId: string
  match?: string
  playerId: string
  player?: Player
  cardOneId: string
  cardTwoId: string
  cardOne?: Card
  cardTwo?: Card
  isChecked: boolean
  isFolded: boolean
  isAllin: boolean
  lastAction: string
  bet: number
}

enum BankActionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export type Recharge = {
  id: string
  amount: number
  bankId: string
  bank?: Bank
  status: BankActionStatus
  createdAt: Date
}

export type Withdraw = {
  id: string
  amount: number
  bankId: string
  bank?: Bank
  status: BankActionStatus
  createdAt: Date
}

export type Bank = {
  id: string
  userId: string
  user?: User
  cardNumber: string
  securityCode: string
  cardHolderName: string
  expiryDate: Date

  recharges?: Recharge[]
  withdraws?: Withdraw[]

  createdAt: Date
  updatedAt: Date
}

export type PlayerWithUser = Player & { user: User }

export type TableWithPlayers = Table & {
  players: Player[]
}

export type TableWithPlayersWithUser = Table & {
  players: PlayerWithUser[]
}

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

type CustomCard = {
  id: string
  rank: string
  suit: string
}

export type HighlightCard = {
  cards: CustomCard[]
  name: string
}

export enum PokerActions {
  FOLD = 'FOLD',
  CHECK = 'CHECK',
  CALL = 'CALL',
  RAISE = 'RAISE',
  HALF = 'HALF',
  QUARTER = 'QUARTER',
  FULL = 'FULL',
  ALLIN = 'ALLIN',
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
  UPDATE_STATISTICAL = 'UPDATE_STATISTICAL',
  HIGHLIGHT_CARDS = 'HIGHLIGHT_CARDS',
  REBUY = 'REBUY',
  SIT_DOWN = 'SIT_DOWN',
  STAND_UP = 'STAND_UP',
  SITTING_OUT = 'SITTING_OUT',
  SITTING_IN = 'SITTING_IN',
  DISCONNECTED = 'DISCONNECTED',
  MATCH_STARTED = 'MATCH_STARTED',
  CHANGE_TURN = 'CHANGE_TURN',
  REBOUGHT = 'REBOUGHT',
}

export enum RaiseType {
  RAISE = 'RAISE',
  QUARTER = 'QUARTER',
  HALF = 'HALF',
  FULL = 'FULL',
  ALLIN = 'ALLIN',
}
