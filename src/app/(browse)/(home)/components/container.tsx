'use client'

import { PageLoading } from '@/components/page-loading'
import { useOrigin } from '@/hooks/use-origin'

interface ContainerProps {
  children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  const origin = useOrigin()

  if (!origin) {
    return <PageLoading />
  }

  return (
    <div className="inner_page">
      <main>{children}</main>
    </div>
  )
}
