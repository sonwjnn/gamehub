'use client'

import { Navbar } from './_components/navbar'

import '@/styles/bootstrap.css'
import '@/styles/css/layout.css'
import '@/styles/css/styles.css'
import '@/styles/css/game.css'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useOrigin } from '@/hooks/use-origin'

interface GameLayoutProps {
  children: React.ReactNode
}

const GameLayout = ({ children }: GameLayoutProps) => {
  const origin = useOrigin()

  const pathname = usePathname()

  const isTableIdRoute = pathname?.includes('/dashboard/table/')

  return (
    <>
      {origin && (
        <div className={cn(isTableIdRoute ? 'game-html' : 'page-sub')}>
          <div className={cn(isTableIdRoute && 'game')}>
            <div className="inner_page">
              <main>
                {!isTableIdRoute && <Navbar />}
                {children}
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GameLayout
