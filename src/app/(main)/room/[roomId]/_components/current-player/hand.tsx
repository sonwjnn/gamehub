import { cn } from '@/lib/utils'
import { Card } from './card'

interface HandProps {
  imageUrlFirst: string
  imageUrlSecond: string
}

export const Hand = ({ imageUrlFirst, imageUrlSecond }: HandProps) => {
  return (
    <div className="pocker_list">
      <div className="item !max-w-[50%]">
        <div className="pocker">
          <Card imageUrl={imageUrlFirst} value={10} />
        </div>
      </div>
      <div className="item !max-w-[50%]">
        <div className="pocker translate-x-[-3px]">
          <Card imageUrl={imageUrlSecond} value={10} />
        </div>
      </div>
    </div>
  )
}
