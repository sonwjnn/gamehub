import { AdminButton } from '@/components/admin-button'
import { ChatButton } from '@/components/chat-button'
import { RoomButton } from '@/components/room-button'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()

  if (!user) {
    return redirect('/auth/login')
  }

  return (
    <div className="flex gap-x-4">
      <RoomButton />
      <ChatButton />
      <AdminButton />
    </div>
  )
}
