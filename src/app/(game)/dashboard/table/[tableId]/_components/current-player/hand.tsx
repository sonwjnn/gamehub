'use client'

import { cn } from '@/lib/utils'
import { Card } from '../card'
import { HighlightCard } from '@/types'
import { useMedia } from 'react-use'
import { useEffect, useState } from 'react'

interface HandProps {
  onClick: () => void
  imageUrlFirst: string
  imageUrlSecond: string
  isHidden?: boolean
  highlightCards?: HighlightCard
  hasFirstHighlight?: boolean
  hasSecondHighlight?: boolean
}

export const Hand = ({
  onClick,
  imageUrlFirst,
  imageUrlSecond,
  isHidden,
  hasFirstHighlight,
  hasSecondHighlight,
}: HandProps) => {
  const [imageUrl, setImageUrl] = useState({
    first: '',
    second: '',
  })

  const hasHighlight = hasFirstHighlight || hasSecondHighlight

  const isMobile = useMedia('(max-width: 640px)', false)

  useEffect(() => {
    if (imageUrlFirst) {
      setImageUrl(prevImageUrl => ({ ...prevImageUrl, first: imageUrlFirst }))
    }
  }, [imageUrlFirst])

  useEffect(() => {
    if (imageUrlSecond) {
      setImageUrl(prevImageUrl => ({ ...prevImageUrl, second: imageUrlSecond }))
    }
  }, [imageUrlSecond])

  useEffect(() => {
    if (isHidden) {
      setImageUrl({ first: '', second: '' })
    }
  }, [isHidden])

  return (
    <div
      className="pocker_list current_poker_list cursor-pointer"
      onClick={() => onClick()}
    >
      <div
        className={cn(
          `item flipped opacity-0 pointer-events-none transition -translate-x-3 -translate-y-3.5`,
          !imageUrl.first && 'hide',
          !isHidden && 'opacity-100 pointer-events-auto',
          hasFirstHighlight && 'status_active',
          isMobile && 'translate-y-0'
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
          <Card imageUrl={imageUrl.first} value={10} />
        </div>
      </div>
      <div
        className={cn(
          `item flipped opacity-0 pointer-events-none transition -translate-x-3 -translate-y-3.5 `,
          !imageUrl.second && 'hide',
          !isHidden && 'opacity-100 pointer-events-auto',
          hasSecondHighlight && 'status_active',
          isMobile && 'translate-y-0'
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
          <Card imageUrl={imageUrl.second} value={10} />
        </div>
      </div>
    </div>
  )
}
