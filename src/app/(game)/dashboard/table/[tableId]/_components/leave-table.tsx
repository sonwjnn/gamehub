'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/store/use-modal-store'
import { Player, Table } from '@/types'

interface LeaveTableProps {
  table: Table
  player: Player
}

export const LeaveTable = ({ table, player }: LeaveTableProps) => {
  const { onOpen } = useModal()

  return (
    <Button
      variant="destructive"
      onClick={() => onOpen('leaveTable', { table, player })}
    >
      Leave Table
    </Button>
  )
}
