import tableApi from '@/services/api/modules/table-api'

import { TableContent } from './_components/table-content'
import { UserBoard } from '@/components/user-board'

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
