'use client'

import { cn } from '@/lib/utils'
import { Card } from '../card'

interface HandProps {
  imageUrlFirst: string
  imageUrlSecond: string
  isHidden?: boolean
}

export const Hand = ({
  imageUrlFirst,
  imageUrlSecond,
  isHidden = true,
}: HandProps) => {
  return (
    <div className="pocker_list current_poker_list">
      <div
        className={cn(
          `item flipped opacity-0 transition -translate-x-1 -translate-y-1`,
          !imageUrlFirst && 'hide',
          !isHidden && 'opacity-100'
        )}
      >
        <div className="pocker ">
          <Card imageUrl={imageUrlFirst} value={10} />
        </div>
      </div>
      <div
        className={cn(
          `item flipped opacity-0 transition -translate-x-1 -translate-y-1`,
          !imageUrlSecond && 'hide',
          !isHidden && 'opacity-100'
        )}
      >
        <div className="pocker ">
          <Card imageUrl={imageUrlSecond} value={10} />
        </div>
      </div>
    </div>
  )
}
