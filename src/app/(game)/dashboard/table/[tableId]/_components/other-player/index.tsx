'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Hand } from './hand'
import { Match, Participant, PlayerWithUser, PokerActions } from '@/types'
import { useEffect, useState } from 'react'
import { formatChipsAmount } from '@/utils/formatting'
import { ChipsAmountBadge } from '@/components/chips-amount-badge'

interface OtherPlayerProps {
  type?: 'fold' | 'active' | 'default'
  isHandVisible?: boolean
  match: Match | null
  player: PlayerWithUser
  participants: Participant[]
  tableId: string
}

export const OtherPlayer = ({
  isHandVisible,
  player,
  match,
  participants,
  tableId,
}: OtherPlayerProps) => {
  const [imageUrlFirst, setImageUrlFirst] = useState('')
  const [imageUrlSecond, setImageUrlSecond] = useState('')
  const [counter, setCounter] = useState(12)

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
    if (isTurn && counter > 0) {
      timer = setInterval(() => {
        setCounter(counter - 1)
      }, 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [counter, isTurn])

  useEffect(() => {
    if (isTurn) {
      setCounter(12)
    }
  }, [isTurn])

  return (
    <div
      className={cn(
        'group_user before:border-none',
        isTurn && 'user_active',
        isFolded && 'user_fold',
        isTurn && 'is-status',
        isWinner && isShowdown && 'user_done',
        !isWinner && isShowdown && 'is-lose'
      )}
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
                    className="w-auto h-full object-cover rounded-full"
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
                isShowdown={isShowdown}
                isHidden={!isHandVisible}
              />
            ) : (
              <div className="text_fold fw-900">FOLD</div>
            )}
          </div>
        </div>
        <div className="flex info_user">
          <div className="left sp_full">
            <div className="name text-center">{player.user?.username}</div>
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
                <span className="money">{formatChipsAmount(currentBet)} $</span>
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

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <ChipsAmountBadge value={currentBet} />
      </div>
    </div>
  )
}
