import { useEffect, useState } from 'react'
import { Card } from './card'
import { cn } from '@/lib/utils'
import Sound from '@/utils/contants/sound'
import { Card as CardType, Match } from '@/types'

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
  return (
    <div className={cn('item flipped ', isHidden && 'hide')}>
      <div className="pocker">
        <Card imageUrl={imageUrl} value={10} />
      </div>
    </div>
  )
}

export const Board = ({ match, isHidden = false, isShuffle }: BoardProps) => {
  const [isPreFlop, setPreFlop] = useState(true)
  const [isFlop, setFlop] = useState(false)
  const [isTurn, setTurn] = useState(false)
  const [isRiver, setRiver] = useState(false)
  const [board, setBoard] = useState<CardType[] | null>(null)

  useEffect(() => {
    if (match) {
      setPreFlop(match.isPreFlop)
      setFlop(match.isFlop)
      setTurn(match.isTurn)
      setRiver(match.isRiver)
      setBoard(match.board)
    }
  }, [match])

  if (!match) return null

  const isHandOver = match?.table?.isHandOver

  console.log(isHandOver, match?.table)

  return (
    <div className="group_midle">
      {isPreFlop && !isShuffle && (
        <>
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
                !isPreFlop && 'pocker_hide'
              )}
            >
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
            </div>
          </div>
          <div className="group_number flex flex-midle flex-center gap-24">
            <div className="text">
              Total:<span className="fw-900">$ 5.252</span>
            </div>
            <div className="text">
              Call:<span className="fw-900">$ 1.500</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
