'use client'

import { cn } from '@/lib/utils'
import { useModal } from '@/store/use-modal-store'
import { Match } from '@/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  match: Match | null
}

export const FullHouseModal = ({ match }: Props) => {
  const { isOpen, onClose, type } = useModal()

  const isModalOpen = isOpen && type === 'fullHouse'

  const [imgSrc, setImgSrc] = useState('/images/quaility/full_house.gif')

  useEffect(() => {
    if (isModalOpen) {
      setImgSrc(`/images/quaility/full_house.gif?${Date.now()}`)

      setTimeout(() => {
        onClose()
      }, 5000)
    }
  }, [isModalOpen, onClose])

  return (
    <div className={cn('status_quaility hidden', isModalOpen && 'show block')}>
      <div className="images">
        <Image
          src={imgSrc}
          alt="quality"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full"
          unoptimized
        />
      </div>
    </div>
  )
}
