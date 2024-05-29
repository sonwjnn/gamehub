'use client'

import { cn } from '@/lib/utils'
import { useModal } from '@/store/use-modal-store'
import { Match } from '@/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  match: Match | null
}

export const StraightFlushModal = ({ match }: Props) => {
  const { isOpen, onClose, type } = useModal()

  const isModalOpen = isOpen && type === 'straightFlush'

  const [imgSrc, setImgSrc] = useState('/images/quaility/straight_flush.gif')

  useEffect(() => {
    if (isModalOpen) {
      setImgSrc(`/images/quaility/straight_flush.gif?${Date.now()}`)

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
        <div className="result_info">
          <div className="money_count">+10.000$</div>
        </div>
      </div>
    </div>
  )
}
