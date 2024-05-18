'use client'

import Image from 'next/image'
import { OtherPlayer } from './other-player'
import { CurrentPlayer } from './current-player'
import { Board } from './board'
import { useState, useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import sounds from '@/utils/contants/sound'
import {
  HighlightCard,
  Match,
  Participant,
  PlayerWithUser,
  PokerActions,
} from '@/types'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useSocket } from '@/providers/socket-provider'

import { LeaveButton } from './leave-button'
import { cn } from '@/lib/utils'
import { WinnerModal } from './winner-modal'
import playerApi from '@/services/api/modules/player-api'
import { useRouter } from 'next/navigation'
import { ShowdownModal } from './showdown-modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/store/use-modal-store'
import { useIsFolded } from '@/store/use-is-folded'

interface TableContentProps {
  tableId: string
}

export const TableContent = ({ tableId }: TableContentProps) => {
  const user = useCurrentUser()
  const router = useRouter()
  const { socket } = useSocket()
  const { onClose } = useModal()
  const { setIsFolded } = useIsFolded()

  const [messages, setMessages] = useState([] as string[])
  const [match, setMatch] = useState<Match | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isHandVisible, setHandVisible] = useState(false)
  const [players, setPlayers] = useState<PlayerWithUser[]>([])
  const [isShuffle, setShuffle] = useState(false)
  const [isChipsAnimation, setChipsAnimation] = useState(false)
  const [highlightCards, setHighlightCards] = useState<HighlightCard>({
    name: '',
    cards: [],
  })

  const matchRef = useRef<Match | null>(null)
  const tableRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const dealerRef = useRef<HTMLDivElement | null>(null)
  let timerId: NodeJS.Timeout | null = null

  useGSAP(() => {
    const table = tableRef.current
    const players = wrapperRef.current?.getElementsByClassName('pocker_list')

    if (!table || !players) return

    const bounds = table.getBoundingClientRect()

    const currentPlayerIndex = 0
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
        const isCurrentPlayer = i % numPlayers === currentPlayerIndex
        card.className = isCurrentPlayer
          ? 'player-card current-player-card'
          : 'player-card'
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

      gsap.set('.player-card', {
        x: dealX,
        y: dealY,
      })

      gsap.to('.current-player-card', {
        scale: 1.2,
        zIndex: 100,
      })

      gsap.to('.player-card', {
        duration: 0.5,
        rotation: 360,
        x: (i: number) => cyclePosition('x', i),
        y: (i: number) => cyclePosition('y', i),
        zIndex: (i: number) => zIndex++,
        onComplete: () => {
          timerId = setTimeout(() => {
            setHandVisible(true)
            setShuffle(false)
            const elements = document.querySelectorAll('.player-card')
            elements.forEach(element => {
              element?.parentNode?.removeChild(element)
            })
          }, 2000)
        },
      })
    }

    if (isShuffle) {
      new Audio(sounds.soundShufle).play()

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

  useGSAP(() => {
    const table = tableRef.current
    const chips = wrapperRef.current?.getElementsByClassName('coin_bet_current')
    const other_chips =
      wrapperRef.current?.getElementsByClassName('coin_bet_other')
    const groupNumber = document.querySelector('.group_number')

    if (!table || !chips || !groupNumber || !other_chips) return

    const bounds = groupNumber.getBoundingClientRect()

    const targetX = bounds.left + bounds.width
    const targetY = bounds.top - bounds.height * 3

    const originalPositions = Array.from(chips).map(c => {
      const originalLeft = c.getBoundingClientRect().left - window.scrollX
      const originalTop = c.getBoundingClientRect().top - window.scrollY

      return {
        left: originalLeft,
        top: originalTop,
      }
    })

    const other_originalPositions = Array.from(other_chips).map(c => {
      const originalLeft = c.getBoundingClientRect().left - window.scrollX
      const originalTop = c.getBoundingClientRect().top - window.scrollY

      return {
        left: originalLeft,
        top: originalTop,
      }
    })

    if (isChipsAnimation) {
      Array.from(chips).forEach((chip, index) => {
        const originalPosition = originalPositions[index]
        const deltaX = originalPosition.left / 2.5
        const deltaY = targetY - originalPosition.top

        gsap.to(chip, {
          duration: 0.5,
          x: deltaX,
          y: deltaY,
          ease: 'power3.out',
          onComplete() {
            // Hoàn tất hoạt ảnh
          },
        })
      })

      Array.from(other_chips).forEach((other_chips, index) => {
        const other_originalPosition = other_originalPositions[index]
        const deltaX = targetX - other_originalPosition.left
        const deltaY = targetY - other_originalPosition.top

        gsap.to(other_chips, {
          duration: 0.5,
          x: deltaX,
          y: deltaY,
          ease: 'power3.out',
          onComplete() {
            // Hoàn tất hoạt ảnh
          },
        })
      })
    }
  }, [isChipsAnimation])

  useEffect(() => {
    matchRef.current = match
  }, [match])

  useEffect(() => {
    if (socket) {
      let timerMatchId: NodeJS.Timeout | null = null
      let timerHighlightId: NodeJS.Timeout | null = null

      window.addEventListener('unload', removePlayer)
      window.addEventListener('close', removePlayer)

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
          setHighlightCards({ name: '', cards: [] })
          setHandVisible(false)
          setIsFolded(false)
          onClose()

          if (match) {
            setShuffle(true)

            const delay =
              players.length <= 2 ? 3000 : players.length * 1000 + 1000

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
            }, delay)
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
        async ({
          tableId,
          player,
        }: {
          tableId: string
          player: PlayerWithUser
        }) => {
          setPlayers(prev => [...prev, player])

          await socket.emit(PokerActions.TABLE_JOINED, {
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
        ({ matchData, playerId }: { matchData: Match; playerId: string }) => {
          setPlayers(prev =>
            prev.map(item => {
              if (item.id === playerId) {
                return { ...item, isTurn: true }
              }
              return { ...item, isTurn: false }
            })
          )

          if (matchData) {
            if (matchData.isShowdown && !matchData.isAllAllIn) {
              setMatch({
                ...matchData,
                isShowdown: true,
                winners: [],
                winMessages: [],
              })

              setTimeout(() => {
                setMatch(matchData)
                setParticipants(matchData.participants)
              }, 3000)
            }

            if (matchData.isShowdown && matchData.isAllAllIn) {
              const isFlop = matchRef.current?.isFlop
              const isTurn = matchRef.current?.isTurn
              const isRiver = matchRef.current?.isRiver

              if (!isFlop && !isTurn && !isRiver) {
                setMatch({
                  ...matchData,
                  isShowdown: true,
                  winners: [],
                  winMessages: [],
                  isFlop: false,
                  isTurn: false,
                  isRiver: false,
                })

                setTimeout(() => {
                  setMatch({
                    ...matchData,
                    winners: [],
                    winMessages: [],
                    isFlop: true,
                    isTurn: false,
                    isRiver: false,
                  })
                }, 3000)

                setTimeout(() => {
                  setMatch({
                    ...matchData,
                    winners: [],
                    winMessages: [],
                    isTurn: true,
                    isRiver: false,
                  })
                }, 5000)

                setTimeout(() => {
                  setMatch({
                    ...matchData,
                    winners: [],
                    winMessages: [],
                    isRiver: true,
                  })
                }, 6000)

                setTimeout(() => {
                  setMatch(matchData)
                }, 8000)
              }

              if (isFlop && !isTurn && !isRiver) {
                setMatch({
                  ...matchData,
                  isShowdown: true,
                  winners: [],
                  winMessages: [],
                  isFlop: true,
                  isTurn: false,
                  isRiver: false,
                })

                setTimeout(() => {
                  setMatch({
                    ...matchData,
                    winners: [],
                    winMessages: [],
                    isTurn: true,
                    isRiver: false,
                  })
                }, 3000)

                setTimeout(() => {
                  setMatch({
                    ...matchData,
                    winners: [],
                    winMessages: [],
                    isRiver: true,
                  })
                }, 4000)

                setTimeout(() => {
                  setMatch(matchData)
                }, 5000)
              }

              if (isFlop && isTurn && !isRiver) {
                setMatch({
                  ...matchData,
                  isShowdown: true,
                  winners: [],
                  winMessages: [],
                  isRiver: false,
                })

                setTimeout(() => {
                  setMatch({
                    ...matchData,
                    winners: [],
                    winMessages: [],
                    isRiver: true,
                  })
                }, 3000)

                setTimeout(() => {
                  setMatch(matchData)
                }, 4000)
              }

              if (isFlop && isTurn && isRiver) {
                setMatch(matchData)
              }
            }

            if (!matchData.isShowdown && !matchData.isAllAllIn) {
              const isFlop = matchRef.current?.isFlop
              const isTurn = matchRef.current?.isTurn
              const isRiver = matchRef.current?.isRiver

              const isNextRound =
                isFlop !== matchData.isFlop ||
                isTurn !== matchData.isTurn ||
                isRiver !== matchData.isRiver

              if (isNextRound) {
                setChipsAnimation(true)

                setTimeout(() => {
                  setChipsAnimation(false)
                  setMatch(matchData)
                  setParticipants(matchData.participants)
                }, 1000)
              } else {
                setMatch(matchData)
                setParticipants(matchData.participants)
              }
            }
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
          setPlayers(prev => {
            const updatedPlayers = prev.map(item => {
              if (item.id === player.id) {
                return player
              }
              return item
            })

            return updatedPlayers
          })

          socket.emit(PokerActions.REBOUGHT, {
            tableId,
            player,
          })
        }
      )

      socket.on(
        PokerActions.HIGHLIGHT_CARDS,
        (highlightCardsData: HighlightCard) => {
          if (highlightCardsData) {
            timerHighlightId = setTimeout(() => {
              setHighlightCards(highlightCardsData)
            }, 1500)
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
          socket.off(PokerActions.HIGHLIGHT_CARDS)
          socket.off(PokerActions.REBUY)

          if (timerMatchId) {
            clearTimeout(timerMatchId)
          }

          if (timerHighlightId) {
            clearTimeout(timerHighlightId)
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
      addMessage('Waiting for players to join the table')
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

  const removePlayer = async () => {
    const currentPlayer = players.find(p => p.userId === user?.id)
    if (!currentPlayer) return
    const { response, error } = await playerApi.removePlayer({
      playerId: currentPlayer?.id,
      tableId: tableId,
    })

    if (error) {
      console.log(error)
      return
    }

    router.push('/dashboard/table')
  }

  const addMessage = (message: string) => {
    setMessages((prevMessages: string[]) => [...prevMessages, message])
  }

  const currentPlayerIndex = players.findIndex(p => p.userId === user?.id)

  const sortedPlayers = [
    ...players.slice(currentPlayerIndex + 1),
    ...players.slice(0, currentPlayerIndex + 1),
  ]

  const currentPlayer = players.find(p => p.userId === user?.id)

  return (
    <>
      <div className="absolute left-0 top-0 z-10 p-[12px] flex gap-x-4">
        {!currentPlayer && (
          <LeaveButton
            tableId={tableId}
            className={cn(
              'hidden',
              !(match && players.length > 1 && !match.winners?.length) &&
                'block'
            )}
          />
        )}
      </div>
      <div className="wrapper md:w-full w-[86%] h-full" ref={wrapperRef}>
        <Image
          src="/images/table_v3.png"
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
              {sortedPlayers.map((player, index) => {
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
              <ShowdownModal match={match} participants={participants} />
              <WinnerModal match={match} />
            </div>
          </div>
        </div>
        <Board
          match={match}
          isShuffle={isShuffle}
          highlightCards={highlightCards}
        />

        {messages && messages.length > 0 && (
          <div className="absolute font-semibold top-[60%] text-lime-500 text-xs md:text-xl left-1/2 -translate-y-1/2 -translate-x-1/2">
            {messages[messages.length - 1]}
          </div>
        )}
        {currentPlayer && (
          <CurrentPlayer
            match={match}
            player={currentPlayer}
            participants={participants}
            isHandVisible={isHandVisible}
            tableId={tableId}
            highlightCards={highlightCards}
          />
        )}
      </div>
    </>
  )
}
