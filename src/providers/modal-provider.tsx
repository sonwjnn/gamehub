'use client'

import { InviteModal } from '@/components/modals/invite-modal'
import { JoinRoomModal } from '@/components/modals/join-room-modal'
import { useOrigin } from '@/hooks/use-origin'

export const ModalProvider = () => {
  const origin = useOrigin()

  if (!origin) {
    return null
  }

  return (
    <>
      <JoinRoomModal />
      <InviteModal />
    </>
  )
}
