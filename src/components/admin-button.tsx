'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface AdminButtonProps {}

export const AdminButton = ({}: AdminButtonProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push('/admin')
  }
  return <Button onClick={onClick}>Admin Button</Button>
}
