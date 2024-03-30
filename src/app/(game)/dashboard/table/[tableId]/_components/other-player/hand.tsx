import { cn } from '@/lib/utils'
import { Card } from '../card'
import { useEffect, useState } from 'react'

interface HandProps {
  showdown?: boolean
  imageUrlFirst: string
  imageUrlSecond: string
  isHidden?: boolean
}

export const Hand = ({
  imageUrlFirst,
  imageUrlSecond,
  // showdown,
  isHidden = true,
}: HandProps) => {
  const [isFlipped, setFlipped] = useState(false)

  const onToggle = () => {
    setFlipped(!isFlipped)
  }

  useEffect(() => {
    if (isHidden) setFlipped(false)
  }, [isHidden])

  return (
    <div
      className={cn('pocker_list', isFlipped && 'has_active')}
      onClick={onToggle}
    >
      <div
        className={cn(
          'item flipped opacity-0',
          // isFlipped && 'status_active',
          !isFlipped && 'hide',
          !isHidden && 'opacity-100'
        )}
      >
        <div className="pocker">
          <Card imageUrl={imageUrlFirst} showdown={isFlipped} value={10} />
        </div>
      </div>
      <div
        className={cn(
          'item flipped opacity-0',
          // isFlipped && 'status_active',
          !isFlipped && 'hide',
          !isHidden && 'opacity-100'
        )}
      >
        <div className="pocker">
          <Card imageUrl={imageUrlSecond} showdown={isFlipped} value={10} />
        </div>
      </div>
    </div>
  )
}
