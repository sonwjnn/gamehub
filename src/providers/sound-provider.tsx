'use client'

import { useVolume } from '@/store/use-volume'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAudio, useMountedState } from 'react-use'
import { useDebounceCallback } from 'usehooks-ts'

export const SoundProvider = () => {
  const { volume } = useVolume()
  const isMounted = useMountedState()

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

  if (!isMounted) return null

  return <>{audio}</>
}
