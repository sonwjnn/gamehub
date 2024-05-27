'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { useAutoAction } from '@/store/use-auto-action'
import { Match } from '@/types'

interface AutoCheckboxProps {
  match: Match | undefined | null
  type:
    | 'check'
    | 'fold'
    | 'call'
    | 'raise'
    | 'allIn'
    | 'quarter'
    | 'half'
    | 'full'
}

export const AutoCheckbox = ({ match, type }: AutoCheckboxProps) => {
  const { isChecked, setAutoAction, callAmount } = useAutoAction()

  const onToggle = () => {
    if (
      typeof callAmount === 'number' &&
      typeof match?.callAmount === 'number' &&
      callAmount !== match?.callAmount
    ) {
      if (isChecked === type) {
        setAutoAction({ isChecked: '', callAmount: 0 })
      } else {
        setAutoAction({ isChecked: type, callAmount: match?.callAmount })
      }
    } else {
      if (isChecked === type) {
        setAutoAction({ isChecked: '' })
      } else {
        setAutoAction({ isChecked: type })
      }
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="leave"
        checked={isChecked === type}
        onCheckedChange={onToggle}
        className={cn(isChecked ? 'text-primary' : 'text-gray-500')}
      />
    </div>
  )
}
