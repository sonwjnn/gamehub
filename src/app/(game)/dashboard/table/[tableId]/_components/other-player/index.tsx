'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Hand } from './hand'
import {
  Match,
  Participant,
  PlayerWithUser,
  PokerActions,
  RaiseType,
} from '@/types'
import { useEffect, useState } from 'react'
import { formatChipsAmount } from '@/utils/formatting'
import sound from '@/utils/contants/sound'

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
  const isHaveWinner = match?.winnerId
  const isAllIn = player?.stack === 0 || !isShowdown

  const currentStack = player?.stack || 0
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

  useEffect(() => {
    if (currentParticipant?.lastAction === PokerActions.CALL) {
      new Audio(sound.soundCallBoy).play()
    } else if (currentParticipant?.lastAction === PokerActions.RAISE) {
      new Audio(sound.soundRaiseBoy).play()
    } else if (currentParticipant?.lastAction === PokerActions.FOLD) {
      new Audio(sound.soundFoldBoy).play()
    } else if (currentParticipant?.lastAction === PokerActions.CHECK) {
      new Audio(sound.soundCheckBoy).play()
    } else if (currentParticipant?.lastAction === RaiseType.ALLIN) {
      new Audio(sound.soundAllBoy).play()
    } else if (currentParticipant?.lastAction === RaiseType.QUARTER) {
      new Audio(sound.soundQuarterBoy).play()
    } else if (currentParticipant?.lastAction === RaiseType.HALF) {
      new Audio(sound.soundHalfBoy).play()
    } else if (currentParticipant?.lastAction === RaiseType.FULL) {
      new Audio(sound.soundFullBoy).play()
    }
  }, [currentParticipant?.lastAction])

  return (
    <div
      className={cn(
        'group_user before:border-none is-status',
        isTurn && 'user_active',
        isFolded && 'user_fold',
        isWinner && isHaveWinner && 'user_done',
        !isWinner && isHaveWinner && 'is-lose'
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
                isWinner={isWinner}
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
            <div className="money fw-700 flex flex-midle flex-center gap-8">
              <div className="icon sz-16">
                <i className="icon-coin"></i>
              </div>
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

          {currentParticipant?.lastAction === PokerActions.CALL && (
            <div className="status">
              <div className="wrap_status status_call">
                <span className="money">{formatChipsAmount(currentBet)} $</span>
                <svg viewBox="0 0 200 200">
                  <circle
                    className="circle"
                    cx="100"
                    cy="100"
                    r="95"
                    stroke="#231f20"
                    stroke-width="8"
                    fill-opacity="0"
                  ></circle>
                </svg>
                <span>콜</span>
                {/* <span>CALL</span> */}
              </div>
            </div>
          )}

          {currentParticipant?.lastAction === PokerActions.RAISE && (
            <div className="status">
              <div className="wrap_status status_raise">
                <span className="money">{formatChipsAmount(currentBet)} $</span>
                <svg viewBox="0 0 200 200">
                  <circle
                    className="circle"
                    cx="100"
                    cy="100"
                    r="95"
                    stroke="#231f20"
                    stroke-width="8"
                    fill-opacity="0"
                  ></circle>
                </svg>
                <span>라이즈</span>
                {/* <span>RAISE</span> */}
              </div>
            </div>
          )}

          {currentParticipant?.lastAction === PokerActions.CHECK && (
            <div className="status">
              <div className="wrap_status status_call">
                <svg viewBox="0 0 200 200">
                  <circle
                    className="circle"
                    cx="100"
                    cy="100"
                    r="95"
                    stroke="#231f20"
                    stroke-width="8"
                    fill-opacity="0"
                  ></circle>
                </svg>
                <span>체크</span>
                {/* <span>CHECK</span> */}
              </div>
            </div>
          )}

          {currentParticipant?.isFolded && (
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

          {currentParticipant?.lastAction === RaiseType.QUARTER && (
            <div className="status">
              <div className="wrap_status status_quarter">
                <span className="money">{formatChipsAmount(currentBet)} $</span>
                <svg viewBox="0 0 200 200">
                  <circle
                    className="circle"
                    cx="100"
                    cy="100"
                    r="95"
                    stroke="#231f20"
                    stroke-width="8"
                    fill-opacity="0"
                  ></circle>
                </svg>
                <span>쿼터</span>
              </div>
            </div>
          )}

          {currentParticipant?.lastAction === RaiseType.HALF && (
            <div className="status">
              <div className="wrap_status status_half">
                <span className="money">{formatChipsAmount(currentBet)} $</span>
                <svg viewBox="0 0 200 200">
                  <circle
                    className="circle"
                    cx="100"
                    cy="100"
                    r="95"
                    stroke="#231f20"
                    stroke-width="8"
                    fill-opacity="0"
                  ></circle>
                </svg>
                <span>하프</span>
              </div>
            </div>
          )}

          {currentParticipant?.lastAction === RaiseType.FULL && (
            <div className="status">
              <div className="wrap_status status_full">
                <span className="money">{formatChipsAmount(currentBet)} $</span>
                <svg viewBox="0 0 200 200">
                  <circle
                    className="circle"
                    cx="100"
                    cy="100"
                    r="95"
                    stroke="#231f20"
                    stroke-width="8"
                    fill-opacity="0"
                  ></circle>
                </svg>
                <span>풀</span>
              </div>
            </div>
          )}

          {currentParticipant?.isAllin && (
            <div className="status">
              <div className="wrap_status status_all">
                <span className="money">200 $</span>
                <svg viewBox="0 0 200 200">
                  <circle
                    className="circle"
                    cx="100"
                    cy="100"
                    r="95"
                    stroke="#231f20"
                    stroke-width="8"
                    fill-opacity="0"
                  ></circle>
                </svg>
                <span>올인</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
