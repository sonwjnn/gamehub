'use client'

import { UserButton } from '@/components/auth/user-button'
import { useModal } from '@/store/use-modal-store'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Player, Table } from '@/types'
import { useIsFolded } from '@/store/use-is-folded'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import playerApi from '@/services/api/modules/player-api'
import { toast } from 'sonner'
import { useTransition } from 'react'
import tableApi from '@/services/api/modules/table-api'
import { ToggleSound } from '@/components/toggle-sound'
import { ToggleBrightness } from '@/components/toggle-brightness'
import ChangeTable from './change-table'
type Props = {
  table: Table
  player: Player
}

export const Navbar = ({ table, player }: Props) => {
  const user = useCurrentUser()

  const { onOpen, onClose } = useModal()
  const { isFolded } = useIsFolded()
  const { update } = useSession()

  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const pathname = usePathname()

  const onBeViewerClick = async () => {
    if (!user || !table) return

    startTransition(async () => {
      const { response: tableData } = await tableApi.getTableById({
        tableId: table.id,
      })

      if (!tableData) {
        toast.error('Error when leaving table')
        return
      }

      const currentPlayerOfTable = tableData.players.find(
        (item: any) => item.userId === user.id
      )

      if (!currentPlayerOfTable) {
        toast.error('Error when leaving table')
        return
      }

      const { response, error } = await playerApi.removePlayer({
        tableId: table.id,
        playerId: currentPlayerOfTable.id,
      })

      if (error) {
        toast.error('Error when leaving table')
        return
      }

      onClose()
      update()
      router.refresh()
    })
  }

  return (
    <header
      className="game_heading"
      style={{ backgroundImage: 'url(/images/header_bg.png)' }}
    >
      <Link className="logo block pointer-events-none" href={pathname!}>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={0}
          height={0}
          sizes="100vw"
          className="logo"
        />
      </Link>
      <div className="toolbar flex flex-midle">
        <div className="flex gap-x-2">
          {player && (
            <>
              <Button
                variant="primary"
                disabled={isPending}
                onClick={onBeViewerClick}
              >
                Be a viewer
              </Button>
              <Button
                disabled={isPending}
                variant="primary"
                onClick={() => onOpen('rebuy', { table })}
              >
                Rebuy
              </Button>
            </>
          )}
          {!player && (
            <>
              <Button
                variant="primary"
                onClick={() => onOpen('buyIn', { table })}
              >
                Buyin
              </Button>
              <ChangeTable tableId={table.id} />
            </>
          )}
          <ToggleBrightness />
          <ToggleSound />
        </div>

        <div
          className="item flex flex-midle gap-8 item_rule flex-center"
          onClick={() => onOpen('rule')}
        >
          <div className="icon flex-shrink sz-32 icon-color-white">
            <i className="icon-rule" />
          </div>
        </div>

        <UserButton type="game" />
      </div>
    </header>
  )
}
