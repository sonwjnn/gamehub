import { cn } from '@/lib/utils'
import { formatChipsAmount } from '@/utils/formatting'
import { useKey } from 'react-use'

type ActionItemProps = {
  shortcut: string
  label: string
  onClick: () => void
  disabled?: boolean
  className?: string
  amount?: number
}

export const ActionItem = ({
  shortcut,
  label,
  onClick,
  disabled = false,
  className,
  amount,
}: ActionItemProps) => {
  //prettier-ignore
  useKey( shortcut, () => {
    if (!disabled) {
      onClick()
    }
  }, {}, [onClick])

  return (
    <button
      className={cn(
        'item disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      onClick={() => onClick()}
      disabled={disabled}
    >
      <span className="number">{shortcut}</span>
      <div className="value">{label}</div>
      {amount !== undefined && (
        <div className="view_money">{formatChipsAmount(amount || 0)}$</div>
      )}
    </button>
  )
}
