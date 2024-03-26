import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()

  if (!user) {
    return redirect('/auth/login')
  }

  return <Button className="text-white">Go to room 2</Button>
}
