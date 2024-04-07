'use client'

import Image from 'next/image'
import { OtherPlayer } from './_components/other-player'
import { CurrentPlayer } from './_components/current-player'
import { Button } from '@/components/ui/button'
import { set, shuffle } from 'lodash'
import { Board } from './_components/board'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import SoundUrls from '@/utils/contants/sound'
import { useParams } from 'next/navigation'
import { useOrigin } from '@/hooks/use-origin'
import tableApi from '@/services/api/modules/table-api'
import { Card, Deck, Match, PlayerWithUser, PokerActions, Table } from '@/types'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useSocket } from '@/providers/socket-provider'
import { toast } from 'sonner'

import matchApi from '@/services/api/modules/match-api'
import participantApi from '@/services/api/modules/participant-api'

const TablePage = () => {
  const [isHandVisible, setHandVisible] = useState(true)
  const [pairs, setPairs] = useState(
    [] as Array<{ first: string; second: string }>
  )
  const [boardCards, setBoardCards] = useState([] as Card[])
  const [players, setPlayers] = useState<PlayerWithUser[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<
    PlayerWithUser | undefined
  >(undefined)
  const [isShuffle, setSuffle] = useState(false)
  const params = useParams()
  const origin = useOrigin()
  const user = useCurrentUser()
  const { socket } = useSocket()

  const [messages, setMessages] = useState([] as string[])
  const [match, setMatch] = useState<Match | null>(null)
  const [deck, setDeck] = useState<Deck | null>(null)
  const [playerHands, setPlayerHands] = useState(
    [] as Array<{ card1: Card; card2: Card }>
  )
  const [hand, setHand] = useState([])
  const [chips, setChips] = useState([2000])
  const [pot, setPot] = useState(0)
  const [river, setRiver] = useState([])
  const [turn, setTurn] = useState([])
  const [flop, setFlop] = useState([])
  const [play, setPlay] = useState([])
  const [participants, setParticipants] = useState([])

  const [handSuits, setHandSuits] = useState([])
  const [flopSuits, setFlopSuits] = useState([])
  const [turnSuits, setTurnSuits] = useState([])
  const [riverSuits, setRiverSuits] = useState([])

  const [start, setStart] = useState([true])

  const tableRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const dealerRef = useRef<HTMLDivElement | null>(null)
  let timerId: NodeJS.Timeout | null = null

  useGSAP(() => {
    const table = tableRef.current
    const players = wrapperRef.current?.getElementsByClassName('pocker_list')

    if (!table || !players) return

    const bounds = table.getBoundingClientRect()

    const cardWidth = 50
    const cardsHand = 2
    const dealX = bounds.width / 2 - cardWidth / 2
    const dealY = bounds.height
    const stackOffset = 15
    const offsetX = 0
    const offsetY = 0
    const positions = Array.from(players).map(playerPosition)
    const numPlayers = players.length
    const totalCards = numPlayers * cardsHand
    let round = -1
    let zIndex = 0

    function playerPosition(element: Element) {
      const rect = element.getBoundingClientRect()
      return {
        x: rect.left - bounds.left + offsetX,
        y: rect.top - bounds.top + offsetY,
      }
    }

    function createCard(i: number) {
      const card = table?.ownerDocument.createElement('div')
      if (card) {
        card.className = 'player-card'
        card.textContent = i.toString()
        table?.appendChild(card)
      }
    }

    function cyclePosition(coord: 'x' | 'y', i: number) {
      i = i % numPlayers
      if (coord === 'x' && !i) round++

      return positions[i][coord] + round * stackOffset
    }

    if (isShuffle) {
      let i = totalCards
      while (i--) {
        createCard(i + 1)
      }

      new Audio(SoundUrls.soundShufle).play()

      gsap.set('.player-card', {
        x: dealX,
        y: dealY,
      })

      gsap.to('.player-card', {
        duration: 1,
        rotation: 360,
        x: (i: number) => cyclePosition('x', i),
        y: (i: number) => cyclePosition('y', i),
        zIndex: (i: number) => zIndex++,
        stagger: 0.03,
        onComplete: () => {
          setHandVisible(true)
          setSuffle(false)

          timerId = setTimeout(() => {
            const elements = document.querySelectorAll('.player-card')
            elements.forEach(element => {
              element?.parentNode?.removeChild(element)
            })
          }, 0)
        },
      })
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
  }, [isShuffle])

  // useEffect(() => {
  //   init()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    const getPlayers = async () => {
      const { response } = await tableApi.getTableById({
        tableId: params?.tableId as string,
      })

      if (!response) {
        setPlayers([])
        return
      }

      let currentPlayer = null
      const players = response.players.filter((item: PlayerWithUser) => {
        if (item.userId === user?.id) {
          currentPlayer = item
          return false
        }
        return true
      })

      if (currentPlayer) {
        setCurrentPlayer(currentPlayer)
      }
      setPlayers(players)
    }
    getPlayers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (socket) {
      // window.addEventListener('unload', leaveTable)
      // window.addEventListener('close', leaveTable)

      socket.on(
        PokerActions.TABLES_UPDATED,
        ({
          table,
          message,
          from,
        }: {
          table: Table
          message: string
          from: any
        }) => {
          // console.log(TABLE_UPDATED, table, message, from);
          message && addMessage(message)
        }
      )

      socket.on(
        PokerActions.JOIN_TABLE,
        ({ tableId, player }: { tableId: string; player: PlayerWithUser }) => {
          if (tableId !== params?.tableId) return

          setPlayers(prev => [...prev, player])

          // toast.success(`${player.user?.username} joined the table`)
          socket.emit(PokerActions.TABLE_JOINED, {
            tableId: params?.tableId,
            player,
          })
        }
      )

      socket.on(
        PokerActions.LEAVE_TABLE,
        ({ tableId, player }: { tableId: string; player: PlayerWithUser }) => {
          if (tableId !== params?.tableId) return
          setPlayers(prev => prev.filter(item => item.userId !== player.userId))

          socket.emit(PokerActions.TABLE_LEFT, {
            tableId: params?.tableId,
            player,
          })
          // toast.success(`${player.user?.username} left the table`)
        }
      )

      return () => {
        if (socket) {
          socket.off(PokerActions.JOIN_TABLE)
          socket.off(PokerActions.TABLES_UPDATED)
          socket.off(PokerActions.LEAVE_TABLE)
        }
      }
    }
  }, [socket, params])

  useEffect(() => {
    window.addEventListener('popstate', e => {
      window.history.go(1)
    })
  }, [])

  // useEffect(() => {

  //     turn !== currentPlayer.turn &&
  //     setTurn(currentTable.seats[seatId].turn);
  //   // eslint-disable-next-line
  // }, [currentTable]);

  // useEffect(() => {
  //   if (turn && !turnTimeOutHandle) {
  //     const handle = setTimeout(fold, 15000)
  //     setHandle(handle)
  //   } else {
  //     turnTimeOutHandle && clearTimeout(turnTimeOutHandle)
  //     turnTimeOutHandle && setHandle(null)
  //   }
  //   // eslint-disable-next-line
  // }, [turn])

  useEffect(() => {
    const init = async () => {
      const participants = [
        ...players.map(player => player.id),
        currentPlayer?.id as string,
      ]

      const { response, error } = await matchApi.createMatch({
        tableId: params?.tableId as string,
        numberPlayers: players.length + 1,
        participants,
      })

      if (error) {
        return toast.error('Error creating match')
      }

      if (response) {
        setMatch(response)
        setParticipants(response.participants)
        setBoardCards(response.board)
        setDeck(response.deck?.cards)
      }
    }
    if (isShuffle) {
      init()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShuffle])

  useEffect(() => {
    const getCurrentMatchByTableId = async () => {
      const { response } = await matchApi.getCurrentMatchByTableId({
        tableId: params?.tableId as string,
      })

      if (response) {
        setMatch(response)
        setParticipants(response.participants)
        setBoardCards(response.board)
      }
    }
    getCurrentMatchByTableId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addMessage = (message: string) => {
    setMessages((prevMessages: string[]) => [...prevMessages, message])
    console.log(message)
  }

  const onSuffleClick = () => {
    setSuffle(true)
    setHandVisible(false)
  }

  const check = () => {
    socket.emit('next')
  }

  const call = () => {
    socket.emit('next')
  }

  const raise = () => {
    socket.emit('next')
  }

  const fold = () => {
    socket.emit(PokerActions.FOLD, params?.tableId)
  }

  const round = () => {
    setStart([true])
    socket.emit('round')
  }

  if (!origin) return null

  if (!params?.tableId) return null

  return (
    <>
      <div className="absolute flex items-center gap-x-8  left-1/2 translate-x-[-50%] top-[25%] z-10">
        <Button
          className="px-[16px] py-[8px] text-white"
          variant="outline"
          onClick={onSuffleClick}
        >
          Shuffle
        </Button>
      </div>
      <div className="wrapper" ref={wrapperRef}>
        <Image
          src="/images/table_v2.png"
          alt="tableImage"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
        <div className="inner">
          <div className="list_user" ref={tableRef}>
            <div className="dealer" ref={dealerRef}></div>

            <div className="wrap_list">
              {Array.isArray(players) &&
                players.map((player, index) => {
                  return (
                    <OtherPlayer
                      key={index}
                      player={player}
                      participants={participants}
                      isHandVisible={isHandVisible}
                    />
                  )
                })}
            </div>
          </div>
        </div>
        <Board cards={boardCards} isShuffle={isShuffle} />
        {/* {players.length + 1 <= 1 && (
          <div className="absolute text-white font-bold top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
            Waiting for more players...
          </div>
        )} */}
        {messages && messages.length > 0 && (
          <div className="absolute  font-bold top-1/2 text-lime-500 left-1/2 translate-y-[-50%] translate-x-[-50%]">
            {messages[messages.length - 1]}
          </div>
        )}
        <CurrentPlayer
          match={match}
          player={currentPlayer}
          participants={participants}
          showdown
          isHandVisible={isHandVisible}
          tableId={params?.tableId as string}
        />
      </div>
    </>
  )
}

export default TablePage
