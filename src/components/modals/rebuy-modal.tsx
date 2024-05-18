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
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatChipsAmount } from '@/utils/formatting'

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
      buyIn: 1000,
    },
  })

  useEffect(() => {
    if (table) {
      form.setValue('buyIn', table.minBuyIn)
    }
  }, [form, table])

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
        userId: user.id,
      })

      if (error) {
        console.log(error)
        toast.error('Error rebuy ')
        return
      }

      onClose()
      update()
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  // const onCancel = async () => {
  //   try {
  //     if (!user || !tableData) return

  //     const currentPlayerOfTable = tableData.players.find(
  //       item => item.userId === user.id
  //     )

  //     if (!currentPlayerOfTable) return

  //     setIsLoading(true)

  //     const { response, error } = await playerApi.removePlayer({
  //       tableId: tableData.id,
  //       playerId: currentPlayerOfTable.id,
  //     })

  //     if (error) {
  //       toast.error('Error when leaving table')
  //       return
  //     }

  //     onClose()
  //     update()
  //   } catch {
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleClose = async () => {
    form.reset()
  }

  return (
    <div className={cn('modal', isModalOpen && 'show')}>
      <div className="modal_dark modal_close" onClick={handleClose}></div>
      <div className="modal_dialog sz-lg">
        <div className="modal_content  max-w-[500px] flex-grow-0">
          <div className="modal_head">
            REBUY
            <div className="btn_close modal_close" onClick={handleClose}>
              <X className="mt-3" size={24} />
            </div>
          </div>
          <div className="modal_body">
            <div className="mt-4 gap-x-2 text-center  text  mb-3 ">
              Min : {formatChipsAmount(table?.minBuyIn || 0)}
              <br />
              Max : {formatChipsAmount(table?.maxBuyIn || 0)}
              <br />
              Ante: {formatChipsAmount(table?.ante || 0)}
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="buyIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="input-group">
                          <div className="wrap-input flex justify-center">
                            <Input
                              className="w-auto py-0 "
                              type="number"
                              min={table?.minBuyIn}
                              max={table?.maxBuyIn}
                              disabled={isLoading}
                              {...field}
                              onChange={e =>
                                field.onChange(+e.target.value || ' ')
                              }
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="primary"
                  className="mx-auto"
                  disabled={isLoading}
                >
                  Rebuy
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
