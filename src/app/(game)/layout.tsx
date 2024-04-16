'use client'

import { Navbar } from './_components/navbar'
import '@/styles/css/layout.css'
import '@/styles/css/game.css'

import { usePathname } from 'next/navigation'

interface GameLayoutProps {
  children: React.ReactNode
}

const GameLayout = ({ children }: GameLayoutProps) => {
  const pathname = usePathname()

  const isTableIdRoute = pathname?.includes('/dashboard/table/')
  return (
    <div className="inner_page">
      <main>
        {!isTableIdRoute && <Navbar />}
        <div className="game_body">{children}</div>
      </main>
    </div>
  )
}

export default GameLayout
