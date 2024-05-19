'use client'

import { BetSlider } from '@/components/bet-slider'
import { useSocket } from '@/providers/socket-provider'
import { Match, Participant, Player, PokerActions, RaiseType } from '@/types'
import React, { useState } from 'react'
import { formatChipsAmount } from '@/utils/formatting'
import { getGenderFromImageUrl, playSound } from '@/utils/sound'
import { useIsFolded } from '@/store/use-is-folded'
import { ActionItem } from './action-item'
import { useKey } from 'react-use'

interface CurrentPlayerActionProps {
  tableId: string
  currentParticipant: Participant | undefined
  match: Match | null
  bet: number
  setBet: React.Dispatch<React.SetStateAction<number>>
  player: Player | undefined
  isTurn: boolean | undefined
  setIsAction: (isAction: boolean) => void
}

export const CurrentPlayerAction = ({
  isTurn,
  tableId,
  currentParticipant,
  match,
  bet,
  setBet,
  player,
  setIsAction,
}: CurrentPlayerActionProps) => {
  const { socket } = useSocket()
  const { setIsFolded } = useIsFolded()

  const [isProcessing, setIsProcessing] = useState(false)

  const gender = getGenderFromImageUrl(player?.user?.image || '')

  const fold = async () => {
    setIsAction(true)
    if (socket && !isProcessing) {
      playSound(PokerActions.FOLD, gender)
      setIsProcessing(true)
      socket.emit(PokerActions.FOLD, {
        tableId,
        participantId: currentParticipant?.id,
      })
      setIsFolded(true)
      setTimeout(() => {
        setIsProcessing(false)
        setIsAction(false)
      }, 2000)
    }
  }

  const check = () => {
    setIsAction(true)
    if (socket && !isProcessing) {
      playSound(PokerActions.CHECK, gender)
      setIsProcessing(true)
      socket.emit(PokerActions.CHECK, {
        tableId,
        participantId: currentParticipant?.id,
      })
      setTimeout(() => {
        setIsProcessing(false)
        setIsAction(false)
      }, 2000)
    }
  }

  const call = () => {
    setIsAction(true)
    if (socket && !isProcessing) {
      playSound(PokerActions.CALL, gender)

      setIsProcessing(true)
      socket.emit(PokerActions.CALL, {
        tableId,
        participantId: currentParticipant?.id,
      })
      setTimeout(() => {
        setIsProcessing(false)
        setIsAction(false)
      }, 2000)
    }
  }

  const raise = (amount: number, type: PokerActions) => {
    setIsAction(true)
    if (socket && !isProcessing) {
      setIsProcessing(true)
      socket.emit(PokerActions.RAISE, {
        tableId,
        participantId: currentParticipant?.id,
        amount,
        type,
      })
      setTimeout(() => {
        setIsProcessing(false)
        setIsAction(false)
      }, 2000)
    }
  }

  const onRaise = () => {
    playSound(PokerActions.RAISE, gender)
    const trueBetValue = bet > max ? max : bet < min ? min : bet
    raise(trueBetValue + currentBet, PokerActions.RAISE)
  }

  const onQuarter = () => {
    playSound(PokerActions.QUARTER, gender)
    raise(quarter + currentBet, PokerActions.QUARTER)
  }

  const onHalf = () => {
    playSound(PokerActions.HALF, gender)
    raise(half + currentBet, PokerActions.HALF)
  }

  const onFull = () => {
    playSound(PokerActions.FULL, gender)
    raise(currentPot + currentBet, PokerActions.FULL)
  }

  const onAllIn = () => {
    playSound(PokerActions.ALLIN, gender)
    raise(currentStack + currentBet, PokerActions.ALLIN)
  }

  const currentPot = match?.pot || 0
  const currentStack = player?.stack || 0
  const currentBet = currentParticipant?.bet || 0
  const currentCallAmount = match?.callAmount || 0
  const canNotCall = currentCallAmount === 0 || currentBet >= currentCallAmount
  const canNotCheck = currentCallAmount !== currentBet && currentCallAmount > 0

  const quarter = Math.floor(currentPot / 4)
  const half = Math.floor(currentPot / 2)
  const callSize =
    currentBet < currentCallAmount && currentCallAmount <= currentStack
      ? currentCallAmount - currentBet
      : 0

  const canQuarter = quarter >= currentCallAmount && currentStack >= quarter
  const canHalf = half >= currentCallAmount && currentStack >= half
  const canFull = currentPot >= currentCallAmount && currentStack >= currentPot

  const min = match?.minBet ? Math.max(match?.minBet, currentCallAmount) : 0

  const max = match?.table?.maxBuyIn
    ? Math.min(match?.table?.maxBuyIn, currentStack)
    : 0

  const onFourKeyPress = () => {
    const value = Math.min(bet + 0.25 * max, max)

    setBet(value)
  }

  const onFiveKeyPress = () => {
    const value = Math.max(bet - 0.25 * max, min)

    setBet(value)
  }

  //prettier-ignore
  useKey('4', () => {
    if(!isTurn || isProcessing) return 
    
    onFourKeyPress()
  }, {}, [onFourKeyPress])

  //prettier-ignore
  useKey('5', () => {
    if(!isTurn || isProcessing) return 

    onFiveKeyPress()
  }, {}, [onFiveKeyPress])

  return (
    <>
      <div className="toolbar">
        <ActionItem
          shortcut="1"
          label="쿼터"
          onClick={onQuarter}
          disabled={!isTurn || isProcessing || !canQuarter}
          amount={quarter}
        />

        <ActionItem
          shortcut="2"
          label="하프"
          onClick={onHalf}
          disabled={!isTurn || isProcessing || !canHalf}
          amount={half}
        />

        <ActionItem
          shortcut="3"
          label="풀"
          onClick={onFull}
          disabled={!isTurn || isProcessing || !canFull}
          amount={currentPot}
        />

        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          disabled={!isTurn || isProcessing}
        >
          {/* <span className="number number_left">4 </span> */}
          <span className="number number_left">4</span>
          <span className="number">5</span>
          <BetSlider bet={bet} setBet={setBet} min={min} max={max} />
        </button>

        <ActionItem
          shortcut="6"
          label="라이즈"
          onClick={onRaise}
          disabled={!isTurn || isProcessing}
        />

        {!canNotCall ? (
          <ActionItem
            shortcut="7"
            label="콜"
            onClick={call}
            disabled={!isTurn || isProcessing || canNotCall}
            amount={callSize}
          />
        ) : !canNotCheck ? (
          <ActionItem
            shortcut="7"
            label="체크"
            onClick={check}
            disabled={!isTurn || isProcessing || canNotCheck}
          />
        ) : (
          <ActionItem
            shortcut="7"
            label="콜"
            onClick={call}
            disabled={!isTurn || isProcessing || canNotCall}
            amount={callSize}
          />
        )}

        <ActionItem
          shortcut="8"
          label="다이"
          onClick={fold}
          disabled={!isTurn || isProcessing}
        />

        <ActionItem
          shortcut="9"
          label="올인"
          onClick={onAllIn}
          disabled={!isTurn || isProcessing}
        />
      </div>

      <div className="fixed right-12  bottom-9"></div>
    </>
  )
}
