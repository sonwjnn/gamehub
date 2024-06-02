'use client'

import { useAutoRebuy } from '@/store/use-auto-rebuy'
import { Switch } from './ui/switch'
import { Match, PlayerWithUser } from '@/types'
import { useEffect } from 'react'
import playerApi from '@/services/api/modules/player-api'
import { useCurrentUser } from '@/hooks/use-current-user'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

type AutoRebuyToggleProps = {
  tableId: string
  player: PlayerWithUser | undefined
  match: Match | null
}

export const AutoRebuyToggle = ({
  tableId,
  player,
  match,
}: AutoRebuyToggleProps) => {
  const { isAutoRebuy, setAutoRebuy, autoRebuyAmount } = useAutoRebuy()
  const user = useCurrentUser()
  const { update } = useSession()

  const isHaveWinner = (match?.winners?.length ?? 0) > 0
  const canAutoRebuy = player?.stack === 0 && isHaveWinner

  useEffect(() => {
    if (isAutoRebuy && canAutoRebuy) {
      rebuy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canAutoRebuy])

  const rebuy = async () => {
    if (!player || !match || !user) return

    const { response, error } = await playerApi.rebuy({
      id: player.id,
      tableId,
      buyIn: autoRebuyAmount,
      userId: user.id,
    })

    if (error) {
      toast.error('Error when rebuying')
      return
    }

    setAutoRebuy({ isAutoRebuy: false, autoRebuyAmount: 0 })
    update()
  }

  return (
    <div className="flex items-center gap-x-1">
      <Switch
        checked={isAutoRebuy}
        onCheckedChange={() => setAutoRebuy({ isAutoRebuy: !isAutoRebuy })}
      />
      <p className="text-xs">Auto rebuy</p>
    </div>
  )
}
