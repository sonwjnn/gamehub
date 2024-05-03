import { Chat } from './_components/chat'
import { currentUser } from '@/lib/auth'
import '@/styles/css/game.css'
import { Navbar } from './_components/navbar'

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
    <>
      <Navbar />
      <div className="game_body">
        {children}
        <Chat tableId={tableId} />
      </div>
    </>
  )
}

export default TableIdLayout
