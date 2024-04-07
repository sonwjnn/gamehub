import { currentUser } from '@/lib/auth'
import { Navbar } from './_components/navbar'
import '@/styles/css/layout.css'
import '@/styles/css/styles.css'
import playerApi from '@/services/api/modules/player-api'
import { redirect } from 'next/navigation'

interface SetupLayoutProps {
  children: React.ReactNode
}

const SetupLayout = async ({ children }: SetupLayoutProps) => {
  return (
    <div className="inner_page">
      <main>
        <Navbar />
        <div className="game_body">{children}</div>
      </main>
    </div>
  )
}

export default SetupLayout
