'use client'

import { cn } from '@/lib/utils'
import { useIsWinner } from '@/store/use-is-winner'
import { Match } from '@/types'
import { formattedStringToCards } from '@/utils/formatting'
import Image from 'next/image'
import { useEffect } from 'react'

interface WinnerModalProps {
  match: Match | null
}

export const WinnerModal = ({ match }: WinnerModalProps) => {
  const { isWinner, setIsWinner } = useIsWinner()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    if (isWinner) {
      timeoutId = setTimeout(() => {
        setIsWinner(false)
      }, 5000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isWinner, setIsWinner])

  if (!match || !match.winMessages || !match.winMessages.length) return null

  const lastWinMessage = match.winMessages[match.winMessages.length - 1]

  const isShowdown = match?.isShowdown

  const bestHandCards = formattedStringToCards(lastWinMessage.bestHand || `[]`)

  return (
    <div className={cn('status_win !z-10', isWinner && 'active')}>
      <div className="content_top">
        <div className="list">
          {isShowdown &&
            bestHandCards.length &&
            bestHandCards.map((card: any, index) => (
              <div className="item" key={index}>
                <div className="wrap">
                  <Image
                    src={`/images/pocker/${card.rank.toLowerCase()}_${card.suit.toLowerCase()}.png`}
                    alt="pokerOnImage"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-full"
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="title">
          <Image
            src="/images/decor_win4.svg"
            alt="decor_win4"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-full"
          />
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <div className="title fw-500">
            <span className="fw-900">{lastWinMessage.winnerHand}</span>
            {lastWinMessage.content}
          </div>
          <div className="money">
            <span className="color-main">+{lastWinMessage.amount}$</span>
          </div>
        </div>
      </div>
    </div>
  )
}
