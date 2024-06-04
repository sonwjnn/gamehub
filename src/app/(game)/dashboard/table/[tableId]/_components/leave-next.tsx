import { Checkbox } from '@/components/ui/checkbox'

type LeaveNextProps = {
  isLeaveNext: boolean
  setIsLeaveNext: (value: boolean) => void
}

export const LeaveNext = ({ isLeaveNext, setIsLeaveNext }: LeaveNextProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={isLeaveNext}
        onCheckedChange={() => setIsLeaveNext(!isLeaveNext)}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Leave next match
      </label>
    </div>
  )
}
