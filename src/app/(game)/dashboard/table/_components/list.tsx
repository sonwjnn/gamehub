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
    <div className="row ">
      {tables.map(table => (
        <div key={table.id} className="col-6 col-md-3 col-xl-3">
          <Item table={table} />
        </div>
      ))}
    </div>
  )
}
