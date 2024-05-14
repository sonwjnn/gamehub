'use client'

import { BetSlider } from '@/components/bet-slider'
import { useSocket } from '@/providers/socket-provider'
import { Match, Participant, Player, PokerActions, RaiseType } from '@/types'
import React, { useState } from 'react'
import { formatChipsAmount } from '@/utils/formatting'
import { getGenderFromImageUrl, playSound } from '@/utils/sound'

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
    raise(bet + currentBet, PokerActions.RAISE)
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

  return (
    <>
      <div className="toolbar">
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={onQuarter}
          disabled={!isTurn || isProcessing || !canQuarter}
        >
          <span className="number">{1}</span>
          <div className="value">쿼터</div>
          <div className="view_money">{formatChipsAmount(quarter)}$</div>
        </button>
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={onHalf}
          disabled={!isTurn || isProcessing || !canHalf}
        >
          <span className="number">{2}</span>
          <div className="value">하프</div>
          <div className="view_money">{formatChipsAmount(half)}$</div>
        </button>
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={onFull}
          disabled={!isTurn || isProcessing || !canFull}
        >
          <span className="number">{3}</span>
          <div className="value">풀</div>
          <div className="view_money">{formatChipsAmount(currentPot)}$</div>
        </button>
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          disabled={!isTurn || isProcessing}
        >
          {/* <span className="number number_left">4 </span> */}
          <span className="number">4</span>
          <BetSlider bet={bet} setBet={setBet} min={min} max={max} />
        </button>
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={onRaise}
          disabled={!isTurn || isProcessing}
        >
          <span className="number">{5}</span>
          <div className="value">라이즈</div>
        </button>
        {!canNotCall ? (
          <button
            className="item disabled:pointer-events-none disabled:opacity-50"
            onClick={call}
            disabled={!isTurn || isProcessing || canNotCall}
          >
            <span className="number">{6}</span>
            <div className="value">콜</div>
            <div className="view_money">{formatChipsAmount(callSize)}$</div>
          </button>
        ) : !canNotCheck ? (
          <button
            className="item disabled:pointer-events-none disabled:opacity-50"
            onClick={check}
            disabled={!isTurn || isProcessing || canNotCheck}
          >
            {/* <span className="number number_left">4 </span> */}
            <span className="number">6</span>
            <div className=" value">체크</div>
          </button>
        ) : (
          <button
            className="item disabled:pointer-events-none disabled:opacity-50"
            onClick={call}
            disabled={!isTurn || isProcessing || canNotCall}
          >
            <span className="number">{6}</span>
            <div className="value">콜</div>
            <div className="view_money">{formatChipsAmount(callSize)}$</div>
          </button>
        )}

        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={fold}
          disabled={!isTurn || isProcessing}
        >
          <span className="number">7</span>
          <div className="value">다이</div>
        </button>
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={onAllIn}
          disabled={!isTurn || isProcessing}
        >
          <span className="number">{8}</span>
          <div className="value">올인</div>
        </button>
      </div>

      <div className="fixed right-12  bottom-9"></div>
    </>
  )
}
