import tableApi from '@/services/api/modules/table-api'
import { UserBoard } from '@/components/user-board'
import { TableContent } from './_components/table-content'

const TablePage = async () => {
  const { response: tables } = await tableApi.getTables()

  return (
    <div className="boding_main">
      <div className="sidebar_left">
        <UserBoard />
      </div>
      <TableContent tables={tables} />
    </div>
  )
}

export default TablePage
