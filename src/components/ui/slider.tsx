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
        'group  relative flex items-center select-none cursor-pointer touch-none w-full h-[40px]',
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
      <SliderPrimitive.Track className="relative  h-[8px] grow rounded-full bg-neutral-600">
        <SliderPrimitive.Range className="absolute h-full  rounded-full bg-white group-hover:bg-lime-500"></SliderPrimitive.Range>
      </SliderPrimitive.Track>
      <Fragment>
        <div
          className="absolute text-center scale-0 transition group-hover:scale-100"
          style={{
            left: `calc(${(value / maxValue) * 100}% - 24px)`,
            top: `-30px`,
          }}
        >
          <span className="text-[24px] font-bold text-lime-500 px-[24px] py-[4px] bg-neutral-900 rounded-md">
            {value}
          </span>
        </div>
        <SliderPrimitive.Thumb className="block size-[16px] scale-0 rounded-full bg-white  transition focus:outline-none group-hover:scale-100 " />
      </Fragment>
    </SliderPrimitive.Root>
  )
}
