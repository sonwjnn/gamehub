'use client'

import { useEffect, useState } from 'react'
import { Card } from './card'
import { cn } from '@/lib/utils'
import { Match } from '@/types'
import { formatChipsAmount } from '@/utils/formatting'
import sounds from '@/utils/contants/sound'
import { useAudio } from 'react-use'

interface BoardProps {
  match: Match | null
  isHidden?: boolean
  isShuffle?: boolean
}

const BoardCard = ({
  imageUrl,
  isHidden = true,
}: {
  imageUrl: string
  isHidden: boolean
}) => {
  const [hiddenClass, setHiddenClass] = useState(isHidden ? 'hide' : '')
  const [audio, _, controls] = useAudio({ src: sounds.soundOpen })

  useEffect(() => {
    if (!isHidden) {
      const timer = setTimeout(() => {
        controls.volume(0.5)
        controls.play()
        setHiddenClass('')
      }, 1000)

      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHidden])

  return (
    <div className={cn('item flipped', hiddenClass)}>
      {audio}
      <div className="pocker">
        <Card imageUrl={imageUrl} value={10} />
      </div>
    </div>
  )
}

export const Board = ({ match }: BoardProps) => {
  const isPreFlop = match?.isPreFlop
  const isFlop = match?.isFlop
  const isTurn = match?.isTurn
  const isRiver = match?.isRiver
  const board = match?.board

  useEffect(() => {
    if (isFlop) {
      new Audio(sounds.soundShare).play()
    }
  }, [isFlop])
  return (
    <div className="group_midle">
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
            isPreFlop && !isFlop && 'pocker_hide'
          )}
        >
          {board && board?.length && (
            <>
              {board
                ?.slice(0, 3)
                .map((card, index) => (
                  <BoardCard
                    key={card.id}
                    imageUrl={`/images/pocker/${card.rank.toLowerCase()}_${card.suit.toLowerCase()}.png`}
                    isHidden={!isFlop}
                  />
                ))}

              {board
                ?.slice(3, 4)
                .map((card, index) => (
                  <BoardCard
                    key={card.id}
                    imageUrl={`/images/pocker/${card.rank.toLowerCase()}_${card.suit.toLowerCase()}.png`}
                    isHidden={!isTurn}
                  />
                ))}
              {board
                ?.slice(4, 5)
                .map((card, index) => (
                  <BoardCard
                    key={card.id}
                    imageUrl={`/images/pocker/${card.rank.toLowerCase()}_${card.suit.toLowerCase()}.png`}
                    isHidden={!isRiver}
                  />
                ))}
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
