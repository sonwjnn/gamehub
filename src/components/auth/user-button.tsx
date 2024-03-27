'use client'

import { LogoutButton } from '@/components/auth/logout-button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCurrentUser } from '@/hooks/use-current-user'

import { LogOut } from 'lucide-react'
import { UserAvatar } from '@/components/user-avatar'

export const UserButton = () => {
  const user = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          size="md"
          imageUrl={user?.image}
          name={user?.name as string}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
