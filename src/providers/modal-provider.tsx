'use client'

import { BuyChipsModal } from '@/components/modals/buy-chips-modal'
import { BuyInModal } from '@/components/modals/buy-in-modal'
import { FeelingModal } from '@/components/modals/feeling-modal'
import { InviteModal } from '@/components/modals/invite-modal'
import { JoinTableModal } from '@/components/modals/join-table-modal'
import { LeaveTableModal } from '@/components/modals/leave-table-modal'
import { QualityModal } from '@/components/modals/quality-modal'
import { RebuyModal } from '@/components/modals/rebuy-modal'
import { RuleModal } from '@/components/modals/rule-modal'
import { useOrigin } from '@/hooks/use-origin'

export const ModalProvider = () => {
  const origin = useOrigin()

  if (!origin) {
    return null
  }

  return (
    <>
      <FeelingModal />
      <QualityModal />
      <RuleModal />
      <RebuyModal />
      <BuyInModal />
      <BuyChipsModal />
      <JoinTableModal />
      <LeaveTableModal />
      <InviteModal />
    </>
  )
}
