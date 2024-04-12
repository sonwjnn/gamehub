'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { cn } from '@/lib/utils'
import { useSocket } from '@/providers/socket-provider'
import playerApi from '@/services/api/modules/player-api'
import { useModal } from '@/store/use-modal-store'
import { Table } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface ItemProps {
  table: Table
}

export const Item = ({ table }: ItemProps) => {
  const router = useRouter()
  const { onOpen } = useModal()
  const user = useCurrentUser()
  const { socket } = useSocket()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      if (!user) return router.push('/auth/login')

      const isHaveCurrentPlayer = table.players.some(
        player => player.userId === user.id
      )

      if (
        isHaveCurrentPlayer ||
        table.players.length === table.maxPlayers ||
        user.chipsAmount < table.minBuyIn
      ) {
        if (isHaveCurrentPlayer) {
          return router.push(`/dashboard/table/${table.id}`)
        }

        if (table.players.length === table.maxPlayers) {
          return toast.error('This table is full')
        }

        if (user.chipsAmount < table.minBuyIn) {
          return onOpen('buyChips')
        }
      }

      const { response, error } = await playerApi.createPlayer({
        tableId: table.id,
        userId: user.id,
        socketId: socket.id,
      })

      if (error) {
        console.log(error)
        toast.error('Error joining table')
        return
      }

      router.push(`/dashboard/table/${table.id}`)
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'group mb-1 cursor-pointer w-full flex bg-zinc-700 gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/50 disabled:bg-opacity-50 disabled:pointer-events-none'
      )}
      disabled={isLoading}
    >
      {/* <Icon className="size-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" /> */}
      <p
        className={cn(
          'line-clamp-1 text-sm font-semibold text-zinc-400 transition group-hover:text-zinc-500 '
        )}
      >
        {table.name}
      </p>

      <div className="ml-auto flex gap-x-4">
        <p
          className={cn(
            'line-clamp-1 text-sm font-semibold text-zinc-400 transition group-hover:text-zinc-500'
          )}
        >
          Buy-in: {table.minBuyIn}
        </p>

        <p
          className={cn(
            'line-clamp-1 text-sm font-semibold text-zinc-400 transition group-hover:text-zinc-500'
          )}
        >
          {`${table.players.length}/10`}
        </p>
      </div>
    </button>
  )
}
