'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Hand } from './hand'
import {
  CustomCard,
  Match,
  Participant,
  PlayerHighlightCards,
  PlayerWithUser,
  PokerActions,
  RaiseType,
} from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { formatChipsAmount } from '@/utils/formatting'
import { CoinBet } from '@/components/coin-bet'
import { getGenderFromImageUrl, playSound } from '@/utils/sound'
import { CoinAnimate } from '@/components/coin-animate'
import { useAudio } from 'react-use'
import sound from '@/utils/contants/sound'
import { calculateWinRate, evaluateHandStrength } from '@/utils/winrate'

interface OtherPlayerProps {
  type?: 'fold' | 'active' | 'default'
  isHandVisible?: boolean
  match: Match | null
  player: PlayerWithUser | undefined
  participants: Participant[]
  tableId: string
  playersHighlightSet: PlayerHighlightCards
}

export const OtherPlayer = ({
  isHandVisible,
  player,
  match,
  participants,
  tableId,
  playersHighlightSet,
}: OtherPlayerProps) => {
  const gender = getGenderFromImageUrl(player?.user?.image || '')

  const [quarAudio, _q, quarControls] = useAudio({
    src: gender === 'male' ? sound.soundQuarterBoy : sound.soundQuarterGirl,
  })
  const [halfAudio, _h, halfControls] = useAudio({
    src: gender === 'male' ? sound.soundHalfBoy : sound.soundHalfGirl,
  })
  const [fullAudio, _f, fullControls] = useAudio({
    src: gender === 'male' ? sound.soundFullBoy : sound.soundFullGirl,
  })
  const [allAudio, _a, allControls] = useAudio({
    src: gender === 'male' ? sound.soundAllBoy : sound.soundAllGirl,
  })
  const [raiseAudio, _r, raiseControls] = useAudio({
    src: gender === 'male' ? sound.soundRaiseBoy : sound.soundRaiseGirl,
  })
  const [callAudio, _c, callControls] = useAudio({
    src: gender === 'male' ? sound.soundCallBoy : sound.soundCallGirl,
  })
  const [checkAudio, _ch, checkControls] = useAudio({
    src: gender === 'male' ? sound.soundCheckBoy : sound.soundCheckGirl,
  })
  const [foldAudio, _fo, foldControls] = useAudio({
    src: gender === 'male' ? sound.soundFoldBoy : sound.soundFoldGirl,
  })

  const [imageUrlFirst, setImageUrlFirst] = useState('')
  const [imageUrlSecond, setImageUrlSecond] = useState('')
  const [counter, setCounter] = useState(12)
  const [isBet, setIsBet] = useState(false)
  const [winRate, setWinRate] = useState(0)

  const currentParticipant = participants.find(
    item => item.playerId === player?.id
  )
  const isFolded = currentParticipant?.isFolded
  const isWinner =
    (!isFolded && match?.winners?.some(w => w.id === player?.id)) || false
  const isTurn = !isFolded && player?.isTurn
  const isShowdown = match?.isShowdown
  const isHaveWinner = (match?.winners?.length ?? 0) > 0
  const isAllIn = player?.stack === 0 || !isShowdown
  const isUnfoldedParticipant = currentParticipant?.isFolded ? false : true

  const isWaiting = match && !match?.table.isHandOver && !currentParticipant

  const currentStack = player?.stack || 0
  const currentBet = currentParticipant?.bet || 0
  const currentPot = match?.pot || 0

  const calculateWinRateForPlayer = useCallback(() => {
    const getHandStrength = (playerId: string) => {
      const playerCards = playersHighlightSet[playerId]?.cards
      const boardCards = match?.board || []

      if (
        playerCards &&
        playerCards.concat(boardCards).length >= 5 &&
        (match?.isFlop || match?.isRiver)
      ) {
        const hand = hands(playerCards.concat(boardCards))
        return evaluateHandStrength(hand)
      }
      return null
    }

    const playerHandStrength = player?.id ? getHandStrength(player.id) : 0
    const winRate =
      playerHandStrength && !isFolded
        ? calculateWinRate(playerHandStrength?.score)
        : 0

    const combinedWinRate = Object.entries(playersHighlightSet).reduce(
      (totalWinRate, [participantId, highlightSet]) => {
        const combinedCards = highlightSet.cards.concat(match?.board || [])
        if (combinedCards.length >= 5) {
          const handStrength = evaluateHandStrength(hands(combinedCards))
          const participant = participants.find(
            item => item.playerId === participantId
          )
          if (participant?.isFolded) {
            return totalWinRate
          }
          return totalWinRate + calculateWinRate(handStrength?.score)
        }
        return totalWinRate
      },
      0
    )

    return isNaN(winRate / combinedWinRate)
      ? 0
      : (winRate / combinedWinRate) * 100
  }, [playersHighlightSet, match, participants, player?.id, isFolded])

  useEffect(() => {
    setWinRate(calculateWinRateForPlayer())
  }, [calculateWinRateForPlayer, match?.isFlop, match?.isTurn, match?.isRiver])

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
    let url = ''
    if (currentParticipant?.lastAction === PokerActions.CALL) {
      callControls.play()
    } else if (currentParticipant?.lastAction === PokerActions.RAISE) {
      raiseControls.play()
    } else if (currentParticipant?.lastAction === PokerActions.FOLD) {
      foldControls.play()
    } else if (currentParticipant?.lastAction === PokerActions.CHECK) {
      checkControls.play()
    } else if (currentParticipant?.lastAction === PokerActions.ALLIN) {
      allControls.play()
    } else if (currentParticipant?.lastAction === PokerActions.QUARTER) {
      quarControls.play()
    } else if (currentParticipant?.lastAction === PokerActions.HALF) {
      halfControls.play()
    } else if (currentParticipant?.lastAction === PokerActions.FULL) {
      fullControls.play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentParticipant?.lastAction])

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (currentBet) {
      setIsBet(true)
      timer = setTimeout(() => {
        setIsBet(false)
      }, 2000)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [currentBet])

  const hands = (cards: CustomCard[]): CustomCard[] => {
    return Array.from(
      new Map(cards.map(item => [item.id, item])).values()
    ).slice(0, 5)
  }

  const winRateResult = () => {
    if (isWinner) return '100.00'
    if (!isWinner && isHaveWinner) return '0.00'
    return winRate.toFixed(2)
  }

  const WinRateCard = () => {
    return (
      <div
        className={cn('absolute left-[-35%] lg:left-[-15%] bottom-[-45%] lg:bottom-[-35%] hidden', {
          block: isFolded || isShowdown || isHaveWinner,
        })}
      >
        <div className="bg-[#0e063a] text-white text-xs lg:text-sm font-bold rounded-sm p-1 lg:p-2 mb-2 opacity-80 border w-20 lg:w-32">
          <p className="text-[#ffaa00] text-center">{winRateResult()}%</p>
        </div>
      </div>
    )
  }

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
      {quarAudio}
      {halfAudio}
      {fullAudio}
      {allAudio}
      {raiseAudio}
      {callAudio}
      {checkAudio}
      {foldAudio}
      <WinRateCard />
      <CoinBet className="coin_bet_other" bet={currentBet} pot={currentPot} />
      {participants.length > 2 && match?.buttonId === player?.id && (
        <div className="slind slind_dealer">
          <Image
            src={'/images/slind_dealer.png'}
            alt="dealerImage"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      )}

      {match?.smallBlindId === player?.id && (
        <div className="slind slind_small">
          <div className="box">
            <span>SB</span>
          </div>
        </div>
      )}

      {match?.bigBlindId === player?.id && (
        <div className="slind slind_big">
          <div className="box">
            <span>BB</span>
          </div>
        </div>
      )}

      <div className="wrap">
        <div className="flex flex-midle">
          <div className="left">
            {isBet && <CoinAnimate />}

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
                playerId={player?.id}
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
            <div className="name text-center">{player?.user?.name}</div>
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
            <span className="sub">풀</span>
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
                strokeWidth="8"
                fillOpacity="0"
              ></circle>
            </svg>
            <span className="sub">콜</span>
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
                strokeWidth="8"
                fillOpacity="0"
              ></circle>
            </svg>
            <span className="sub">라이즈</span>
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
                strokeWidth="8"
                fillOpacity="0"
              ></circle>
            </svg>
            <span className="sub">체크</span>
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
            <span className="sub">풀</span>
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
                strokeWidth="8"
                fillOpacity="0"
              ></circle>
            </svg>
            <span className="sub">쿼터</span>
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
                strokeWidth="8"
                fillOpacity="0"
              ></circle>
            </svg>
            <span className="sub">하프</span>
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
                strokeWidth="8"
                fillOpacity="0"
              ></circle>
            </svg>
            <span className="sub">풀</span>
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
                strokeWidth="8"
                fillOpacity="0"
              ></circle>
            </svg>
            <span className="sub">올인</span>
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
                strokeWidth="8"
                fillOpacity="0"
              ></circle>
            </svg>
            <span className="sub">{counter - 2 >= 0 ? counter - 2 : 0}s</span>
          </div>
        </div>
      )}
    </div>
  )
}
