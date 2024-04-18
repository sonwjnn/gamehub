'use client'

import { useOrigin } from '@/hooks/use-origin'

interface ContainerProps {
  children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  const origin = useOrigin()

  if (!origin) return null

  return (
    <div className="inner_page">
      <main>{children}</main>
    </div>
  )
}
