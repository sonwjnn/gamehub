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
    <div className="row grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {tables.map(table => (
        <div key={table.id} className="col-6 col-md-3 min-h-full">
          <Item table={table} />
        </div>
      ))}
    </div>
  )
}
