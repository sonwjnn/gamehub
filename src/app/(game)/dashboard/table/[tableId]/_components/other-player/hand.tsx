import { cn } from '@/lib/utils'
import { Card } from './card'

interface HandProps {
  showdown?: boolean
  imageUrlFirst: string
  imageUrlSecond: string
}

export const Hand = ({
  imageUrlFirst,
  imageUrlSecond,
  showdown,
}: HandProps) => {
  return (
    <div className={cn('pocker_list', showdown && 'has_active')}>
      <div className={cn('item !max-w-[50%]', showdown && 'status_active')}>
        <div className="pocker">
          <Card imageUrl={imageUrlFirst} showdown={showdown} value={10} />
        </div>
      </div>
      <div className={cn('item !max-w-[50%]', showdown && 'status_active')}>
        <div
          className={cn(
            'pocker',
            showdown ? 'translate-x-[-3px]' : 'translate-x-[-6px]'
          )}
        >
          <Card imageUrl={imageUrlSecond} showdown={showdown} value={10} />
        </div>
      </div>
    </div>
  )
}
