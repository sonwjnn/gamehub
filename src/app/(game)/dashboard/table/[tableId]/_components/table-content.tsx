'use client'

import Image from 'next/image'
import { OtherPlayer } from './other-player'
import { CurrentPlayer } from './current-player'
import { Board } from './board'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import SoundUrls from '@/utils/contants/sound'
import { Match, Participant, PlayerWithUser, PokerActions } from '@/types'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useSocket } from '@/providers/socket-provider'

import { LeaveTableCheckbox } from './leave-table-checkbox'
import { LeaveTable } from './leave-table'
import { InvitePlayer } from './invite-player'
import { cn } from '@/lib/utils'
import { WinnerModal } from './winner-modal'
import { Button } from '@/components/ui/button'
import playerApi from '@/services/api/modules/player-api'

interface TableContentProps {
  tableId: string
}

export const TableContent = ({ tableId }: TableContentProps) => {
  const [isHandVisible, setHandVisible] = useState(false)
  const [players, setPlayers] = useState<PlayerWithUser[]>([])
  const [isShuffle, setShuffle] = useState(false)

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

    const currentPlayerIndex = Array.from(players).findIndex(
      (player: Element) => player.classList.contains('current_poker_list')
    )
    const cardWidth = 50
    const cardsHand = 2
    const dealX = bounds.width / 2 - cardWidth / 2
    const dealY = bounds.height
    const stackOffset = 20
    const offsetX = 0
    const offsetY = 5
    const positions = Array.from(players).map(playerPosition)
    const numPlayers = players.length
    const totalCards = numPlayers * cardsHand
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
        const isCurrentPlayer =
          i % (numPlayers * cardsHand) < cardsHand &&
          Math.floor(i / cardsHand) === currentPlayerIndex
        card.className = 'player-card'
        card.textContent = i.toString()
        table?.appendChild(card)
      }
    }

    function cyclePosition(coord: 'x' | 'y', i: number) {
      const playerIndex = i % numPlayers
      const cardIndex = Math.floor(i / numPlayers)

      if (coord === 'x') {
        const offset = cardIndex * (cardWidth / 2 + 5)
        return positions[playerIndex][coord] + offset
      } else {
        return positions[playerIndex][coord] + offsetY
      }
    }
    function dealCard(i: number) {
      createCard(i + 1)

      new Audio(SoundUrls.soundShufle).play()

      gsap.set('.player-card', {
        x: dealX,
        y: dealY,
      })

      gsap.to('.current-player-card', {
        scale: 1.1,
        zIndex: 100,
      })

      gsap.to('.player-card', {
        duration: 1,
        rotation: 360,
        x: (i: number) => cyclePosition('x', i),
        y: (i: number) => cyclePosition('y', i),
        zIndex: (i: number) => zIndex++,
        onComplete: () => {
          setHandVisible(true)
          setShuffle(false)

          timerId = setTimeout(() => {
            const elements = document.querySelectorAll('.player-card')
            elements.forEach(element => {
              element?.parentNode?.removeChild(element)
            })
          }, 2000)
        },
      })
    }

    if (isShuffle) {
      let i = 0
      const dealInterval = setInterval(() => {
        dealCard(i)
        i++
        if (i >= totalCards) {
          clearInterval(dealInterval)
        }
      }, 300)
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
  }, [isShuffle])

  useEffect(() => {
    if (socket) {
      let timerMatchId: NodeJS.Timeout | null = null

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
          setParticipants([])
          setHandVisible(false)

          if (match) {
            setShuffle(true)

            timerMatchId = setTimeout(() => {
              setMatch(match)
              setParticipants(match.participants)

              setPlayers(prev =>
                prev.map(item => {
                  if (item.id === playerId) {
                    return { ...item, isTurn: true }
                  }
                  return { ...item, isTurn: false }
                })
              )
            }, 2000)
          }
        }
      )

      socket.on(
        PokerActions.TABLE_MESSAGE,
        ({ message, from }: { message: string; from: any }) => {
          message && addMessage(message)
        }
      )

      socket.on(
        PokerActions.JOIN_TABLE,
        ({ tableId, player }: { tableId: string; player: PlayerWithUser }) => {
          setPlayers(prev => [...prev, player])

          socket.emit(PokerActions.TABLE_JOINED, {
            tableId,
            player,
          })
        }
      )

      socket.on(
        PokerActions.LEAVE_TABLE,
        ({ tableId, playerId }: { tableId: string; playerId: string }) => {
          setPlayers(prev => prev.filter(item => item.id !== playerId))

          socket.emit(PokerActions.TABLE_LEFT, {
            tableId,
            playerId,
          })
        }
      )

      socket.on(
        PokerActions.CHANGE_TURN,
        ({ match, playerId }: { match: Match | null; playerId: string }) => {
          if (match?.tableId !== tableId) return

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

      socket.on(
        PokerActions.PLAYERS_UPDATED,
        ({
          tableId,
          players,
        }: {
          tableId: string
          players: PlayerWithUser[]
        }) => {
          setPlayers(players)
        }
      )

      socket.on(
        PokerActions.REBUY,
        ({ tableId, player }: { tableId: string; player: PlayerWithUser }) => {
          setPlayers(prev => [...prev, player])

          socket.emit(PokerActions.REBOUGHT, {
            tableId,
            player,
          })
        }
      )

      return () => {
        if (socket) {
          socket.off(PokerActions.JOIN_TABLE)
          socket.off(PokerActions.TABLE_MESSAGE)
          socket.off(PokerActions.LEAVE_TABLE)
          socket.off(PokerActions.MATCH_STARTED)
          socket.off(PokerActions.CHANGE_TURN)

          if (timerMatchId) {
            clearTimeout(timerMatchId)
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  useEffect(() => {
    window.addEventListener('popstate', e => {
      window.history.go(1)
    })
  }, [])

  useEffect(() => {
    if (players.length <= 1) {
      setMatch(null)
      setHandVisible(false)
      setMessages([])
    }
  }, [players])

  useEffect(() => {
    const getPlayers = async () => {
      const { response } = await playerApi.getPlayersByTableId({
        tableId,
      })

      if (!response) {
        setPlayers([])
        return
      }

      setPlayers(response)
    }
    getPlayers()
  }, [tableId])

  const addMessage = (message: string) => {
    setMessages((prevMessages: string[]) => [...prevMessages, message])
  }

  return (
    <>
      <div className="absolute left-0 top-0 z-10 p-[12px] flex gap-x-4">
        <InvitePlayer tableId={tableId} />
        <LeaveTable
          tableId={tableId}
          className={cn(
            'hidden',
            !(match && players.length > 1 && !match.isShowdown) && 'block'
          )}
        />
        <LeaveTableCheckbox
          tableId={tableId}
          player={players.find(p => p.userId === user?.id)}
          match={match}
          className={cn(
            'opacity-0 pointer-events-none',
            match &&
              players.length > 1 &&
              !match.isShowdown &&
              'opacity-100 pointer-events-auto'
          )}
        />
        {/* <Button onClick={() => setShuffle(true)}>Shuffle</Button> */}
      </div>
      <div className="wrapper w-full" ref={wrapperRef}>
        <Image
          src="/images/table_v2.png"
          alt="tableImage"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
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
                      tableId={tableId}
                    />
                  )
                })}
              <WinnerModal match={match} />
            </div>
          </div>
        </div>
        <Board match={match} isShuffle={isShuffle} />

        {messages && messages.length > 0 && (
          <div className="absolute  font-bold top-[60%] text-lime-500 text-xl left-1/2 translate-y-[-50%] translate-x-[-50%]">
            {messages[messages.length - 1]}
          </div>
        )}
        <CurrentPlayer
          match={match}
          player={players.find(p => p.userId === user?.id)}
          participants={participants}
          isHandVisible={isHandVisible}
          tableId={tableId}
        />
      </div>
    </>
  )
}
