'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const pathname = usePathname()
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
    </header>
  )
}
