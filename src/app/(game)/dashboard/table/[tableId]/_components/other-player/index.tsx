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
import { CoinBet } from '@/components/coin-bet'
import { getGenderFromImageUrl, playSound } from '@/utils/sound'

interface OtherPlayerProps {
  type?: 'fold' | 'active' | 'default'
  isHandVisible?: boolean
  match: Match | null
  player: PlayerWithUser | undefined
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

  const gender = getGenderFromImageUrl(player?.user?.image || '')
  const currentParticipant = participants.find(
    item => item.playerId === player?.id
  )
  const isFolded = currentParticipant?.isFolded
  const isWinner = !isFolded && match?.winnerId === player?.id
  const isTurn = !isFolded && player?.isTurn
  const isShowdown = match?.isShowdown
  const isHaveWinner = match?.winnerId
  const isAllIn = player?.stack === 0 || !isShowdown
  const isUnfoldedParticipant = currentParticipant?.isFolded ? false : true

  const isWaiting = match && !match?.table.isHandOver && !currentParticipant

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
      playSound(PokerActions.CALL, gender)
    } else if (currentParticipant?.lastAction === PokerActions.RAISE) {
      playSound(PokerActions.RAISE, gender)
    } else if (currentParticipant?.lastAction === PokerActions.FOLD) {
      playSound(PokerActions.FOLD, gender)
    } else if (currentParticipant?.lastAction === PokerActions.CHECK) {
      playSound(PokerActions.CHECK, gender)
    } else if (currentParticipant?.lastAction === PokerActions.ALLIN) {
      playSound(PokerActions.ALLIN, gender)
    } else if (currentParticipant?.lastAction === PokerActions.QUARTER) {
      playSound(PokerActions.QUARTER, gender)
    } else if (currentParticipant?.lastAction === PokerActions.HALF) {
      playSound(PokerActions.HALF, gender)
    } else if (currentParticipant?.lastAction === PokerActions.FULL) {
      playSound(PokerActions.FULL, gender)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentParticipant?.lastAction])

  return (
    <div
      className={cn(
        'group_user before:border-none',
        !isFolded && !isWaiting && 'is-status',
        isTurn && 'user_active',
        isWinner && isHaveWinner && 'user_done',
        isFolded && 'user_fold',
        !isWinner && currentParticipant && isHaveWinner && 'is-lose',
        isWaiting && 'user_waitting',
        isShowdown && isUnfoldedParticipant && 'target_showdown'
      )}
    >
      <CoinBet bet={currentBet} />

      {match?.smallBlindId === player?.id && (
        <div className="slind slind_small">
          <span>SB</span>
        </div>
      )}

      {match?.bigBlindId === player?.id && (
        <div className="slind slind_big">
          <span>BB</span>
        </div>
      )}

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
            {!isWaiting && !isFolded && (
              <Hand
                imageUrlFirst={imageUrlFirst}
                imageUrlSecond={imageUrlSecond}
                isShowdown={isShowdown}
                isWinner={isWinner}
                isHidden={!isHandVisible}
              />
            )}
            {!isWaiting && isFolded && (
              <div className="text_fold fw-900">FOLD</div>
            )}
            {isWaiting && (
              <div className="text_waiting fw-700 text-up">
                waiting...
                <div className="spinner space-x-0.5">
                  <div className="rect1"></div>
                  <div className="rect2"></div>
                  <div className="rect3"></div>
                  <div className="rect4"></div>
                  <div className="rect5"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex info_user">
          <div className="left sp_full">
            <div className="name text-center">{player?.user?.username}</div>
          </div>
          <div className="right sp_full">
            <div className="money fw-700 flex flex-midle flex-center">
              <div className="icon sz-12 mr-4">
                <i className="icon-coin"></i>
              </div>
              $ {formatChipsAmount(currentStack)}
            </div>
          </div>
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
            <span>올인</span>
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
  )
}
