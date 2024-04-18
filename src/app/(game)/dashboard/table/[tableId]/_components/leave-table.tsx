'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useModal } from '@/store/use-modal-store'

interface LeaveTableProps {
  tableId: string
  className?: string
}

export const LeaveTable = ({ className, tableId }: LeaveTableProps) => {
  const { onOpen } = useModal()

  return (
    <Button
      size="sm"
      className={cn(className)}
      variant="destructive"
      onClick={() => onOpen('leaveTable', { tableId })}
    >
      Leave
    </Button>
  )
}
