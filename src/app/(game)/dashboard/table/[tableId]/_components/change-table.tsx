import { Button } from '@/components/ui/button'
import tableApi from '@/services/api/modules/table-api'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

type ChangeTableProps = {
  tableId: string
}

const ChangeTable = ({ tableId }: ChangeTableProps) => {
  const [loading, startTransition] = useTransition()

  const router = useRouter()

  const onClick = () => {
    startTransition(async () => {
      const { response, error } = await tableApi.switchTable({ tableId })

      if (error) {
        toast.error('Not found table same value!')
        return
      }

      if (response) {
        if (response.id === tableId) {
          toast.error('Only one table!')
          return
        }

        return router.push(`/dashboard/table/${response.id}`)
      }
    })
  }

  return (
    <Button onClick={onClick} disabled={loading}>
      Change Table
    </Button>
  )
}

export default ChangeTable
