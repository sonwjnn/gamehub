import { cn } from '@/lib/utils'
import { formatChipsAmount } from '@/utils/formatting'
import { useKey } from 'react-use'
import { Match } from '@/types'
import { useEffect } from 'react'
import { useAutoAction } from '@/store/use-auto-action'

type ActionItemProps = {
  shortcut: string
  label: string
  onClick: () => void
  disabled?: boolean
  className?: string
  amount?: number
  type:
    | 'check'
    | 'fold'
    | 'call'
    | 'raise'
    | 'allIn'
    | 'quarter'
    | 'half'
    | 'full'
  match?: Match | null
  isTurn?: boolean
}

export const ActionItem = ({
  shortcut,
  label,
  onClick,
  disabled = false,
  className,
  amount,
  type,
  match,
  isTurn,
}: ActionItemProps) => {
  const { isChecked, callAmount, setAutoAction } = useAutoAction()

  const canAutoAction =
    isTurn && isChecked === type && callAmount === match?.callAmount
  const canCheck = match && !isTurn

  //prettier-ignore
  useKey( shortcut, () => {
    if (!disabled) {
      onClick()
    }
  }, {}, [onClick])

  useEffect(() => {
    if (
      typeof callAmount === 'number' &&
      typeof match?.callAmount === 'number' &&
      callAmount !== match?.callAmount
    ) {
      setAutoAction({ isChecked: '', callAmount: 0 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match?.callAmount])

  useEffect(() => {
    if (canAutoAction) {
      onClick()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canAutoAction])

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

  const handleClick = () => {
    if (canCheck) {
      onToggle()
      return
    }

    if (disabled) return

    onClick()
  }

  return (
    <button
      className={cn(
        'item',
        className,
        disabled && 'opacity-80',
        canCheck && 'has_check  before:focus-within:!h-full',
        canCheck && type === isChecked && 'active'
      )}
      onClick={handleClick}
    >
      <span className="number">{shortcut}</span>
      <div className="value">{label}</div>
      {amount !== undefined && (
        <div className="view_money">{formatChipsAmount(amount || 0)}$</div>
      )}
    </button>
  )
}
