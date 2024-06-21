import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { useMedia } from 'react-use'

type LeaveNextProps = {
  isLeaveNext: boolean
  setIsLeaveNext: (value: boolean) => void
}

export const LeaveNext = ({ isLeaveNext, setIsLeaveNext }: LeaveNextProps) => {
  const isMobile = useMedia('(max-width: 768px), (max-height: 768px)', false)
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={isLeaveNext}
        onCheckedChange={() => setIsLeaveNext(!isLeaveNext)}
      />
      <label
        htmlFor="terms"
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          isMobile && 'text-xs'
        )}
      >
        나가기예약
      </label>
    </div>
  )
}
