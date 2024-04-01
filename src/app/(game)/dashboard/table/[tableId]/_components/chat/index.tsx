import { ChatInput } from '@/components/chat/chat-input'
import { ChatMessages } from '@/components/chat/chat-messages'
import { currentUser } from '@/lib/auth'
import playerApi from '@/services/api/modules/player-api'
import tableApi from '@/services/api/modules/table-api'
import { redirect } from 'next/navigation'
import { Wrapper } from './wrapper'

interface ChatProps {
  tableId: string
}

export const Chat = async ({ tableId }: ChatProps) => {
  const user = await currentUser()

  if (!user) {
    redirect('/auth/login')
  }

  // const tableId = 'clubenabu0001v38ym2r1vmm0'
  const { response: table } = await tableApi.getTableById({ tableId })

  const { response: player } = await playerApi.getCurrentPlayerOfTable({
    tableId,
    userId: user.id,
  })

  if (!table || !player) {
    return redirect('/')
  }

  return (
    <Wrapper>
      <ChatMessages
        player={player}
        name={table.name}
        chatId={table.id}
        type="table"
        socketUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/socket/messages`}
        socketQuery={{
          tableId: table.id,
        }}
        tableId={table.id}
      />
      <div className="fixed bottom-0 inset-x-[-12px]">
        <ChatInput
          name={table?.name}
          type="table"
          apiUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/socket/messages`}
          query={{
            tableId: tableId,
          }}
        />
      </div>
    </Wrapper>
  )
}
