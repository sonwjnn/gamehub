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
          src={imageUrl}
          alt="pokerOnImage"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: 'auto', height: '100%' }}
        />
      </div>
      <div className="back" onClick={onClick}>
        <Image
          src="/images/pocker.png"
          alt="pokerOnImage"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: 'auto', height: '100%' }}
        />
      </div>
    </>
  )
}
