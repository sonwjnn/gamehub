'use client'

import { cn } from '@/lib/utils'
import { useModal } from '@/store/use-modal-store'
import { Match } from '@/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  match: Match | null
}

export const RoyalFlushModal = ({ match }: Props) => {
  const { isOpen, onClose, type } = useModal()

  const isModalOpen = isOpen && type === 'royalFlush'
  const [imgSrc, setImgSrc] = useState('/images/quaility/royal.gif')

  useEffect(() => {
    if (isModalOpen) {
      setImgSrc(`/images/quaility/royal.gif?${Date.now()}`)

      setTimeout(() => {
        onClose()
      }, 5000)
    }
  }, [isModalOpen, onClose])

  return (
    <div className={cn('status_quaility hidden', isModalOpen && 'show block')}>
      <canvas id="fallingLeavesCanvas"></canvas>
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
          <div className="info_quaility">
            <span>JACKPOT </span>
            <span>
              0013<span className="sub"># </span>
            </span>
            <span>
              8811<span className="sub"># </span>
            </span>
            <span>
              9929<span className="sub">#</span>
            </span>
          </div>
          <div className="money_count">+10.000$</div>
        </div>
      </div>
    </div>
  )
}
