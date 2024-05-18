'use client'

import { Button } from '@/components/ui/button'
import { Volume, VolumeX } from 'lucide-react'
import { useEffect, useState } from 'react'

type ToggleSoundProps = {}

export const ToggleSound = ({}: ToggleSoundProps) => {
  const [isSoundOn, setSound] = useState(true)

  useEffect(() => {
    const mediaElements = document.querySelectorAll('audio, video')
    mediaElements.forEach(media => {
      ;(media as HTMLMediaElement).muted = !isSoundOn
    })
  }, [isSoundOn])

  return (
    <Button onClick={() => setSound(!isSoundOn)}>
      {isSoundOn ? <Volume /> : <VolumeX />}
    </Button>
  )
}
