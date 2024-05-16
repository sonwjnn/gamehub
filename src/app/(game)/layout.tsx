'use client'

import { Navbar } from '@/components/navbar'

import '@/styles/css/layout.css'
import '@/styles/css/styles.css'
import '@/styles/css/game.css'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/providers/modal-provider'

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
          <main>
            {!isTableIdRoute && <Navbar />}
            {children}
          </main>
        </div>
      </div>
      <ModalProvider />
    </div>
  )
}

export default GameLayout
