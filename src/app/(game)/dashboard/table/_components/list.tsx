'use client'

import { cn } from '@/lib/utils'
import { TableWithPlayers } from '@/types'
import { useRouter } from 'next/navigation'

interface TableListProps {
  tables: TableWithPlayers[]
}

export const TableList = ({ tables }: TableListProps) => {
  const router = useRouter()

  if (!Array.isArray(tables) || !tables.length)
    return (
      <div>
        <h2>No tables found</h2>
      </div>
    )

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {tables.map(table => {
        return (
          <div
            key={table.id}
            onClick={() => router.push(`/dashboard/table/${table.id}`)}
            className={cn(
              'group mb-1 cursor-pointer w-full flex bg-zinc-700 gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/50 '
            )}
          >
            {/* <Icon className="size-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" /> */}
            <p
              className={cn(
                'line-clamp-1 text-sm font-semibold text-zinc-400 transition group-hover:text-zinc-500 '
              )}
            >
              {table.name}
            </p>

            <p
              className={cn(
                'line-clamp-1 text-sm font-semibold text-zinc-400 transition group-hover:text-zinc-500 ml-auto'
              )}
            >
              {`${table.players.length}/10`}
            </p>
          </div>
        )
      })}
    </div>
  )
}
