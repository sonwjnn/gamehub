import { currentRole } from '@/lib/auth'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

const App = dynamic(() => import('./app'), { ssr: false })

const AdminPage = async () => {
  const role = await currentRole()

  if (role !== 'ADMIN') {
    redirect('/')
  }

  return <App />
}

export default AdminPage
