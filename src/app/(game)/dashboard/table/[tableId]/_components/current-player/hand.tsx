'use client'

import { cn } from '@/lib/utils'
import { Card } from '../card'
import { useState } from 'react'

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
  const [isFlipped, setFlipped] = useState(true)

  const onToggle = () => {
    setFlipped(!isFlipped)
  }

  return (
    <div className="pocker_list" onClick={onToggle}>
      {!isHidden && (
        <>
          <div
            className={cn(
              `item flipped opacity-0 transition`,
              isFlipped && 'hide',
              !isHidden && 'opacity-100'
            )}
          >
            <div className="pocker">
              <Card imageUrl={imageUrlFirst} value={10} />
            </div>
          </div>
          <div
            className={cn(
              `item flipped opacity-0 transition`,
              isFlipped && 'hide',
              !isHidden && 'opacity-100'
            )}
          >
            <div className="pocker">
              <Card imageUrl={imageUrlSecond} value={10} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
