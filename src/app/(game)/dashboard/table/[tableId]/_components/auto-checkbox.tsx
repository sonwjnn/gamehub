'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { useAutoAction } from '@/store/use-auto-action'
import { Match } from '@/types'
import { useEffect } from 'react'

interface AutoCheckboxProps {
  match: Match | null
}

export const AutoCheckbox = ({ match }: AutoCheckboxProps) => {
  const { isChecked, setAutoAction, callAmount } = useAutoAction()

  const onToggle = () => {
    if (
      typeof callAmount === 'number' &&
      typeof match?.callAmount === 'number' &&
      callAmount !== match?.callAmount
    ) {
      if (!isChecked) {
        setAutoAction({ isChecked: true, callAmount: match?.callAmount })
      } else {
        setAutoAction({ isChecked: false, callAmount: 0 })
      }
    } else {
      setAutoAction({ isChecked: !isChecked })
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="leave" checked={isChecked} onCheckedChange={onToggle} />
      <label
        htmlFor="leave"
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          isChecked ? 'text-primary' : 'text-gray-500'
        )}
      >
        Auto check or call
      </label>
    </div>
  )
}
