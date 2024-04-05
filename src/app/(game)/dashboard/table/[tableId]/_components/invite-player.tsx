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
    <Button variant="secondary" onClick={() => onOpen('invite', { table })}>
      Invite Players
    </Button>
  )
}
