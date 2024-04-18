import { InvitePlayer } from './_components/invite-player'
import { Chat } from './_components/chat'
import { LeaveTable } from './_components/leave-table'
import playerApi from '@/services/api/modules/player-api'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LeaveTableCheckbox } from './_components/leave-table-checkbox'

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

  return (
    <div className="game_body">
      {children}
      <Chat tableId={tableId} />
    </div>
  )
}

export default TableIdLayout
