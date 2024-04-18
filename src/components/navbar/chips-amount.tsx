'use client'

import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { redirect } from 'next/navigation'
import { PiPokerChipBold } from 'react-icons/pi'

interface ChipsAmountProps {}

export const ChipsAmount = ({}: ChipsAmountProps) => {
  const user = useCurrentUser()

  if (!user) redirect('/auth/login')

  return (
    <div className="mx-2">
      <Button
        variant="outline"
        className="text-white min-w-[150px] rounded-full"
      >
        <PiPokerChipBold size={22} className="mr-auto text-red-500" />
        {user.chipsAmount}
      </Button>
    </div>
  )
}
