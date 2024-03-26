'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface RoomButtonProps {}

export const RoomButton = ({}: RoomButtonProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push('/room/2')
  }
  return <Button onClick={onClick}>Room Button</Button>
}
