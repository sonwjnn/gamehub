import roomApi from '@/services/api/modules/room-api'
import { InvitePlayer } from './_components/invite-player'

const RoomIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { roomId: string }
}) => {
  const { response: room } = await roomApi.getRoomById({
    roomId: params.roomId,
  })

  return (
    <div className="relative h-full w-full">
      <InvitePlayer room={room} />
      {children}
    </div>
  )
}

export default RoomIdLayout
