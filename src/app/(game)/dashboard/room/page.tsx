import roomApi from '@/services/api/modules/room-api'
import { RoomList } from './_components/list'

const RoomPage = async () => {
  const { response: rooms } = await roomApi.getRooms()

  return (
    <div className="flex flex-col items-center mb-auto  min-w-[700px] gap-y-6">
      <h1 className="text-2xl font-semibold text-white my-8">Room List</h1>
      <RoomList rooms={rooms} />
    </div>
  )
}

export default RoomPage
