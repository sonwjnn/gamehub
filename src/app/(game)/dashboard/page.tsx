import { JoinRoom } from './_components/join-room'
import { SelectRoom } from './_components/select-room'

const DashboardPage = () => {
  return (
    <div className="flex items-center justify-center gap-x-4 w-full">
      <JoinRoom />
      <SelectRoom />
    </div>
  )
}

export default DashboardPage
