'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useModal } from '@/store/use-modal-store'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useCurrentUser } from '@/hooks/use-current-user'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSocket } from '@/providers/socket-provider'
import playerApi from '@/services/api/modules/player-api'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import tableApi from '@/services/api/modules/table-api'
import { Table } from '@/types'

const formSchema = z.object({
  buyIn: z.number().min(0, {
    message: 'Buy in must be greater than 0.',
  }),
})

export const RebuyModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()
  const user = useCurrentUser()
  const { socket } = useSocket()
  const { table } = data
  const { update } = useSession()

  const [isLoading, setIsLoading] = useState(false)
  const [tableData, setTableData] = useState<Table | null>(null)

  const isModalOpen = isOpen && type === 'rebuy'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buyIn: table?.minBuyIn || 0,
    },
  })

  useEffect(() => {
    const getTableById = async () => {
      if (!table) return

      const { response, error } = await tableApi.getTableById({
        tableId: table.id,
      })

      if (error) {
        console.log(error)
        return
      }

      setTableData(response)
    }

    if (isModalOpen) {
      getTableById()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!user) return router.push('/auth/login')
      if (!tableData) return

      const currentPlayer = tableData.players.find(
        item => item.userId === user.id
      )

      if (!currentPlayer) return

      setIsLoading(true)

      const { response, error } = await playerApi.rebuy({
        id: currentPlayer.id,
        tableId: tableData.id,
        buyIn: values.buyIn,
      })

      if (error) {
        console.log(error)
        toast.error('Error rebuy ')
        return
      }

      onClose()
      update()
      router.push(`/dashboard/table/${tableData.id}`)
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  const onCancel = async () => {
    try {
      if (!user || !tableData) return

      const currentPlayerOfTable = tableData.players.find(
        item => item.userId === user.id
      )

      if (!currentPlayerOfTable) return

      setIsLoading(true)

      const { response, error } = await playerApi.removePlayer({
        tableId: tableData.id,
        playerId: currentPlayerOfTable.id,
      })

      if (error) {
        toast.error('Error when leaving table')
        return
      }

      onClose()
      update()
      router.push('/dashboard/table')
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = async () => {
    form.reset()
    await onCancel()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden  p-0 ">
        <DialogHeader className="px-[24px] pt-[32px]">
          <DialogTitle className="text-center text-2xl font-bold">
            Buy In
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 w-full">
          <div className="mt-2 gap-x-2 text-center  text-zinc-300">
            You have to buy in to play. Please buy in to join this table.
          </div>

          <div className="mt-4 gap-x-2 text-center  text-zinc-300 font-bold text-xl mb-3">
            Min buy in: {table?.minBuyIn}
            <br />
            Max buy in: {table?.maxBuyIn}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="buyIn"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                    Invite code
                  </FormLabel> */}
                    <FormControl>
                      <Input
                        className="text-center text-base text-white font-semibold"
                        type="number"
                        min={table?.minBuyIn}
                        max={table?.maxBuyIn}
                        disabled={isLoading}
                        {...field}
                        onChange={e => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="bg-gray-100 px-[24px] py-[16px] ">
                <Button variant="ghost" onClick={onCancel}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="mx-auto"
                  disabled={isLoading}
                >
                  Rebuy into game
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
