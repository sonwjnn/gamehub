import { Navbar } from './_components/navbar'
import '@/styles/css/layout.css'
import '@/styles/css/styles.css'

interface SetupLayoutProps {
  children: React.ReactNode
}

const SetupLayout = ({ children }: SetupLayoutProps) => {
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
