import tableApi from '@/services/api/modules/table-api'
import { InvitePlayer } from './_components/invite-player'
import { Chat } from './_components/chat'

const TableIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { tableId: string }
}) => {
  const { response: table } = await tableApi.getTableById({
    tableId: params.tableId,
  })

  return (
    <div className="relative h-full w-full px-[70px]">
      <InvitePlayer table={table} />
      {children}
      <Chat tableId={params.tableId} />
    </div>
  )
}

export default TableIdLayout
