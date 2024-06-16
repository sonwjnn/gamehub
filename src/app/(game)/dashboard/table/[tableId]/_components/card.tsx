import Image from 'next/image'

interface CardProps {
  imageUrl: string
  value: number
  className?: string
  isShowdown?: boolean
}

export const Card = ({ imageUrl }: CardProps) => {
  return (
    <>
      <div className="front">
        <Image
          src={imageUrl || '/images/pocker.png'}
          alt="pokerOnImage"
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-full"
          unoptimized
        />
      </div>
      <div className="back">
        <Image
          src="/images/pocker.png"
          alt="pokerOnImage"
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-full"
          unoptimized
        />
      </div>
    </>
  )
}
