'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAudio } from 'react-use'

export const SoundProvider = () => {
  const params = useParams()

  const [audio, _, controls] = useAudio({
    src: '/sounds/sound_home.mp3',
    autoPlay: true,
    loop: true,
  })

  useEffect(() => {
    if (params?.tableId) {
      controls.pause()
    } else {
      controls.volume(0.6)
      controls.play()
    }
  }, [params])

  return <>{audio}</>
}
