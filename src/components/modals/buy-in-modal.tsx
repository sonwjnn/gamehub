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
import { useState } from 'react'
import { useCurrentUser } from '@/hooks/use-current-user'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSocket } from '@/providers/socket-provider'
import playerApi from '@/services/api/modules/player-api'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

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

      onClose()
      update()
      router.push(`/dashboard/table/${table.id}`)
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
                <Button
                  variant="primary"
                  className="mx-auto"
                  disabled={isLoading}
                >
                  Buy into game
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
