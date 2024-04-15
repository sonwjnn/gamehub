import { Navbar } from './_components/navbar'

import '@/styles/css/layout.css'
import '@/styles/css/styles.css'

interface BrowseLayoutProps {
  children: React.ReactNode
}

const BrowseLayout = ({ children }: BrowseLayoutProps) => {
  return (
    <main>
      <Navbar />
      <div className="h-full">{children}</div>
    </main>
  )
}

export default BrowseLayout
