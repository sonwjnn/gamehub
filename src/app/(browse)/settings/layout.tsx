import React from 'react'
import { UserBoard } from '@/components/user-board'

interface SettingsLayoutProps {
  children: React.ReactNode
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <main className="w-full  z-20 ">
      <div className="boding_main">
        <UserBoard />
        <div className="content_main">
          <div className="inner">{children}</div>
        </div>
      </div>
    </main>
  )
}

export default SettingsLayout
