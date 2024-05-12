'use client'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { useModal } from '@/store/use-modal-store'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const BuyChipsModal = () => {
  const { isOpen, onClose, type } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'buyChips'

  const onClick = () => {
    router.push('/settings/cash-action')
  }

  return (
    <div className={cn('modal', isModalOpen && 'show')}>
      <div className="modal_dark modal_close" onClick={onClose}></div>
      <div className="modal_dialog sz-lg">
        <div className="modal_content  max-w-[700px] flex-grow-0">
          <div className="modal_head">
            BUY CHIPS
            <div className="btn_close modal_close" onClick={onClose}>
              <X className="mt-3" size={24} />
            </div>
          </div>
          <div className="modal_body space-y-6">
            <div className="text text-center">
              You dont have enough chips to play. Please buy chips to continue
              playing.
            </div>

            <Button variant="primary" className="mx-auto" onClick={onClick}>
              Buy chips
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
