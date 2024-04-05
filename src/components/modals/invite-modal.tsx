'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useOrigin } from '@/hooks/use-origin'
import { useModal } from '@/store/use-modal-store'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export const InviteModal = () => {
  const { isOpen, onClose, type, data } = useModal()

  const isModalOpen = isOpen && type === 'invite'
  const { table } = data

  const [copied, setCopied] = useState(false)

  const inviteCode = table?.id

  const onCopy = () => {
    navigator.clipboard.writeText(`${inviteCode}`)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite Players
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-sm font-bold uppercase text-zinc-500 dark:text-zinc-300">
            Table invite link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteCode}
              readOnly
            />
            <Button onClick={onCopy} size="icon">
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
