'use client'

import { BuyChipsModal } from '@/components/modals/buy-chips-modal'
import { InviteModal } from '@/components/modals/invite-modal'
import { JoinTableModal } from '@/components/modals/join-table-modal'
import { LeaveTableModal } from '@/components/modals/leave-table-modal'
import { useOrigin } from '@/hooks/use-origin'

export const ModalProvider = () => {
  const origin = useOrigin()

  if (!origin) {
    return null
  }

  return (
    <>
      <BuyChipsModal />
      <JoinTableModal />
      <LeaveTableModal />
      <InviteModal />
    </>
  )
}
