'use client'

import { useIsWinner } from '@/store/use-is-winner'
import { Match, Card } from '@/types'
import { formattedCards } from '@/utils/formatting'
import Image from 'next/image'

interface WinnerModalProps {
  match: Match | null
}

export const WinnerModal = ({ match }: WinnerModalProps) => {
  const { isWinner } = useIsWinner()

  if (!match || !match.winMessages || !match.winMessages.length) return null

  const lastWinMessage = match.winMessages[match.winMessages.length - 1]


  return (
    <>
      {isWinner && (
        <div className="status_win active !z-10" id="status_win">
          <div className="content_top">
            <div className="list">
              {lastWinMessage.bestHand.map((card: Card, index) => (
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
                <span className="fw-900">
                  [
                  {lastWinMessage.winnerHand
                    .map(card => formattedCards(card.rank).rank)
                    .join(',')}
                  ]
                </span>{' '}
                {lastWinMessage.content}
              </div>
              <div className="money">
                <span className="color-main">+{lastWinMessage.amount}$</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
