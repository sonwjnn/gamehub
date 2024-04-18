'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '@/store/use-modal-store'
import { useRouter } from 'next/navigation'

export const BuyChipsModal = () => {
  const { isOpen, onClose, type } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'buyChips'

  const onClick = () => {}

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0 ">
        <DialogHeader className="px-[24px] pt-[32px]">
          <DialogTitle className="text-center text-2xl font-bold">
            Chips
          </DialogTitle>
        </DialogHeader>
        <div className="px-[24px]">
          <div className="mt-[8px] flex items-center gap-x-2 text-center  text-zinc-300">
            You dont have enough chips to play. Please buy chips to continue
            playing.
          </div>
        </div>
        <DialogFooter className="px-[24px] py-[16px] ">
          <Button variant="primary" className="mx-auto" onClick={onClick}>
            Buy chips
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
