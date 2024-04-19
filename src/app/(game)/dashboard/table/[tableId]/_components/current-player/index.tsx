'use client'

import Image from 'next/image'
import { Hand } from './hand'
import { CurrentPlayerAction } from './actions'

import { useEffect, useState } from 'react'
import { Match, Participant, PlayerWithUser, PokerActions } from '@/types'
import { useSocket } from '@/providers/socket-provider'
import { cn } from '@/lib/utils'
import { formatChipsAmount } from '@/utils/formatting'
import { ChipsAmountBadge } from '@/components/chips-amount-badge'
import Sound from '@/utils/contants/sound'

interface CurrentPlayerProps {
  isShowdown?: boolean
  match: Match | null
  participants: Participant[]
  isHandVisible: boolean
  player: PlayerWithUser | undefined
  tableId: string
}

export const CurrentPlayer = ({
  match,
  participants,
  isHandVisible,
  player,
  tableId,
}: CurrentPlayerProps) => {
  const { socket } = useSocket()
  const [imageUrlFirst, setImageUrlFirst] = useState('')
  const [imageUrlSecond, setImageUrlSecond] = useState('')
  const [isAction, setIsAction] = useState(false)
  const [counter, setCounter] = useState(12)
  const [bet, setBet] = useState(0)

  const currentParticipant = participants.find(
    item => item.playerId === player?.id
  )

  const isFolded = currentParticipant?.isFolded
  const isWinner = !isFolded && match?.winnerId === player?.id
  const isTurn = !isFolded && player?.isTurn
  const isShowdown = match?.isShowdown

  const currentStack = currentParticipant?.player?.stack || player?.stack || 0
  const currentBet = currentParticipant?.bet || 0

  useEffect(() => {
    if (
      currentParticipant &&
      currentParticipant.cardOne &&
      currentParticipant.cardTwo
    ) {
      const imageUrlFirst = `/images/pocker/${currentParticipant.cardOne?.rank.toLocaleLowerCase()}_${currentParticipant.cardOne?.suit.toLocaleLowerCase()}.png`
      const imageUrlSecond = `/images/pocker/${currentParticipant.cardTwo?.rank.toLocaleLowerCase()}_${currentParticipant.cardTwo?.suit.toLocaleLowerCase()}.png`

      setImageUrlFirst(imageUrlFirst)
      setImageUrlSecond(imageUrlSecond)
    } else {
      setImageUrlFirst('')
      setImageUrlSecond('')
    }
  }, [participants, player, currentParticipant])

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (isTurn && counter > 0 && !isAction) {
      timer = setInterval(() => {
        setCounter(counter - 1)
      }, 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [counter, isTurn, isAction])

  useEffect(() => {
    if (isTurn) {
      setCounter(12)
    }
  }, [isTurn])

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    if (counter === 0 && isTurn) {
      fold()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  useEffect(() => {
    if (match) {
      match.callAmount > match.minBet
        ? setBet(match.callAmount)
        : match.pot > 0
          ? setBet(match.minRaise)
          : setBet(match.minBet)
    }
  }, [match])

  useEffect(() => {
    if (!isWinner && isShowdown) {
      const audio = new Audio(Sound.soundLose)
      audio.play()
    }
  }, [isWinner, isShowdown])

  const fold = () => {
    if (socket) {
      socket.emit(PokerActions.FOLD, {
        tableId,
        participantId: currentParticipant?.id,
      })
    }
  }

  return (
    <div
      className={cn(
        'group_tool flex flex-space gap-12 before:border-none',
        isTurn && 'user_active',
        isFolded && 'user_fold',
        !isWinner && isShowdown && 'is-lose'
      )}
    >
      <div className="group_flush">
        <div className="ttl">
          <span>ROYAL FLUSH</span>
        </div>
        <div className="content flex flex-midle gap-8 flex-center">
          <div className="star">
            <Image
              src="/images/star.png"
              alt="starImage"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
          <div className="btn_detail">Detail</div>
        </div>
      </div>
      <div className="group_left">
        <div
          className={cn('group_user before:border-none', isTurn && 'is-status')}
        >
          <div className="wrap">
            <div className="flex flex-midle">
              <div className="left">
                <div className="avatar sz-36">
                  <div className="images">
                    <div className="imgDrop ratio_1_1">
                      <Image
                        src={player?.user?.image || '/images/avt/1.jpg'}
                        alt="image alt"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-auto h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                {!isFolded ? (
                  <Hand
                    imageUrlFirst={imageUrlFirst}
                    imageUrlSecond={imageUrlSecond}
                    isHidden={!isHandVisible}
                  />
                ) : (
                  <div className="text_fold fw-900">FOLD</div>
                )}
              </div>
            </div>
            <div className="flex info_user">
              <div className="left sp_full">
                <div className="name text-center ">
                  {player?.user?.username}
                </div>
              </div>
              <div className="right sp_full">
                <div className="money fw-700">
                  $ {formatChipsAmount(currentStack)}
                </div>
              </div>

              {isWinner && (
                <div className="status status_win !opacity-100">
                  <Image
                    src="/images/status_win.png"
                    alt="pokerOnImage"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-full"
                  />
                </div>
              )}

              {isFolded && (
                <div className="status">
                  <div className="wrap_status status_full">
                    <svg viewBox="0 0 200 200">
                      <circle
                        className="circle"
                        cx="100"
                        cy="100"
                        r="95"
                        stroke="#231f20"
                        strokeWidth="8"
                        fillOpacity="0"
                      />
                    </svg>
                    <span>풀</span>
                  </div>
                </div>
              )}

              {isTurn && (
                <div className="status">
                  <div className="wrap_status status_countdown">
                    <svg viewBox="0 0 200 200">
                      <circle
                        className="circle !animate-[stroke_17s_ease-out_forwards]"
                        cx="100"
                        cy="100"
                        r="95"
                        stroke="#231f20"
                        stroke-width="8"
                        fill-opacity="0"
                      ></circle>
                    </svg>
                    <span>{counter - 2 >= 0 ? counter - 2 : 0}s</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CurrentPlayerAction
        isTurn={isTurn}
        player={player}
        bet={bet}
        setIsAction={setIsAction}
        setBet={setBet}
        match={match}
        tableId={tableId}
        currentParticipant={currentParticipant}
      />
      <div className="absolute bottom-0">
        <ChipsAmountBadge value={currentBet} />
      </div>
    </div>
  )
}
