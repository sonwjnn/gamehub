import { ChatInput } from '@/components/chat/chat-input'
import { ChatMessages } from '@/components/chat/chat-messages'
import { currentUser } from '@/lib/auth'
import playerApi from '@/services/api/modules/player-api'
import tableApi from '@/services/api/modules/table-api'
import { redirect } from 'next/navigation'

const HomePage = async () => {
  const user = await currentUser()

  if (!user) {
    redirect('/auth/login')
  }

  const tableId = 'clubenabu0001v38ym2r1vmm0'
  const { response: table } = await tableApi.getTableById({ tableId })

  const { response: player } = await playerApi.getCurrentPlayerOfTable({
    tableId,
    userId: user.id,
  })

  if (!table || !player) {
    return redirect('/')
  }

  return (
    <div className="w-full h-full">
      <ChatMessages
        player={player}
        name={table?.name}
        // chatId={table.id}
        chatId={tableId}
        type="table"
        socketUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/socket/messages`}
        socketQuery={{
          // tableId: table.id,
          tableId: tableId,
        }}
        // tableId={table.id}
        tableId={tableId}
      />
      <ChatInput
        name={table?.name}
        type="table"
        apiUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/socket/messages`}
        query={{
          tableId: tableId,
        }}
      />
    </div>
  )
}

export default HomePage
