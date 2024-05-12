'use client'

import { cn } from '@/lib/utils'
import { Card } from '../card'
import { HighlightCard } from '@/types'

interface HandProps {
  imageUrlFirst: string
  imageUrlSecond: string
  isHidden?: boolean
  highlightCards?: HighlightCard
  hasFirstHighlight?: boolean
  hasSecondHighlight?: boolean
}

export const Hand = ({
  imageUrlFirst,
  imageUrlSecond,
  isHidden = true,
  hasFirstHighlight,
  hasSecondHighlight,
}: HandProps) => {
  return (
    <div className="pocker_list current_poker_list">
      <div
        className={cn(
          `item flipped opacity-0 pointer-events-none transition -translate-x-1 -translate-y-1 scale-110`,
          !imageUrlFirst && 'hide',
          !isHidden && 'opacity-100 pointer-events-auto',
          hasFirstHighlight && 'status_active'
        )}
      >
        <div className="pocker ">
          <Card imageUrl={imageUrlFirst} value={10} />
        </div>
      </div>
      <div
        className={cn(
          `item flipped opacity-0 pointer-events-none transition -translate-x-0.5 -translate-y-1 scale-110`,
          !imageUrlSecond && 'hide',
          !isHidden && 'opacity-100 pointer-events-auto',
          hasSecondHighlight && 'status_active'
        )}
      >
        <div className="pocker ">
          <Card imageUrl={imageUrlSecond} value={10} />
        </div>
      </div>
    </div>
  )
}
