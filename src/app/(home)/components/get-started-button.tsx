'use client'

import { RegisterButton } from '@/components/auth/register-button'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useOrigin } from '@/hooks/use-origin'
import { useRouter } from 'next/navigation'

interface GetStartedButtonProps {}

export const GetStartedButton = ({}: GetStartedButtonProps) => {
  const origin = useOrigin()

  const user = useCurrentUser()
  const router = useRouter()

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (user) {
      return router.push('/dashboard')
    }
  }

  if (!origin) {
    return null
  }

  return (
    <div onClick={onClick}>
      <RegisterButton mode="modal">
        <Button variant="destructive">Get started</Button>
      </RegisterButton>
    </div>
  )
}
