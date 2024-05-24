'use client'

import { UserButton } from '@/components/auth/user-button'
import { MobileToggle } from '@/components/mobile-toggle'
import { SocketIndicator } from '@/components/socket-indicator'
import { useModal } from '@/store/use-modal-store'
import Link from 'next/link'
import { ToggleBrightness } from '@/components/toggle-brightness'
import { ToggleSound } from '@/components/toggle-sound'

interface ActionsProps {}

export const Actions = ({}: ActionsProps) => {
  const { onOpen } = useModal()

  return (
    <div className="toolbar flex flex-midle">
      {/* <div className="mr-[24px]">
        <SocketIndicator />
      </div> */}

      <div className="flex gap-x-3 mx-3">
        <ToggleSound />
        <ToggleBrightness />
      </div>

      <Link
        href="/dashboard/table"
        className="item btn_play flex flex-midle gap-8"
      >
        <div className="icon flex-shrink sz-16">
          <i className="icon-play icon-color-white" />
        </div>
        <span>PLAY </span>
      </Link>

      <div
        className="item flex flex-midle gap-8 item_rule flex-center"
        onClick={() => onOpen('rule')}
      >
        <div className="icon flex-shrink sz-32 icon-color-white">
          <i className="icon-rule" />
        </div>
      </div>

      <UserButton />
      <MobileToggle />
    </div>
  )
}
