'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { useSocket } from '@/providers/socket-provider'
import historyApi from '@/services/api/modules/history-api'
import { PokerActions } from '@/types'
import { formatChipsAmount } from '@/utils/formatting'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type StatisticalProps = {
  tableId: string
}

type Statistical = {
  winCount: number
  winAmount: number
  loseCount: number
  loseAmount: number
}

export const Statistical = ({ tableId }: StatisticalProps) => {
  const user = useCurrentUser()
  const { socket } = useSocket()

  const [statistical, setStatistical] = useState<Statistical>({
    winCount: 0,
    winAmount: 0,
    loseCount: 0,
    loseAmount: 0,
  })

  useEffect(() => {
    if (socket) {
      socket.on(PokerActions.UPDATE_STATISTICAL, (data: Statistical) => {
        if (data) {
          setStatistical(data)
        }
      })
    }
  }, [socket])

  useEffect(() => {
    const getStatisticalByTableId = async () => {
      if (!user) return
      const { response, error } = await historyApi.getStatisticalByTableId({
        userId: user?.id,
        tableId,
      })

      if (error) {
        toast.error('Some thing went wrong!')
        return
      }

      if (response) {
        setStatistical(response)
      }
    }

    getStatisticalByTableId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="table_statistical">
      <div className="ttl">THỐNG KÊ</div>
      <div className="content">
        <dl className="flex flex-midle">
          <dt>Thắng :</dt>
          <dd>{statistical.winCount} ván</dd>
          <dd className="flex gap-8 flex-midle">
            <span className="icon sz-8 flex-shrink">
              <i className="icon-coin"></i>
            </span>
            {formatChipsAmount(statistical.winAmount || 0)}$
          </dd>
        </dl>
        <dl className="flex flex-midle">
          <dt>Thua :</dt>
          <dd>{statistical.loseCount} ván</dd>
          <dd className="flex gap-8 flex-midle">
            <span className="icon sz-8 flex-shrink">
              <i className="icon-coin"></i>
            </span>
            {formatChipsAmount(statistical.loseAmount || 0)}$
          </dd>
        </dl>
      </div>
    </div>
  )
}
