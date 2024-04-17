'use client'

import { Navbar } from './_components/navbar'
import '@/styles/css/layout.css'
import '@/styles/css/styles.css'
import '@/styles/css/game.css'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface GameLayoutProps {
  children: React.ReactNode
}

const GameLayout = ({ children }: GameLayoutProps) => {
  const pathname = usePathname()

  const isTableIdRoute = pathname?.includes('/dashboard/table/')
  return (
    <div className={cn(isTableIdRoute ? 'game-html' : 'page-sub')}>
      <div className={cn(isTableIdRoute && 'game')}>
        <div className="inner_page">
          <main className={cn(!isTableIdRoute && 'min-h-screen')}>
            {!isTableIdRoute && <Navbar />}
            <div className={cn(isTableIdRoute && 'game_body')}>{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default GameLayout
