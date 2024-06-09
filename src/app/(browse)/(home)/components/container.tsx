'use client'

import { LoadingPage } from '@/components/loading-page'
import { useOrigin } from '@/hooks/use-origin'

interface ContainerProps {
  children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  const origin = useOrigin()

  if (!origin) {
    return <LoadingPage />
  }

  return (
    <div className="inner_page">
      <main>{children}</main>
    </div>
  )
}
