'use client'

import { CardItem } from '@/components/card-item'
import { useModal } from '@/store/use-modal-store'
import { useRouter } from 'next/navigation'

interface JoinTableProps {}

export const JoinTable = ({}: JoinTableProps) => {
  const { onOpen } = useModal()
  const router = useRouter()

  return (
    <div onClick={() => onOpen('joinTable')}>
      <CardItem title="Join Table" />
    </div>
  )
}
