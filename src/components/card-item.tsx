'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CardItemProps {
  imageUrl?: string
  title: string
  redirectUrl?: string
}

export const CardItem = ({ imageUrl, title, redirectUrl }: CardItemProps) => {
  const router = useRouter()

  const onClick = () => {
    if (redirectUrl) {
      router.push(redirectUrl)
    }
  }

  return (
    <div
      onClick={onClick}
      className="group relative mb-3 flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-4 transition hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md shadow-base">
        {imageUrl ? (
          <Image
            className="object-cover transition group-hover:scale-110"
            src={imageUrl}
            fill
            alt="card img"
            sizes="100%"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-white"></div>
        )}
      </div>

      <div className="flex w-full flex-col items-start gap-y-1 pt-4">
        <p className="w-full truncate font-semibold text-white">{title}</p>
      </div>
    </div>
  )
}
