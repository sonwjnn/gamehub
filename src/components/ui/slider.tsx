'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

interface SliderProps {
  value?: number
  maxValue?: number
  minValue?: number
  step?: number
  onChange?: (value: number) => void
  onMouseUp?: (value: number) => void
  className?: string
}

export const Slider: React.FC<SliderProps> = ({
  className,
  value = 0,
  maxValue = 100,
  minValue = 0,
  step = 1,
  onChange,
  onMouseUp,
}) => {
  const handleMouseUp = (newValue: number[]): void => {
    onMouseUp?.(newValue[0] as number)
  }
  const handleChange = (newValue: number[]): void => {
    onChange?.(newValue[0] as number)
  }

  return (
    <SliderPrimitive.Root
      className={twMerge(
        'group  relative flex items-center select-none cursor-pointer touch-none w-full h-[30px]',
        className
      )}
      defaultValue={[0]}
      value={[value]}
      onValueChange={handleChange}
      onValueCommit={handleMouseUp}
      max={maxValue}
      min={minValue}
      step={step}
    >
      <SliderPrimitive.Track className="relative  h-[3px] grow rounded-full bg-neutral-600">
        <SliderPrimitive.Range className="absolute h-[4px] -top-1/2  rounded-full bg-yellow-linear "></SliderPrimitive.Range>
      </SliderPrimitive.Track>
      <Fragment>
        <SliderPrimitive.Thumb className="block size-[10px] rounded-full bg-yellow-linear  transition focus:outline-none " />
      </Fragment>
    </SliderPrimitive.Root>
  )
}
