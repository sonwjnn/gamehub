'use client'

import { Slider } from '@/components/ui/slider'
import { Match } from '@/types'

interface BetSliderProps {
  match: Match | null
  bet: number
  setBet: (bet: number) => void
  currentChipsAmount: number
}

export const BetSlider = ({
  match,
  bet,
  setBet,
  currentChipsAmount,
}: BetSliderProps) => {
  const handleBetChange = (bet: number): void => {
    setBet(bet)
  }

  if (!match) return null

  const min = match.minBet >= match.callAmount ? match.minBet : match.callAmount
  const max =
    currentChipsAmount < match.table.minBuyIn
      ? currentChipsAmount
      : match.table.maxBuyIn

  return (
    <div className="flex items-center justify-end gap-x-4 ">
      <div className="w-10 text-right text-[24px] font-bold text-white ">
        {min}
      </div>
      <div className="flex w-full min-w-[200px] items-center gap-x-2">
        <Slider
          minValue={min}
          value={bet}
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
