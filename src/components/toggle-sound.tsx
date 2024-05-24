'use client'

import { useToggleSound } from '@/store/use-toggle-sound'
import { useEffect } from 'react'

type ToggleSoundProps = {}

export const ToggleSound = ({}: ToggleSoundProps) => {
  const { isSound, setIsSound } = useToggleSound()

  useEffect(() => {
    const mediaElements = document.querySelectorAll('audio, video')
    mediaElements.forEach(media => {
      ;(media as HTMLMediaElement).muted = !isSound
    })
  }, [isSound])

  return (
    <div className="item border-left">
      <div className="block_switch">
        <input
          id="switch-rounded"
          type="checkbox"
          checked={isSound}
          onChange={() => setIsSound(!isSound)}
        />
        <label htmlFor="switch-rounded"></label>
      </div>
    </div>
  )
}
