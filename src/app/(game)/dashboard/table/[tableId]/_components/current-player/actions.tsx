'use client'

import { BetSlider } from '@/components/bet-slider'
import { useSocket } from '@/providers/socket-provider'
import { Match, Participant, Player, PokerActions, RaiseType } from '@/types'
import React, { useState } from 'react'
import { getGenderFromImageUrl, playSound } from '@/utils/sound'
import { ActionItem } from './action-item'
import { useKey } from 'react-use'
import { cn } from '@/lib/utils'
import { FixedRaise } from '@/components/fixed-raise'

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
      playSound(type, gender)
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
    const trueBetValue = bet > max ? max : bet < min ? min : bet
    raise(trueBetValue + currentBet, PokerActions.RAISE)
  }

  const onQuarter = () => {
    raise(quarter + currentBet, PokerActions.QUARTER)
  }

  const onHalf = () => {
    raise(half + currentBet, PokerActions.HALF)
  }

  const onFull = () => {
    raise(currentPot + currentBet, PokerActions.FULL)
  }

  const onAllIn = () => {
    raise(currentStack + currentBet, PokerActions.ALLIN)
  }

  const onFourKeyPress = () => {
    const value = Math.max(bet - Math.round(0.25 * max), min)

    setBet(value)
  }

  const onFiveKeyPress = () => {
    const value = Math.min(bet + Math.round(0.25 * max), max)

    setBet(value)
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
          type="quarter"
          shortcut="7"
          label="쿼터"
          onClick={onQuarter}
          disabled={!isTurn || isProcessing || !canQuarter}
          amount={quarter}
          match={match}
          isTurn={isTurn}
        />

        <ActionItem
          type="half"
          shortcut="8"
          label="하프"
          onClick={onHalf}
          disabled={!isTurn || isProcessing || !canHalf}
          isTurn={isTurn}
          match={match}
          amount={half}
        />

        <ActionItem
          type="full"
          shortcut="9"
          label="풀"
          onClick={onFull}
          disabled={!isTurn || isProcessing || !canFull}
          match={match}
          isTurn={isTurn}
          amount={currentPot}
        />

        <button
          className={cn('item ', (!isTurn || isProcessing) && 'opacity-80')}
        >
          <span className="number number_left">4</span>
          <span className="number">5</span>
          <BetSlider bet={bet} setBet={setBet} min={min} max={max} />
        </button>

        <ActionItem
          type="raise"
          shortcut="6"
          label="라이즈"
          onClick={onRaise}
          match={match}
          isTurn={isTurn}
          disabled={!isTurn || isProcessing}
        />

        {!canNotCall ? (
          <ActionItem
            type="call"
            shortcut="1"
            label="콜"
            onClick={call}
            disabled={!isTurn || isProcessing || canNotCall}
            isTurn={isTurn}
            amount={callSize}
            match={match}
          />
        ) : !canNotCheck ? (
          <ActionItem
            type="check"
            shortcut="1"
            label="체크"
            onClick={check}
            match={match}
            isTurn={isTurn}
            disabled={!isTurn || isProcessing || canNotCheck}
          />
        ) : (
          <ActionItem
            type="call"
            shortcut="1"
            label="콜"
            onClick={call}
            match={match}
            isTurn={isTurn}
            disabled={!isTurn || isProcessing || canNotCall}
            amount={callSize}
          />
        )}

        <ActionItem
          type="fold"
          shortcut="2"
          label="다이"
          onClick={fold}
          match={match}
          isTurn={isTurn}
          disabled={!isTurn || isProcessing}
        />

        <ActionItem
          type="allIn"
          shortcut="3"
          label="올인"
          match={match}
          onClick={onAllIn}
          isTurn={isTurn}
          disabled={!isTurn || isProcessing}
        />
      </div>

      <div className="fixed right-12  bottom-9"></div>
      <FixedRaise bet={bet} setBet={setBet} min={min} max={max} />
    </>
  )
}
