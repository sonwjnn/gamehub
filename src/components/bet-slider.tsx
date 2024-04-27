'use client'

import { Slider } from '@/components/ui/slider'
import { Match } from '@/types'

interface BetSliderProps {
  bet: number
  setBet: (bet: number) => void
  min: number
  max: number
}

export const BetSlider = ({ bet, setBet, min, max }: BetSliderProps) => {
  const handleBetChange = (bet: number): void => {
    setBet(bet)
  }

  return (
    <div className="flex items-center justify-end gap-x-4 ">
      {/* <div className="w-10 text-right text-[24px] font-bold text-white ">
        {min}
      </div> */}
      <div className="flex w-full min-w-[200px] items-center gap-x-2">
        <Slider
          minValue={min}
          value={bet}
          step={10}
          maxValue={max}
          onChange={handleBetChange}
        />
      </div>

      {/* <div className="w-10 text-right  text-[24px] font-bold text-white">
        {max}
      </div> */}
    </div>
  )
}
