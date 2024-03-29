import { cn } from '@/lib/utils'
import Image from 'next/image'

interface CardProps {
  imageUrl: string
  value: number
  className?: string
  showdown?: boolean
}

export const Card = ({ imageUrl, className, showdown }: CardProps) => {
  return (
    <div className={cn('h-full w-full', className)}>
      <Image
        src={showdown ? imageUrl : '/images/pocker.png'}
        alt="pokerOnImage"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
