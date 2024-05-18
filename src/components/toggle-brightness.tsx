'use client'

import { useIsTableBrightness } from '@/store/use-table-brightness'
import { useState } from 'react'
import { Button } from './ui/button'
import { Sun } from 'lucide-react'

const BrightnessLevels = ['normal', 'dim', 'bright']

export const ToggleBrightness = () => {
  const { tableBrightness, setTableBrightness } = useIsTableBrightness()

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

  return (
    <Button onClick={onBrightnessClick}>
      <Sun /> {brightness}
    </Button>
  )
}
