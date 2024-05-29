import { cn } from '@/lib/utils'
import { Card } from '../card'
import { useEffect, useState } from 'react'
import { useSocket } from '@/providers/socket-provider'
import { PokerActions } from '@/types'

interface HandProps {
  playerId: string | undefined
  isShowdown?: boolean
  imageUrlFirst: string
  imageUrlSecond: string
  isHidden?: boolean
  isWinner: boolean
}

export const Hand = ({
  playerId,
  imageUrlFirst,
  imageUrlSecond,
  isShowdown,
  isHidden = true,
  isWinner = false,
}: HandProps) => {
  const { socket } = useSocket()
  const [showdownDelay, setShowdownDelay] = useState(false)

  useEffect(() => {
    if (isShowdown) {
      const timeoutId = setTimeout(() => {
        setShowdownDelay(true)
      }, 1000)

      return () => clearTimeout(timeoutId)
    } else {
      setShowdownDelay(false)
    }
  }, [isShowdown])

  useEffect(() => {
    if (socket) {
      socket.on(
        PokerActions.HAND_SHOWED,
        ({
          tableId,
          playerId: playerSocketId,
        }: {
          tableId: string
          playerId: string
        }) => {
          if (!playerId) return

          if (playerSocketId === playerId) {
            setShowdownDelay(true)
          }
        }
      )
    }

    return () => {
      if (socket) {
        socket.off(PokerActions.HAND_SHOWED)
      }
    }
  }, [socket, playerId])

  return (
    <div
      className={cn(
        'pocker_list other_poker_list',
        showdownDelay && 'has_active'
      )}
    >
      <div
        className={cn(
          'item flipped opacity-0  pointer-events-none',
          isWinner && 'status_active',
          !showdownDelay && 'hide',
          !isHidden && 'opacity-100 pointer-events-auto'
        )}
      >
        <div className="pocker">
          <Card
            imageUrl={imageUrlFirst}
            isShowdown={showdownDelay}
            value={10}
          />
        </div>
      </div>
      <div
        className={cn(
          'item flipped opacity-0  pointer-events-none',
          isWinner && 'status_active',
          !showdownDelay && 'hide',
          !isHidden && 'opacity-100 pointer-events-auto'
        )}
      >
        <div className="pocker">
          <Card
            imageUrl={imageUrlSecond}
            isShowdown={showdownDelay}
            value={10}
          />
        </div>
      </div>
    </div>
  )
}
