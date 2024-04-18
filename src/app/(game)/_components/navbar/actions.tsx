import { UserButton } from '@/components/auth/user-button'
import { SocketIndicator } from '@/components/socket-indicator'
import Link from 'next/link'
import { MobileToggle } from '@/components/mobile-toggle'

interface ActionsProps {}

export const Actions = ({}: ActionsProps) => {
  return (
    <div className="toolbar flex flex-midle">
      <div className="mr-[24px]">
        <SocketIndicator />
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
      <div className="item flex flex-midle gap-8 item_rule flex-center">
        <div className="icon flex-shrink sz-32 icon-color-white">
          <i className="icon-rule" />
        </div>
      </div>
      <UserButton />
      <MobileToggle />
    </div>
  )
}
