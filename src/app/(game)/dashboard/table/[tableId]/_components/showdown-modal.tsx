'use client'

import { cn } from '@/lib/utils'
import { Match } from '@/types'
import { useEffect, useState } from 'react'
import { useAudio } from 'react-use'
import sounds from '@/utils/contants/sound'

interface ShowdownModalProps {
  match: Match | null
}

export const ShowdownModal = ({ match }: ShowdownModalProps) => {
  const [isShowdown, setIsShowdown] = useState(false)
  const [audio, _, controls, ref] = useAudio({ src: sounds.showdown })

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null
    if (match?.isShowdown) {
      setIsShowdown(true)
      controls.play()
      timerId = setTimeout(() => {
        setIsShowdown(false)
        controls.pause()
        if (ref.current) {
          ref.current.currentTime = 0
        }
      }, 2000)
    } else {
      setIsShowdown(false)
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match?.isShowdown])

  return (
    <div className={cn('showdown', isShowdown && 'show')}>
      {audio}
      <div className="wrap">
        <div className="text-shadow">SHOWDOWN</div>
      </div>
    </div>
  )
}
