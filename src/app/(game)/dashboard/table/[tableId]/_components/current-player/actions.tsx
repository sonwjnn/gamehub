'use client'

import { BetSlider } from '@/components/bet-slider'
import { useSocket } from '@/providers/socket-provider'
import { Participant, PokerActions } from '@/types'
import { useState } from 'react'

interface CurrentPlayerActionProps {
  tableId: string
  currentParticipant: Participant | undefined
}

export const CurrentPlayerAction = ({
  tableId,
  currentParticipant,
}: CurrentPlayerActionProps) => {
  const { socket } = useSocket()

  const [bet, setBet] = useState(0)
  const maxBet = currentParticipant?.player?.user?.chipsAmount || 10000

  const fold = () => {
    if (socket) {
      socket.emit(PokerActions.FOLD, {
        tableId,
        participantId: currentParticipant?.id,
      })
    }
  }

  const check = () => {
    if (socket) {
      socket.emit(PokerActions.CHECK, {
        tableId,
        participantId: currentParticipant?.id,
      })
    }
  }

  const call = () => {
    if (socket) {
      socket.emit(PokerActions.CALL, {
        tableId,
        participantId: currentParticipant?.id,
      })
    }
  }

  const raise = (amount: number) => {
    if (socket) {
      socket.emit(PokerActions.RAISE, {
        tableId,
        participantId: currentParticipant?.id,
      })
    }
  }

  return (
    <>
      <div className="toolbar">
        <div className="item" onClick={() => setBet(maxBet / 4)}>
          <span className="number">1</span>
          <div className="value">Quarter</div>
        </div>
        <div className="item" onClick={() => setBet(maxBet / 2)}>
          <span className="number">2</span>
          <div className="value">Half</div>
        </div>
        <div className="item" onClick={() => setBet(maxBet)}>
          <span className="number">3</span>
          <div className="value">Full</div>
        </div>
        <div className="item" onClick={check}>
          {/* <span className="number number_left">4 </span> */}
          <span className="number">5</span>
          <div className=" text-white text-[32px] font-bold">Check</div>
        </div>
        <div className="item" onClick={() => raise(0)}>
          <span className="number">5</span>
          <div className="value">Raise</div>
        </div>
        <div className="item" onClick={call}>
          <span className="number">7</span>
          <div className="value">Call</div>
        </div>
        <div className="item" onClick={fold}>
          <span className="number">8</span>
          <div className="value">Fold</div>
        </div>
        <div className="item">
          <span className="number">9</span>
          <div className="value">All in</div>
        </div>
      </div>

      <div className="absolute right-[-50%] bottom-4">
        <BetSlider value={bet} setValue={setBet} max={maxBet} />
      </div>
    </>
  )
}
