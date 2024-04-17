import { JoinTable } from './_components/join-table'
import { SelectTable } from './_components/select-table'

const DashboardPage = () => {
  return (
    <div className="flex items-center  justify-center gap-x-4 w-full">
      <JoinTable />
      <SelectTable />
    </div>
  )
}

export default DashboardPage
