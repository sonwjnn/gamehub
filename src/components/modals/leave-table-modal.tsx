'use client'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import playerApi from '@/services/api/modules/player-api'
import { useModal } from '@/store/use-modal-store'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

export const LeaveTableModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'leaveTable'
  const { table, player } = data

  const onClick = async () => {
    if (!table || !player) return

    startTransition(async () => {
      await playerApi.removePlayer({ tableId: table.id, playerId: player.id })

      onClose()
      router.push('/dashboard/table')
    })
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Leave Table
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leave
            <span className="font-semibold text-indigo-500">{table?.name}</span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isPending} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isPending} variant="primary" onClick={onClick}>
              {isPending ? <Spinner className="mr-2" /> : null}
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
