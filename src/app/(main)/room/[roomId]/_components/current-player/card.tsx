import { cn } from '@/lib/utils'
import Image from 'next/image'

interface CardProps {
  imageUrl: string
  value: number
  className?: string
}

export const Card = ({ imageUrl, className }: CardProps) => {
  return (
    <div className={cn('h-full w-full', className)}>
      <Image
        src={imageUrl}
        alt="pokerOnImage"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
