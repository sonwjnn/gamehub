'use client'

import { useTableBrightness } from '@/store/use-table-brightness'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Sun } from 'lucide-react'

const BrightnessLevels = ['normal', 'dim', 'bright']

export const ToggleBrightness = () => {
  const { tableBrightness, setTableBrightness } = useTableBrightness()

  const [brightness, setBrightness] = useState(tableBrightness)

  const onBrightnessClick = () => {
    const currentIndex = BrightnessLevels.indexOf(brightness)
    const nextIndex = (currentIndex + 1) % BrightnessLevels.length
    const newBrightness = BrightnessLevels[nextIndex] as
      | 'normal'
      | 'dim'
      | 'bright'
    setBrightness(newBrightness)
    setTableBrightness(newBrightness)
  }

  useEffect(() => {
    const brightnessLevel =
      tableBrightness === 'dim' ? 0.7 : tableBrightness === 'normal' ? 1 : 1.5
    document.documentElement.style.setProperty(
      '--brightness-level',
      brightnessLevel.toString()
    )
  }, [tableBrightness])

  return (
    <Button onClick={onBrightnessClick}>
      <Sun /> {brightness}
    </Button>
  )
}
