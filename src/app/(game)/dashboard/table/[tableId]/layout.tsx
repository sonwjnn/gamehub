import tableApi from '@/services/api/modules/table-api'
import { InvitePlayer } from './_components/invite-player'

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
    <div className="relative h-full w-full">
      <InvitePlayer table={table} />
      {children}
    </div>
  )
}

export default TableIdLayout
