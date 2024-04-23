'use client'

import { BetSlider } from '@/components/bet-slider'
import { useSocket } from '@/providers/socket-provider'
import { Match, Participant, Player, PokerActions, RaiseType } from '@/types'
import { useState } from 'react'
import Sound from '@/utils/contants/sound'

interface CurrentPlayerActionProps {
  tableId: string
  currentParticipant: Participant | undefined
  match: Match | null
  bet: number
  setBet: (bet: number) => void
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

  const fold = async () => {
    setIsAction(true)
    if (socket && !isProcessing) {
      new Audio(Sound.soundFoldBoy).play()
      setIsProcessing(true)
      socket.emit(PokerActions.FOLD, {
        tableId,
        participantId: currentParticipant?.id,
      })
      setIsProcessing(false)
      setTimeout(() => {
        setIsAction(false)
      }, 2000)
    }
  }

  const check = () => {
    setIsAction(true)
    if (socket && !isProcessing) {
      new Audio(Sound.soundCheckBoy).play()
      setIsProcessing(true)
      socket.emit(PokerActions.CHECK, {
        tableId,
        participantId: currentParticipant?.id,
      })
      setIsProcessing(false)
      setTimeout(() => {
        setIsAction(false)
      }, 2000)
    }
  }

  const call = () => {
    setIsAction(true)
    if (socket && !isProcessing) {
      new Audio(Sound.soundCallBoy).play()

      setIsProcessing(true)
      socket.emit(PokerActions.CALL, {
        tableId,
        participantId: currentParticipant?.id,
      })
      setIsProcessing(false)
      setTimeout(() => {
        setIsAction(false)
      }, 2000)
    }
  }

  const raise = (amount: number, type: RaiseType) => {
    setIsAction(true)
    if (socket && !isProcessing) {
      setIsProcessing(true)
      socket.emit(PokerActions.RAISE, {
        tableId,
        participantId: currentParticipant?.id,
        amount,
        type,
      })
      setIsProcessing(false)
      setTimeout(() => {
        setIsAction(false)
      }, 2000)
    }
  }

  const onRaise = () => {
    new Audio(Sound.soundRaiseBoy).play()
    raise(bet + currentBet, RaiseType.RAISE)
  }

  const onQuater = () => {
    new Audio(Sound.soundQuarterBoy).play()
    raise(Math.floor(match?.pot! / 4), RaiseType.QUARTER)
  }

  const onHalf = () => {
    new Audio(Sound.soundHalfBoy).play()
    raise(Math.floor(match?.pot! / 2), RaiseType.HALF)
  }

  const onFull = () => {
    new Audio(Sound.soundFullBoy).play()
    raise(match?.pot!, RaiseType.FULL)
  }

  const onAllIn = () => {
    new Audio(Sound.soundAllBoy).play()
    raise(currentStack, RaiseType.ALLIN)
  }

  const currentStack = player?.stack || 0
  const currentBet = currentParticipant?.bet ? currentParticipant?.bet : 0
  const currentCallAmount = match?.callAmount ? match?.callAmount : 0
  const canCall = currentBet > 0 || currentBet < currentCallAmount
  const canNotCheck = currentCallAmount !== currentBet && currentCallAmount > 0

  const canQuater =
    (match?.pot ?? 0) / 4 >= currentCallAmount &&
    currentStack >= (match?.pot ?? 0) / 4
  const canHalf =
    (match?.pot ?? 0) / 2 >= currentCallAmount &&
    currentStack >= (match?.pot ?? 0) / 2
  const canFull =
    (match?.pot ?? 0) >= currentCallAmount && currentStack >= (match?.pot ?? 0)

  const min =
    match?.minBet && match?.minBet >= currentCallAmount
      ? match?.minBet
      : currentCallAmount

  const max =
    match?.table?.maxBuyIn && currentStack < match?.table?.maxBuyIn
      ? currentStack
      : match?.table?.maxBuyIn

  return (
    <>
      <div className="toolbar">
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={onQuater}
          disabled={!isTurn || isProcessing || !canQuater}
        >
          <span className="number">1</span>
          <div className="value">쿼터</div>
        </button>
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={onHalf}
          disabled={!isTurn || isProcessing || !canHalf}
        >
          <span className="number">2</span>
          <div className="value">하프</div>
        </button>
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={onFull}
          disabled={!isTurn || isProcessing || !canFull}
        >
          <span className="number">3</span>
          <div className="value">풀</div>
        </button>
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          disabled={!isTurn || isProcessing}
        >
          {/* <span className="number number_left">4 </span> */}
          <span className="number">4</span>
          <div className=" !text-white text-[32px] font-bold value">
            <BetSlider min={min} bet={bet} setBet={setBet} max={max!} />
          </div>
        </button>
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={onRaise}
          disabled={!isTurn || isProcessing}
        >
          <span className="number">5</span>
          <div className="value">라이즈</div>
        </button>
        {canCall ? (
          <button
            className="item disabled:pointer-events-none disabled:opacity-50"
            onClick={call}
            disabled={!isTurn || isProcessing || !canCall}
          >
            <span className="number">7</span>
            <div className="value">콜</div>
          </button>
        ) : !canNotCheck ? (
          <button
            className="item disabled:pointer-events-none disabled:opacity-50"
            onClick={check}
            disabled={!isTurn || isProcessing || canNotCheck}
          >
            {/* <span className="number number_left">4 </span> */}
            <span className="number">7</span>
            <div className=" value">체크</div>
          </button>
        ) : (
          <button
            className="item disabled:pointer-events-none disabled:opacity-50"
            onClick={call}
            disabled={!isTurn || isProcessing || !canCall}
          >
            <span className="number">7</span>
            <div className="value">콜</div>
          </button>
        )}

        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={fold}
          disabled={!isTurn || isProcessing}
        >
          <span className="number">8</span>
          <div className="value">다이</div>
        </button>
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={onAllIn}
          disabled={!isTurn || isProcessing}
        >
          <span className="number">9</span>
          <div className="value">올인</div>
        </button>
      </div>

      <div className="fixed right-12  bottom-9"></div>
    </>
  )
}
