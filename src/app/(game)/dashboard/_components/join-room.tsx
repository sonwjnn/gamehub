'use client'

import { CardItem } from '@/components/card-item'
import { useModal } from '@/store/use-modal-store'
import { useRouter } from 'next/navigation'

interface JoinRoomProps {}

export const JoinRoom = ({}: JoinRoomProps) => {
  const { onOpen } = useModal()
  const router = useRouter()

  return (
    <div onClick={() => onOpen('joinRoom')}>
      <CardItem title="Join Room" />
    </div>
  )
}
