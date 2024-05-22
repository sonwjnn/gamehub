'use client'

import { useBrightness } from '@/store/use-brightness'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Sun, SunDim, SunMedium } from 'lucide-react'

const BrightnessLevels = ['normal', 'dim', 'bright']

export const ToggleBrightness = () => {
  const { brightness, setBrightness } = useBrightness()

  const [brightnessData, setBrightnessData] = useState(brightness)

  const onBrightnessClick = () => {
    const currentIndex = BrightnessLevels.indexOf(brightnessData)
    const nextIndex = (currentIndex + 1) % BrightnessLevels.length
    const newBrightness = BrightnessLevels[nextIndex] as
      | 'normal'
      | 'dim'
      | 'bright'
    setBrightnessData(newBrightness)
    setBrightness(newBrightness)
  }

  useEffect(() => {
    const brightnessLevel =
      brightness === 'dim' ? 0.7 : brightness === 'normal' ? 1 : 1.5
    document.documentElement.style.setProperty(
      '--brightness-level',
      brightnessLevel.toString()
    )
  }, [brightness])

  return (
    <Button onClick={onBrightnessClick}>
      {brightness === 'bright' && <Sun />}
      {brightness === 'dim' && <SunDim />}
      {brightness === 'normal' && <SunMedium />}
    </Button>
  )
}
