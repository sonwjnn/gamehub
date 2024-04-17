import { Navbar } from './_components/navbar'

import '@/styles/css/layout.css'
import '@/styles/css/styles.css'

interface BrowseLayoutProps {
  children: React.ReactNode
}

const BrowseLayout = ({ children }: BrowseLayoutProps) => {
  return (
    <div className="page-sub">
      <div className="h-dvh">
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default BrowseLayout
