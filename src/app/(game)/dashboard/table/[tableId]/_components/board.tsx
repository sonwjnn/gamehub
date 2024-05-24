'use client'

import { useEffect, useRef, useState } from 'react'
import { Card } from './card'
import { cn } from '@/lib/utils'
import { HighlightCard, Match } from '@/types'
import { formatChipsAmount } from '@/utils/formatting'
import sounds from '@/utils/contants/sound'
import { useAudio } from 'react-use'
import gsap from 'gsap'

interface BoardProps {
  match: Match | null
  isHidden?: boolean
  isShuffle?: boolean
  highlightCards?: HighlightCard
}

export const Board = ({ match, highlightCards }: BoardProps) => {
  const [audio, _, controls] = useAudio({ src: sounds.soundOpen })
  const [hiddenClass, setHiddenClass] = useState('hide')
  const [turnHiddenClass, setTurnHiddenClass] = useState('hide')
  const [riverHiddenClass, setRiverHiddenClass] = useState('hide')

  const isPreFlop = match?.isPreFlop
  const isFlop = match?.isFlop
  const isTurn = match?.isTurn
  const isRiver = match?.isRiver
  const board = match?.board

  const turnCardRef = useRef(null)
  const riverCardRef = useRef(null)

  useEffect(() => {
    if (isTurn && turnCardRef.current) {
      gsap.from(turnCardRef.current, {
        duration: 0.3,
        x: '-100vw',
        y: '-100vh',
        opacity: 0,
        ease: 'power3.out',
      })

      const timer = setTimeout(() => {
        controls.volume(0.5)
        controls.play()
        setTurnHiddenClass('')
      }, 300)

      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTurn])

  useEffect(() => {
    if (isRiver && riverCardRef.current) {
      gsap.from(riverCardRef.current, {
        duration: 0.3,
        x: '-100vw',
        y: '-100vh',
        opacity: 0,
        ease: 'power3.out',
      })

      const timer = setTimeout(() => {
        controls.volume(0.5)
        controls.play()
        setRiverHiddenClass('')
      }, 300)

      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRiver])

  useEffect(() => {
    if (isFlop) {
      new Audio(sounds.soundShare).play()

      const timer = setTimeout(() => {
        controls.volume(0.5)
        controls.play()
        setHiddenClass('')
      }, 700)

      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFlop])

  useEffect(() => {
    if (!isPreFlop) {
      setHiddenClass('hide')
      setTurnHiddenClass('hide')
      setRiverHiddenClass('hide')
    }
  }, [isPreFlop])

  const hasTurnHighlight = highlightCards?.cards.some(highlightCard => {
    if (!board || !highlightCard) return false
    return (
      highlightCard.rank === board[3].rank &&
      highlightCard.suit === board[3].suit
    )
  })
  const hasRiverHighlight = highlightCards?.cards.some(highlightCard => {
    if (!board) return false
    return (
      highlightCard.rank === board[4].rank &&
      highlightCard.suit === board[4].suit
    )
  })

  const hasHighLight =
    highlightCards && highlightCards.name && highlightCards.cards.length > 0

  return (
    <div className="group_midle">
      {audio}
      <div className="group_pocker">
        <div className="list_pocker group_mask">
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
        <div
          className={cn(
            'list_pocker  pocker_action',
            isPreFlop && !isFlop && 'pocker_hide '
          )}
        >
          {board && board?.length && (
            <>
              {board?.slice(0, 3).map((card, index) => {
                const hasFlopHighlight = highlightCards?.cards.some(
                  highlightCard =>
                    highlightCard.rank === card.rank &&
                    highlightCard.suit === card.suit
                )
                return (
                  <div
                    key={card.id}
                    className={cn(
                      'item flipped',
                      hiddenClass,
                      hasFlopHighlight && 'status_active'
                    )}
                  >
                    <div
                      className={cn(
                        'pocker',
                        hasHighLight &&
                          !hasFlopHighlight &&
                          'before:!inset-0 before:!bg-black/30'
                      )}
                    >
                      <Card
                        imageUrl={`/images/pocker/${card.rank.toLowerCase()}_${card.suit.toLowerCase()}.png`}
                        value={10}
                      />
                    </div>
                  </div>
                )
              })}

              {isTurn && (
                <div ref={turnCardRef} className="py-[0.9%] px-[1.75%] grow-0">
                  <div
                    className={cn(
                      'item flipped',
                      turnHiddenClass,
                      hasTurnHighlight && 'status_active'
                    )}
                  >
                    <div
                      className={cn(
                        'pocker !duration-700',
                        hasHighLight &&
                          !hasTurnHighlight &&
                          'before:!inset-0 before:!bg-black/30',
                        hasTurnHighlight &&
                          'before:!-top-[6%] before:!-bottom-[6%] before:!-left-[12%] before:!-right-[12%] before:!bg-transparent'
                      )}
                    >
                      <Card
                        imageUrl={`/images/pocker/${board[3].rank.toLowerCase()}_${board[3].suit.toLowerCase()}.png`}
                        value={10}
                      />
                    </div>
                  </div>
                </div>
              )}
              {isRiver && (
                <div ref={riverCardRef} className="py-[0.9%] px-[1.75%] grow-0">
                  <div
                    className={cn(
                      'item flipped',
                      riverHiddenClass,
                      hasRiverHighlight && 'status_active'
                    )}
                  >
                    <div
                      className={cn(
                        'pocker !duration-1500 ',
                        hasHighLight &&
                          !hasRiverHighlight &&
                          'before:!inset-0 before:!bg-black/30',
                        hasRiverHighlight &&
                          'before:!-top-[6%] before:!-bottom-[6%] before:!-left-[12%] before:!-right-[12%] before:!bg-transparent'
                      )}
                    >
                      <Card
                        imageUrl={`/images/pocker/${board[4].rank.toLowerCase()}_${board[4].suit.toLowerCase()}.png`}
                        value={10}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="group_number flex flex-midle flex-center gap-24">
        <div className="text">
          Total:
          <span className="fw-900">$ {formatChipsAmount(match?.pot || 0)}</span>
        </div>
        <div className="text">
          Call:
          <span className="fw-900">
            $ {formatChipsAmount(match?.callAmount || 0)}
          </span>
        </div>
      </div>
    </div>
  )
}
