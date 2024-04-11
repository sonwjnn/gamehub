import tableApi from '@/services/api/modules/table-api'
import { InvitePlayer } from './_components/invite-player'
import { Chat } from './_components/chat'
import { LeaveTable } from './_components/leave-table'
import playerApi from '@/services/api/modules/player-api'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

const TableIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { tableId: string }
}) => {
  const user = await currentUser()

  if (!user) {
    return null
  }

  const { tableId } = params
  const { id: userId } = user

  const [{ response: table }, { response: currentPlayer }] = await Promise.all([
    tableApi.getTableById({ tableId }),
    playerApi.getCurrentPlayerOfTable({ tableId, userId }),
  ])

  let finalCurrentPlayer = currentPlayer

  if (table && !currentPlayer) {
    if (table.players.length === table.maxPlayers) {
      redirect('/dashboard')
    }
  }

  if (!table || !finalCurrentPlayer) {
    return null
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute left-0 top-0 z-10 p-[12px] flex gap-x-4">
        <InvitePlayer table={table} />
        <LeaveTable table={table} player={finalCurrentPlayer} />
      </div>
      {children}
      <Chat tableId={tableId} />
    </div>
  )
}

export default TableIdLayout
