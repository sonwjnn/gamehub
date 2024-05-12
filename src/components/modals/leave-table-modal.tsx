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
import { useCurrentUser } from '@/hooks/use-current-user'
import { cn } from '@/lib/utils'
import playerApi from '@/services/api/modules/player-api'
import tableApi from '@/services/api/modules/table-api'
import { useModal } from '@/store/use-modal-store'
import { Table } from '@/types'
import { X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'

export const LeaveTableModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const [isPending, startTransition] = useTransition()

  const [table, setTable] = useState<Table | null>(null)
  const user = useCurrentUser()
  const router = useRouter()
  const { update } = useSession()

  const isModalOpen = isOpen && type === 'leaveTable'
  const { tableId } = data

  useEffect(() => {
    const getTableById = async () => {
      if (!tableId) return

      const { response, error } = await tableApi.getTableById({ tableId })

      if (error) {
        console.log(error)
        return
      }

      setTable(response)
    }

    if (isModalOpen) {
      getTableById()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen])

  const onClick = async () => {
    if (!user || !table) return

    const currentPlayerOfTable = table.players.find(
      item => item.userId === user.id
    )

    if (!currentPlayerOfTable) return

    startTransition(async () => {
      const { response, error } = await playerApi.removePlayer({
        tableId: table.id,
        playerId: currentPlayerOfTable.id,
      })

      if (error) {
        toast.error('Error when leaving table')
        return
      }

      onClose()
      update()
      router.push('/dashboard/table')
    })
  }

  return (
    <div className={cn('modal', isModalOpen && 'show')}>
      <div className="modal_dark modal_close" onClick={onClose}></div>
      <div className="modal_dialog sz-lg">
        <div className="modal_content  max-w-[700px] flex-grow-0">
          <div className="modal_head">
            LEAVE TABLE
            <div className="btn_close modal_close" onClick={onClose}>
              <X className="mt-3" size={24} />
            </div>
          </div>
          <div className="modal_body space-y-6">
            <div className="text text-center">
              Are you sure you want to leave{' '}
              <span className="color-main">Table {table?.name}</span>?
            </div>

            <div className="flex w-full items-center justify-between">
              <Button disabled={isPending} onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button disabled={isPending} variant="primary" onClick={onClick}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
