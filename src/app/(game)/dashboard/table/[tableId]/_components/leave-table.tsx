'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/store/use-modal-store'
import { Table } from '@/types'

interface LeaveTableProps {
  tableId: string
}

export const LeaveTable = ({ tableId }: LeaveTableProps) => {
  const { onOpen } = useModal()

  return (
    <Button
      variant="destructive"
      onClick={() => onOpen('leaveTable', { tableId })}
    >
      Leave Table
    </Button>
  )
}
