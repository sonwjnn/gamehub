'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useModal } from '@/store/use-modal-store'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useCurrentUser } from '@/hooks/use-current-user'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSocket } from '@/providers/socket-provider'
import playerApi from '@/services/api/modules/player-api'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatChipsAmount } from '@/utils/formatting'

const formSchema = z.object({
  buyIn: z.number().min(0, {
    message: 'Buy in must be greater than 0.',
  }),
})

export const BuyInModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()
  const user = useCurrentUser()
  const { socket } = useSocket()
  const { table } = data
  const { update } = useSession()

  const [isLoading, setIsLoading] = useState(false)

  const isModalOpen = isOpen && type === 'buyIn'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buyIn: table?.minBuyIn || 1000,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!user) return router.push('/auth/login')
      if (!table) return

      setIsLoading(true)

      const { response, error } = await playerApi.createPlayer({
        tableId: table.id,
        userId: user.id,
        socketId: socket.id,
        buyIn: values.buyIn,
      })

      if (error) {
        console.log(error)
        toast.error('Error joining table')
        return
      }

      router.push(`/dashboard/table/${table.id}`)

      update()
      onClose()
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <div className={cn('modal', isModalOpen && 'show')}>
      <div className="modal_dark modal_close" onClick={handleClose}></div>
      <div className="modal_dialog sz-lg">
        <div className="modal_content  max-w-[500px] flex-grow-0">
          <div className="modal_head">
            BUY IN
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
                  Buy into game
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
