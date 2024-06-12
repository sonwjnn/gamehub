'use client'

import { Navbar } from '@/components/navbar'

import '@/styles/css/layout.css'
import '@/styles/css/styles.css'
import '@/styles/css/game.css'

import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/providers/modal-provider'
import { useEffect } from 'react'

interface GameLayoutProps {
  children: React.ReactNode
}

const GameLayout = ({ children }: GameLayoutProps) => {
  const params = useParams()

  const isTableIdRoute = params?.tableId

  useEffect(() => {
    if (isTableIdRoute) {
      document.body.classList.add('overflow-hidden')
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [isTableIdRoute])

  return (
    <div className={cn(isTableIdRoute ? 'game-html' : 'page-sub')}>
      <div className={cn(isTableIdRoute && 'game')}>
        <div className="inner_page">
          <main>
            {!isTableIdRoute && <Navbar />}
            {children}
          </main>
        </div>
        <ModalProvider />
      </div>
    </div>
  )
}

export default GameLayout
