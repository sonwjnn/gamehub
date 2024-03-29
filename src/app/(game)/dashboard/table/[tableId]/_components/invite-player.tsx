'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/store/use-modal-store'
import { Table } from '@/types'

interface InvitePlayerProps {
  table: Table
}

export const InvitePlayer = ({ table }: InvitePlayerProps) => {
  const { onOpen } = useModal()

  return (
    <div className="absolute left-0 top-0 z-10">
      <Button onClick={() => onOpen('invite', { table })}>Invite</Button>
    </div>
  )
}
