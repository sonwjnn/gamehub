import { cn } from '@/lib/utils'
import { Card } from '../card'
import { useEffect, useState } from 'react'

interface HandProps {
  isShowdown?: boolean
  imageUrlFirst: string
  imageUrlSecond: string
  isHidden?: boolean
}

export const Hand = ({
  imageUrlFirst,
  imageUrlSecond,
  isShowdown,
  isHidden = true,
}: HandProps) => {
  const [isFlipped, setFlipped] = useState(false)

  // const onToggle = () => {
  //   setFlipped(!isFlipped)
  // }

  useEffect(() => {
    if (isHidden) setFlipped(false)
  }, [isHidden])

  return (
    <div className={cn('pocker_list', isShowdown && 'has_active')}>
      <div
        className={cn(
          'item flipped opacity-0',
          // isFlipped && 'status_active',
          !isShowdown && 'hide',
          !isHidden && 'opacity-100'
        )}
      >
        <div className="pocker">
          <Card imageUrl={imageUrlFirst} isShowdown={isShowdown} value={10} />
        </div>
      </div>
      <div
        className={cn(
          'item flipped opacity-0',
          // isFlipped && 'status_active',
          !isShowdown && 'hide',
          !isHidden && 'opacity-100'
        )}
      >
        <div className="pocker">
          <Card imageUrl={imageUrlSecond} isShowdown={isShowdown} value={10} />
        </div>
      </div>
    </div>
  )
}
