'use client'

import Image from 'next/image'
import { OtherPlayer } from './_components/other-player'
import { CurrentPlayer } from './_components/current-player'
import { Board } from './_components/board'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import SoundUrls from '@/utils/contants/sound'
import { useParams } from 'next/navigation'
import { useOrigin } from '@/hooks/use-origin'
import tableApi from '@/services/api/modules/table-api'
import { Match, Participant, PlayerWithUser, PokerActions } from '@/types'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useSocket } from '@/providers/socket-provider'

import matchApi from '@/services/api/modules/match-api'
import { set } from 'lodash'

const TablePage = () => {
  const [isHandVisible, setHandVisible] = useState(false)

  const [players, setPlayers] = useState<PlayerWithUser[]>([])

  const [isShuffle, setShuffle] = useState(false)
  const params = useParams()
  const origin = useOrigin()
  const user = useCurrentUser()
  const { socket } = useSocket()

  const [messages, setMessages] = useState([] as string[])
  const [match, setMatch] = useState<Match | null>(null)

  const [participants, setParticipants] = useState<Participant[]>([])

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
          setShuffle(false)

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

  useEffect(() => {
    if (socket) {
      let timeoutId: NodeJS.Timeout | null = null
      // window.addEventListener('unload', leaveTable)
      // window.addEventListener('close', leaveTable)

      socket.on(
        PokerActions.MATCH_STARTED,
        ({
          tableId,
          match,
          playerId,
        }: {
          tableId: string
          match: Match
          playerId: string
        }) => {
          setMatch(null)
          setParticipants([])
          setHandVisible(false)

          if (match) {
            setShuffle(true)

            setTimeout(() => {
              setMatch(match)
              setParticipants(match.participants)
              setHandVisible(true)

              setPlayers(prev =>
                prev.map(item => {
                  if (item.id === playerId) {
                    return { ...item, isTurn: true }
                  }
                  return { ...item, isTurn: false }
                })
              )

              setShuffle(false)
            }, 2000)
          }
        }
      )

      socket.on(
        PokerActions.TABLE_MESSAGE,
        ({ message, from }: { message: string; from: any }) => {
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

      socket.on(
        PokerActions.CHANGE_TURN,
        ({ match, playerId }: { match: Match | null; playerId: string }) => {
          setPlayers(prev =>
            prev.map(item => {
              if (item.id === playerId) {
                return { ...item, isTurn: true }
              }
              return { ...item, isTurn: false }
            })
          )
          if (match) {
            setMatch(match)
            setParticipants(match.participants)
          }
        }
      )

      return () => {
        if (socket) {
          socket.off(PokerActions.JOIN_TABLE)
          socket.off(PokerActions.TABLE_MESSAGE)
          socket.off(PokerActions.LEAVE_TABLE)
          socket.off(PokerActions.MATCH_STARTED)
          socket.off(PokerActions.CHANGE_TURN)

          if (timeoutId) {
            clearTimeout(timeoutId)
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, params])

  useEffect(() => {
    window.addEventListener('popstate', e => {
      window.history.go(1)
    })
  }, [])

  useEffect(() => {
    const getPlayers = async () => {
      const { response } = await tableApi.getTableById({
        tableId: params?.tableId as string,
      })

      if (!response) {
        setPlayers([])
        return
      }

      setPlayers(response.players)

      if (response.players.length > 1) {
        getCurrentMatchByTableId()
      }
    }
    const getCurrentMatchByTableId = async () => {
      const { response } = await matchApi.getCurrentMatchByTableId({
        tableId: params?.tableId as string,
      })

      if (response) {
        setMatch(response)
        setParticipants(response.participants)
      }
    }
    getPlayers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.tableId])

  const addMessage = (message: string) => {
    setMessages((prevMessages: string[]) => [...prevMessages, message])
  }

  if (!origin) return null

  if (!params?.tableId) return null

  return (
    <>
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
                  if (player.userId === user?.id) {
                    return
                  }

                  return (
                    <OtherPlayer
                      match={match}
                      key={index}
                      player={player}
                      participants={participants}
                      isHandVisible={isHandVisible}
                      tableId={params?.tableId as string}
                    />
                  )
                })}
            </div>
          </div>
        </div>
        <Board match={match} isShuffle={isShuffle} />
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
          player={players.find(p => p.userId === user?.id)}
          participants={participants}
          isHandVisible={isHandVisible}
          tableId={params?.tableId as string}
        />
      </div>
    </>
  )
}

export default TablePage
