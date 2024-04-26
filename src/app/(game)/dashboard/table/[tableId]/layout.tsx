import { Chat } from './_components/chat'
import { currentUser } from '@/lib/auth'

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
