'use client'

import { BetSlider } from '@/components/bet-slider'
import { useSocket } from '@/providers/socket-provider'
import { Match, Participant, Player, PokerActions } from '@/types'
import { useState } from 'react'
import Sound from '@/utils/contants/sound'

interface CurrentPlayerActionProps {
  tableId: string
  currentParticipant: Participant | undefined
  match: Match | null
  bet: number
  setBet: (bet: number) => void
  player: Player | undefined
}

export const CurrentPlayerAction = ({
  tableId,
  currentParticipant,
  match,
  bet,
  setBet,
  player,
}: CurrentPlayerActionProps) => {
  const { socket } = useSocket()

  const [isProcessing, setIsProcessing] = useState(false)

  const fold = async () => {
    if (socket && !isProcessing) {
      new Audio(Sound.soundFoldBoy).play()
      setIsProcessing(true)
      await socket.emit(PokerActions.FOLD, {
        tableId,
        participantId: currentParticipant?.id,
      })
      setIsProcessing(false)
    }
  }

  const check = () => {
    if (socket && !isProcessing) {
      // new Audio(Sound.sou).play()
      setIsProcessing(true)
      socket.emit(PokerActions.CHECK, {
        tableId,
        participantId: currentParticipant?.id,
      })
      setIsProcessing(false)
    }
  }

  const call = () => {
    if (socket && !isProcessing) {
      new Audio(Sound.soundCallBoy).play()

      setIsProcessing(true)
      socket.emit(PokerActions.CALL, {
        tableId,
        participantId: currentParticipant?.id,
      })
      setIsProcessing(false)
    }
  }

  const raise = (amount: number) => {
    if (socket && !isProcessing) {
      new Audio(Sound.soundCallBoy).play()
      setIsProcessing(true)
      socket.emit(PokerActions.RAISE, {
        tableId,
        participantId: currentParticipant?.id,
        amount,
      })
      setIsProcessing(false)
    }
  }

  const currentStack = currentParticipant?.player?.stack || player?.stack || 0
  const currentBet = currentParticipant?.bet ? currentParticipant?.bet : 0
  const currentCallAmount = match?.callAmount ? match?.callAmount : 0
  const canCall = currentBet > 0 || currentBet < currentCallAmount
  const canNotCheck = currentCallAmount !== currentBet && currentCallAmount > 0
  const callSize =
    currentCallAmount &&
    currentBet < currentCallAmount &&
    currentCallAmount <= currentStack
      ? currentCallAmount - currentBet
      : ''

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
        <div className="item" onClick={() => setBet(currentStack / 4)}>
          <span className="number">1</span>
          <div className="value">쿼터</div>
        </div>
        <div className="item" onClick={() => setBet(currentStack / 2)}>
          <span className="number">2</span>
          <div className="value">하프</div>
        </div>
        <div className="item" onClick={() => setBet(currentStack)}>
          <span className="number">3</span>
          <div className="value">풀</div>
        </div>
        <button className="item ">
          {/* <span className="number number_left">4 </span> */}
          <span className="number">4</span>
          <div className=" !text-white text-[32px] font-bold value">
            <BetSlider min={min} bet={bet} setBet={setBet} max={max!} />
          </div>
        </button>
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={() => raise(bet + currentBet)}
          disabled={isProcessing}
        >
          <span className="number">5</span>
          <div className="value">라이즈</div>
        </button>
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={call}
          disabled={isProcessing || !canCall}
        >
          <span className="number">7</span>
          <div className="value">콜 {callSize}</div>
        </button>
        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={fold}
          disabled={isProcessing}
        >
          <span className="number">8</span>
          <div className="value">다이</div>
        </button>
        {/* <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={() => raise(currentChipsAmount + currentBet)}
          disabled={isProcessing}
        >
          <span className="number">9</span>
          <div className="value">All in</div>
        </button> */}

        <button
          className="item disabled:pointer-events-none disabled:opacity-50"
          onClick={check}
          disabled={isProcessing || canNotCheck}
        >
          {/* <span className="number number_left">4 </span> */}
          <span className="number">9</span>
          <div className=" value">확인하다</div>
        </button>
      </div>

      <div className="fixed right-12  bottom-9"></div>
    </>
  )
}
