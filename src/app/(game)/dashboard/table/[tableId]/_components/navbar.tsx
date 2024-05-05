'use client'

import { UserButton } from '@/components/auth/user-button'
import { useModal } from '@/store/use-modal-store'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const pathname = usePathname()

  const { onOpen } = useModal()
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
