'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useModal } from '@/store/use-modal-store'
import { useRouter } from 'next/navigation'

interface LeaveTableProps {
  tableId: string
  className?: string
}

export const LeaveButton = ({ className, tableId }: LeaveTableProps) => {
  const router = useRouter()

  return (
    <Button
      size="sm"
      className={cn(className)}
      variant="destructive"
      onClick={() => router.push('/dashboard/table')}
    >
      Leave
    </Button>
  )
}
