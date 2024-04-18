import { Navbar } from './_components/navbar'

import '@/styles/css/styles.css'
import '@/styles/css/layout.css'
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
