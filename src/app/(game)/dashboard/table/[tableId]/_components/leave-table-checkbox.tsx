'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { useCurrentUser } from '@/hooks/use-current-user'
import { cn } from '@/lib/utils'
import playerApi from '@/services/api/modules/player-api'
import { Match, PlayerWithUser } from '@/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface LeaveTableCheckboxProps {
  tableId: string
  player: PlayerWithUser | undefined
  match: Match | null
  className?: string
}

export const LeaveTableCheckbox = ({
  tableId,
  player,
  match,
  className,
}: LeaveTableCheckboxProps) => {
  const user = useCurrentUser()
  const router = useRouter()

  const [isChecked, setIsChecked] = useState(player?.leaveNextMatch)

  const { update } = useSession()

  const hanleToggleCheckbox = async () => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    const { response: currentPlayer } = await playerApi.getCurrentPlayerOfTable(
      {
        tableId,
        userId: user?.id,
      }
    )

    if (!currentPlayer) {
      return
    }

    const { response, error } = await playerApi.updatePlayer({
      ...currentPlayer,
      leaveNextMatch: isChecked,
    })

    if (error) {
      // toast.error(error)
    }

    if (response) {
    }
  }
  const debouncedCallback = useDebouncedCallback(hanleToggleCheckbox, 500)

  const onToggle = () => {
    setIsChecked(!isChecked)
    debouncedCallback()
  }

  useEffect(() => {
    if (isChecked && match?.isShowdown) {
      update()
      router.push('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked, match, router])

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Checkbox id="leave" checked={isChecked} onCheckedChange={onToggle} />
      <label
        htmlFor="leave"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Leave next match
      </label>
    </div>
  )
}
