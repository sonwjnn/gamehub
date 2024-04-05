import { TableWithPlayers } from '@/types'
import { Item } from './item'

interface TableListProps {
  tables: TableWithPlayers[]
}

export const TableList = ({ tables }: TableListProps) => {
  if (!Array.isArray(tables) || !tables.length)
    return (
      <div>
        <h2>No tables found</h2>
      </div>
    )

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {tables.map(table => (
        <Item key={table.id} table={table} />
      ))}
    </div>
  )
}
