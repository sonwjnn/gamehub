'use client'

import { DataTable } from '@/components/ui/data-table'

import { HistoryColumn, columns } from './columns'

interface HistoriesClientProps {
  data: HistoryColumn[]
}

export const HistoriesClient = ({ data }: HistoriesClientProps) => {
  return <DataTable searchKey="name" columns={columns} data={data} />
}
