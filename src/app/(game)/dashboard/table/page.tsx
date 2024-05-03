import tableApi from '@/services/api/modules/table-api'

import { TableContent } from './_components/table-content'
import { UserBoard } from '@/components/user-board'

type Props = {
  searchParams: {
    page: string
  }
}

const TablePage = async ({ searchParams }: Props) => {
  const { response } = await tableApi.getTables({
    page: searchParams.page || '1',
  })

  return (
    <div className="boding_main">
      <div className="sidebar_left ">
        <UserBoard />
      </div>
      <TableContent tables={response.tables} pageCount={response.pageCount} />
    </div>
  )
}

export default TablePage
