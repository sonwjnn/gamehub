import tableApi from '@/services/api/modules/table-api'

import { TableContent } from './_components/table-content'

const TablePage = async () => {
  const { response: tables } = await tableApi.getTables()

  return <TableContent tables={tables} />
}

export default TablePage
