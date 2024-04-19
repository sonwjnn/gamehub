import { useEffect, useState } from 'react'
import { Card } from './card'
import { cn } from '@/lib/utils'
import { Card as CardType, Match } from '@/types'
import { formatChipsAmount } from '@/utils/formatting'

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

  useEffect(() => {
    if (!isHidden) {
      const timer = setTimeout(() => {
        setHiddenClass('')
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isHidden])

  return (
    <div className={cn('item flipped ', hiddenClass)}>
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
          Pot:
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
    // <div className="group_midle">
    //   <div className="group_pocker">
    //     <div className="list_pocker group_mask">
    //       <div className="item"></div>
    //       <div className="item"></div>
    //       <div className="item"></div>
    //       <div className="item"></div>
    //       <div className="item"></div>
    //     </div>
    //     <div className="list_pocker pocker_hide pocker_action">
    //       <div className="item flipped hide">
    //         <div className="pocker">
    //           <div className="front">
    //             <img src="/images/pocker/2_clubes.png" alt="" />
    //           </div>
    //           <div className="back">
    //             <img src="/images/pocker.png" alt="" />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="item flipped hide">
    //         <div className="pocker">
    //           <div className="front">
    //             <img src="/images/pocker/2_clubes.png" alt="" />
    //           </div>
    //           <div className="back">
    //             <img src="/images/pocker.png" alt="" />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="item flipped hide">
    //         <div className="pocker">
    //           <div className="front">
    //             <img src="/images/pocker/2_clubes.png" alt="" />
    //           </div>
    //           <div className="back">
    //             <img src="/images/pocker.png" alt="" />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="item flipped hide">
    //         <div className="pocker">
    //           <div className="front">
    //             <img src="/images/pocker/2_clubes.png" alt="" />
    //           </div>
    //           <div className="back">
    //             <img src="/images/pocker.png" alt="" />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="item flipped hide">
    //         <div className="pocker">
    //           <div className="front">
    //             <img src="/images/pocker/2_clubes.png" alt="" />
    //           </div>
    //           <div className="back">
    //             <img src="/images/pocker.png" alt="" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
