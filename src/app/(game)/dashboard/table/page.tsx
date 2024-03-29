import tableApi from '@/services/api/modules/table-api'
import { TableList } from './_components/list'

const TablePage = async () => {
  const { response: tables } = await tableApi.getTables()

  return (
    <div className="flex flex-col items-center mb-auto  min-w-[700px] gap-y-6">
      <h1 className="text-2xl font-semibold text-white my-8">Table List</h1>
      <TableList tables={tables} />
    </div>
  )
}

export default TablePage
