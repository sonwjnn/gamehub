import { cn } from '@/lib/utils'
import { PiPokerChip } from 'react-icons/pi'

interface ChipsAmountBadgeProps {
  className?: string
  value?: number
}

export const ChipsAmountBadge = ({
  className,
  value,
}: ChipsAmountBadgeProps) => {
  return (
    <>
      {value ? (
        <div
          className={cn(
            'rounded-full border border-background bg-amber-100   text-blue-950 text-xl p-0.5 px-1.5 text-center  font-semibold uppercase tracking-wide flex items-center justify-center gap-x-3',
            className
          )}
        >
          <PiPokerChip className="text-lime-500" />
          <span>{value}</span>
        </div>
      ) : null}
    </>
  )
}
