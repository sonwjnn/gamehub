'use client'

import { Button } from '@/components/ui/button'
import { useToggleSound } from '@/store/use-toggle-sound'
import { Volume, VolumeX } from 'lucide-react'
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
    <Button onClick={() => setIsSound(!isSound)}>
      {isSound ? <Volume /> : <VolumeX />}
    </Button>
  )
}
