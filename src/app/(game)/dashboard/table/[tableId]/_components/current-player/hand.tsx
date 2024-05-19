'use client'

import { cn } from '@/lib/utils'
import { Card } from '../card'
import { HighlightCard } from '@/types'
import { useMedia } from 'react-use'

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
  const hasHighlight = hasFirstHighlight || hasSecondHighlight

  const isMobile = useMedia('(max-width: 640px)', false)

  return (
    <div className="pocker_list current_poker_list">
      <div
        className={cn(
          `item flipped opacity-0 pointer-events-none transition -translate-x-1 -translate-y-1.5 scale-[1.14]`,
          !imageUrlFirst && 'hide',
          !isHidden && 'opacity-100 pointer-events-auto',
          hasFirstHighlight && 'status_active',
          isMobile && 'scale-[1.1]'
        )}
      >
        <div
          className={cn(
            'pocker ',
            hasHighlight &&
              !hasFirstHighlight &&
              'before:!inset-0 before:!bg-black/30'
          )}
        >
          <Card imageUrl={imageUrlFirst} value={10} />
        </div>
      </div>
      <div
        className={cn(
          `item flipped opacity-0 pointer-events-none transition -translate-x-0.5 -translate-y-1.5 scale-[1.14]`,
          !imageUrlSecond && 'hide',
          !isHidden && 'opacity-100 pointer-events-auto',
          hasSecondHighlight && 'status_active',
          isMobile && 'scale-[1.1]'
        )}
      >
        <div
          className={cn(
            'pocker ',
            hasHighlight &&
              !hasSecondHighlight &&
              'before:!inset-0 before:!bg-black/30'
          )}
        >
          <Card imageUrl={imageUrlSecond} value={10} />
        </div>
      </div>
    </div>
  )
}
