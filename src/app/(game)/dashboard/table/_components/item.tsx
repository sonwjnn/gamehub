'use client'

import { Table } from '@/types'
import { formatChipsAmount } from '@/utils/formatting'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ItemProps {
  table: Table
}

export const Item = ({ table }: ItemProps) => {
  const router = useRouter()

  const onClick = () => {
    return router.push(`/dashboard/table/${table.id}`)
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
