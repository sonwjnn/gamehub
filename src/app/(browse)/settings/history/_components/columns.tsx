'use client'

import { ColumnDef } from '@tanstack/react-table'

export type HistoryColumn = {
  id: string
  name: string
  amount: string
  status: string
  createdAt: string
}

export const columns: ColumnDef<HistoryColumn>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    accessorKey: 'name',
    header: 'Table Name',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
]
