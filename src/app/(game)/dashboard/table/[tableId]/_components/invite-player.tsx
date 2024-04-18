'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/store/use-modal-store'

interface InvitePlayerProps {
  tableId: string
}

export const InvitePlayer = ({ tableId }: InvitePlayerProps) => {
  const { onOpen } = useModal()

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={() => onOpen('invite', { tableId })}
    >
      Invite
    </Button>
  )
}
