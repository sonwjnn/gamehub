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

  const {response: currentPlayer} = await playerApi.getCurrentPlayerOfTable({
    tableId,
    userId: user.id,
  })

  if (!currentPlayer) {
    redirect('/dashboard')
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute left-0 top-0 z-10 p-[12px] flex gap-x-4">
        <InvitePlayer tableId={tableId} />
        <LeaveTable tableId={tableId} />
      </div>
      {children}
      <Chat tableId={tableId} />
    </div>
  )
}

export default TableIdLayout
