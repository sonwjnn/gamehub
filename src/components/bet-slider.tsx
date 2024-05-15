'use client'

import { Slider } from '@/components/ui/slider'
import { formatChipsAmount } from '@/utils/formatting'
import { Minus, Plus } from 'lucide-react'
import { useEffect } from 'react'

interface BetSliderProps {
  bet: number
  setBet: React.Dispatch<React.SetStateAction<number>>
  min: number
  max: number
}

export const BetSlider = ({ bet, setBet, min, max }: BetSliderProps) => {
  useEffect(() => {
    if (bet < min) setBet(min)
    else if (bet > max) setBet(max)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bet, min, max])

  const handleBetChange = (bet: number): void => {
    setBet(bet)
  }

  const minusValue = (prev: number) =>
    prev - max * 0.2 >= min ? prev - max * 0.2 : min
  const plusValue = (prev: number) =>
    prev + max * 0.2 <= max ? prev + max * 0.2 : max

  return (
    <div className="flex items-center flex-col gap-x-4 w-full px-3 mt-auto">
      <div className="flex justify-between items-center w-[80%] ">
        <Minus
          className="text-yellow-400"
          size={22}
          onClick={() => setBet(minusValue)}
        />
        <div className="font-semibold text-xl">
          {formatChipsAmount(bet || 0)}
        </div>
        <Plus
          className="text-yellow-400"
          size={22}
          onClick={() => setBet(plusValue)}
        />
      </div>
      <div className="flex w-full min-w-[200px] items-center">
        <Slider
          minValue={min}
          value={bet}
          step={max * 0.01}
          maxValue={max}
          onChange={handleBetChange}
        />
      </div>
    </div>
  )
}
