'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import type { SoundLevel } from '@/public/icons'
import { SoundIcon } from '@/public/icons'

import { Slider } from '@/components/ui/slider'
import { useVolume } from '@/store/use-volume'

export const VolumeSlider = () => {
  const { volume, setVolume } = useVolume()
  const [previousVolume, setPreviousVolume] = useState<number>(volume)
  const [volumeLevel, setVolumeLevel] = useState<SoundLevel>('medium')
  const router = useRouter()
  const pathname = usePathname()

  const volumeLevelFilter = useCallback((value: number): SoundLevel => {
    if (+value === 0) {
      return 'mute'
    }
    if (+value < 0.33) {
      return 'low'
    }
    if (+value < 0.66) {
      return 'medium'
    }
    return 'high'
  }, [])

  const toggleMute = (): void => {
    if (volume === 0) {
      setVolume(previousVolume)
      setVolumeLevel(volumeLevelFilter(previousVolume))
    } else {
      setPreviousVolume(volume)
      setVolume(0)
      setVolumeLevel('mute')
    }
  }

  const handleVolumeChange = (value: number): void => {
    setVolumeLevel(volumeLevelFilter(value))
    setVolume(value)
  }

  return (
    <div className="flex items-center justify-end gap-x-4 ">
      <div className="flex w-full min-w-[125px] items-center gap-x-2">
        <div
          className="flex cursor-pointer justify-center text-white"
          onClick={toggleMute}
        >
          <SoundIcon level={volumeLevel} />
        </div>

        <Slider
          value={volume}
          step={0.01}
          maxValue={1}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  )
}
