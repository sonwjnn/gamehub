import Image from 'next/image'
import Sound from '@/utils/contants/sound'

interface CardProps {
  imageUrl: string
  value: number
  className?: string
  isShowdown?: boolean
}

export const Card = ({ imageUrl, className, isShowdown }: CardProps) => {
  const onClick = () => {
    new Audio(Sound.soundOpen).play()
  }

  return (
    <>
      <div className="front" onClick={onClick}>
        <Image
          src={imageUrl || '/images/pocker.png'}
          alt="pokerOnImage"
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-full"
        />
      </div>
      <div className="back" onClick={onClick}>
        <Image
          src="/images/pocker.png"
          alt="pokerOnImage"
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-full"
        />
      </div>
    </>
  )
}
