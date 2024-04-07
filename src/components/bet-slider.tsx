'use client'

import { Slider } from '@/components/ui/slider'

interface BetSliderProps {
  value: number
  setValue: (value: number) => void
  max: number
}

export const BetSlider = ({ value, setValue, max }: BetSliderProps) => {
  const handleBetChange = (value: number): void => {
    setValue(value)
  }

  return (
    <div className="flex items-center justify-end gap-x-4 ">
      <div className="w-10 text-right text-[24px] font-bold text-white ">
        {0}
      </div>
      <div className="flex w-full min-w-[200px] items-center gap-x-2">
        <Slider
          value={value}
          step={500}
          maxValue={max}
          onChange={handleBetChange}
        />
      </div>

      <div className="w-10 text-right  text-[24px] font-bold text-white">
        {max}
      </div>
    </div>
  )
}
