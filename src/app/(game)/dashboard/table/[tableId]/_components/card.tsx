import Image from 'next/image'

interface CardProps {
  imageUrl: string
  value: number
  className?: string
  showdown?: boolean
}

export const Card = ({ imageUrl, className, showdown }: CardProps) => {
  return (
    <>
      <div className="front">
        <Image
          src={imageUrl}
          alt="pokerOnImage"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: 'auto', height: '100%' }}
        />
      </div>
      <div className="back">
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
