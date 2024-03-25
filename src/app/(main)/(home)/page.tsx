'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  const onClick = () => {
    return router.push('/room/2')
  }
  return (
    <Button className="text-white" onClick={onClick}>
      Go to room 2
    </Button>
  )
}
