'use client'

import { useOrigin } from '@/hooks/use-origin'

interface ContainerProps {
  children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  const origin = useOrigin()

  if (!origin) {
    return (
      <div className="absolute inset-0 bg-zinc-900 z-50 flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    )
  }

  return (
    <div className="inner_page">
      <main>{children}</main>
    </div>
  )
}
