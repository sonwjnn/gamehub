'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/store/use-modal-store'
import { Room } from '@/types'

interface InvitePlayerProps {
  room: Room
}

export const InvitePlayer = ({ room }: InvitePlayerProps) => {
  const { onOpen } = useModal()

  return (
    <div className="absolute left-0 top-0 z-10">
      <Button onClick={() => onOpen('invite', { room })}>Invite</Button>
    </div>
  )
}
