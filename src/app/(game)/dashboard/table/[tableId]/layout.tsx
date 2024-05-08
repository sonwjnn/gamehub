import { Chat } from './_components/chat'
import { currentUser } from '@/lib/auth'
import '@/styles/css/game.css'
import { Navbar } from './_components/navbar'
import { Statistical } from './_components/statistical'

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
      <div className="game_body relative">
        {children}
        <Chat tableId={tableId} />
        <Statistical tableId={tableId} />
      </div>
    </>
  )
}

export default TableIdLayout
