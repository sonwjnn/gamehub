import { useEffect, useState } from 'react'
import { Card } from './card'
import { cn } from '@/lib/utils'

interface BoardProps {
  cards: string[]
  isHidden?: boolean
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

export const Board = ({ cards, isHidden = false }: BoardProps) => {
  const [isFirst, setFirst] = useState(false)
  const [isFlop, setFlop] = useState(false)
  const [isTurn, setTurn] = useState(false)
  const [isRiver, setRiver] = useState(false)

  const handleMultipleActions = () => {
    if (!isFirst) {
      setFirst(true)
      return
    }
    if (!isFlop) {
      setFlop(true)
      return
    }
    if (!isTurn) {
      setTurn(true)
      return
    }
    if (!isRiver) {
      setRiver(true)
      return
    }
  }

  return (
    <div className="group_midle">
      {!isHidden && (
        <>
          <div className="group_pocker" onClick={handleMultipleActions}>
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
                !isFirst && 'pocker_hide'
              )}
            >
              {cards.slice(0, 3).map((card, index) => (
                <BoardCard key={card} imageUrl={card} isHidden={!isFlop} />
              ))}
              {cards.slice(3, 4).map((card, index) => (
                <BoardCard key={card} imageUrl={card} isHidden={!isTurn} />
              ))}
              {cards.slice(4, 5).map((card, index) => (
                <BoardCard key={card} imageUrl={card} isHidden={!isRiver} />
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
