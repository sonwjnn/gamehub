import tableApi from '@/services/api/modules/table-api'

import { TableContent } from './_components/table-content'

const TablePage = async () => {
  const { response: tables } = await tableApi.getTables()

  return (
    <div className="boding_main">
      <TableContent tables={tables} />
    </div>
  )
}

export default TablePage
