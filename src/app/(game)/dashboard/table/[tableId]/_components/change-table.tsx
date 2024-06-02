import { useCurrentUser } from '@/hooks/use-current-user'
import { cn } from '@/lib/utils'
import { useSocket } from '@/providers/socket-provider'
import playerApi from '@/services/api/modules/player-api'
import tableApi from '@/services/api/modules/table-api'
import { useAutoRebuy } from '@/store/use-auto-rebuy'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

type ChangeTableProps = {
  tableId: string
  playerId: string | undefined
  className?: string
}

const ChangeTable = ({ tableId, playerId, className }: ChangeTableProps) => {
  const [loading, startTransition] = useTransition()

  const { socket } = useSocket()
  const { update } = useSession()
  const { setAutoRebuy } = useAutoRebuy()
  const user = useCurrentUser()
  const router = useRouter()

  const onClick = () => {
    if (!user || !playerId || !tableId) return

    startTransition(async () => {
      const { response: nextTable, error } = await tableApi.switchTable({
        tableId,
        playerId,
      })

      if (error) {
        toast.error('Not found table same value!')
        return
      }

      if (nextTable) {
        if (nextTable.id === tableId) {
          toast.error('Only one table!')
          return
        }

        await playerApi.removePlayer({
          tableId,
          playerId,
        })

        const { response, error } = await playerApi.createPlayer({
          tableId: nextTable.id,
          userId: user.id,
          socketId: socket.id,
          buyIn: nextTable.minBuyIn,
        })

        if (error) {
          toast.error('Something went wrong!')
        }

        setAutoRebuy({ isAutoRebuy: false, autoRebuyAmount: 0 })

        router.push(`/dashboard/table/${nextTable.id}`)
        update()
      }
    })
  }

  return (
    <div
      className={cn(
        'btn_action btn_change',
        loading &&
          'disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      Change room
      <span className="sz-16 icon">
        <i className="icon-change"></i>
      </span>
    </div>
  )
}

export default ChangeTable
