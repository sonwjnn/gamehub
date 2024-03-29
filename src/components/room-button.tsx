'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface TableButtonProps {}

export const TableButton = ({}: TableButtonProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push('/table/2')
  }
  return <Button onClick={onClick}>Table Button</Button>
}
