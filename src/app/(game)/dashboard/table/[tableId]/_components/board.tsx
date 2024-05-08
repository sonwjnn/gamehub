'use client'

import { useEffect, useRef, useState } from 'react'
import { Card } from './card'
import { cn } from '@/lib/utils'
import { Match } from '@/types'
import { formatChipsAmount } from '@/utils/formatting'
import sounds from '@/utils/contants/sound'
import { useAudio } from 'react-use'
import gsap from 'gsap'

interface BoardProps {
  match: Match | null
  isHidden?: boolean
  isShuffle?: boolean
}

export const Board = ({ match }: BoardProps) => {
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
        duration: 0.5,
        x: '-100vw',
        y: '-100vh',
        opacity: 0,
        ease: 'power3.out',
      })

      const timer = setTimeout(() => {
        controls.volume(0.5)
        controls.play()
        setTurnHiddenClass('')
      }, 500)

      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTurn])

  useEffect(() => {
    if (isRiver && riverCardRef.current) {
      gsap.from(riverCardRef.current, {
        duration: 0.5,
        x: '-100vw',
        y: '-100vh',
        opacity: 0,
        ease: 'power3.out',
      })

      const timer = setTimeout(() => {
        controls.volume(0.5)
        controls.play()
        setRiverHiddenClass('')
      }, 500)

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
              {board?.slice(0, 3).map((card, index) => (
                <div key={card.id} className={cn('item flipped', hiddenClass)}>
                  <div className="pocker">
                    <Card
                      imageUrl={`/images/pocker/${card.rank.toLowerCase()}_${card.suit.toLowerCase()}.png`}
                      value={10}
                    />
                  </div>
                </div>
              ))}

              {isTurn && (
                <div ref={turnCardRef} className="py-[0.9%] px-[1.75%]">
                  <div className={cn('item flipped', turnHiddenClass)}>
                    <div className="pocker">
                      <Card
                        imageUrl={`/images/pocker/${board[3].rank.toLowerCase()}_${board[3].suit.toLowerCase()}.png`}
                        value={10}
                      />
                    </div>
                  </div>
                </div>
              )}
              {isRiver && (
                <div ref={riverCardRef} className="py-[0.9%] px-[1.75%]">
                  <div className={cn('item flipped', riverHiddenClass)}>
                    <div className="pocker">
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
