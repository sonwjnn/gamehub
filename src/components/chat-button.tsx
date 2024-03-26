'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface ChatButtonProps {}

export const ChatButton = ({}: ChatButtonProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push('/chat')
  }
  return <Button onClick={onClick}>Chat Button</Button>
}
