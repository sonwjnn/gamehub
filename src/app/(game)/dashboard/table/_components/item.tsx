'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { useSocket } from '@/providers/socket-provider'
import { useModal } from '@/store/use-modal-store'
import { Table } from '@/types'
import { formatChipsAmount } from '@/utils/formatting'
import Image from 'next/image'
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
  const [isLoading, setIsLoading] = useState(false)

  const onClick = () => {
    return router.push(`/dashboard/table/${table.id}`)

    // if (!user) return router.push('/auth/login')

    // const isHaveCurrentPlayer = table.players.some(
    //   player => player.userId === user.id
    // )

    // if (
    //   isHaveCurrentPlayer ||
    //   table.players.length === table.maxPlayers ||
    //   user.chipsAmount < table.minBuyIn
    // ) {
    //   if (isHaveCurrentPlayer) {
    //     return router.push(`/dashboard/table/${table.id}`)
    //   }

    //   if (table.players.length === table.maxPlayers) {
    //     return toast.error('This table is full')
    //   }

    //   if (user.chipsAmount < table.minBuyIn) {
    //     return onOpen('buyChips')
    //   }
    // }

    // return onOpen('buyIn', { table })
  }

  return (
    <div className="room" onClick={onClick}>
      <div className="icon icon-color-white">
        <Image
          src="/images/icon/icon_poker.png"
          alt="image alt"
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-full object-cover"
        />
      </div>
      <div className="room_name fz-10">
        TABLE - <span className="fz-18 fw-600">{table.name}</span>
      </div>
      <div className="info fz-12 mt-8">
        <dl>
          <dt className="flex flex-midle gap-8">
            <span className="icon sz-12 icon-color-white">
              <i className="icon-dolar"></i>
            </span>
            Buy-in:
          </dt>
          <dd>{formatChipsAmount(table.minBuyIn)}$</dd>
        </dl>
        <dl>
          <dt className="flex flex-midle gap-8">
            <span className="icon sz-12 icon-color-white">
              <i className="icon-dolar"></i>
            </span>
            Ante:
          </dt>
          <dd>{formatChipsAmount(table.ante)}$</dd>
        </dl>
        <dl>
          <dt className="flex flex-midle gap-8">
            <span className="icon sz-12 icon-color-white">
              <i className="icon-group"></i>
            </span>
            Number
          </dt>
          <dd>{table.players.length}/10</dd>
        </dl>
      </div>
    </div>
  )
}
