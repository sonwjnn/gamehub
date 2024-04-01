'use client'

import { Hint } from '@/components/hint'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

import { cn, stringToColor } from '@/lib/utils'
// import { useModal } from "@/store/use-modal-store";
import { User, Player } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { UserAvatar } from '../user-avatar'
import { ChatItemSchema } from '@/schemas'

interface ChatItemProps {
  id: string
  content: string
  player: Player
  timestamp: string
  // fileUrl: string | null;
  deleted: boolean
  currentPlayer: Player
  socketUrl: string
  socketQuery: Record<string, string>
}

export const ChatItem = ({
  id,
  content,
  player,
  timestamp,
  // fileUrl,
  deleted,
  currentPlayer,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const params = useParams()
  const router = useRouter()
  const stringColor = stringToColor(player?.user?.username || '')

  const onPlayerClick = () => {
    if (player.id === currentPlayer.id) {
      return
    }

    router.push(`/servers/${params?.serverId}/conversations/${player.id}`)
  }

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        setIsEditing(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keyDown', handleKeyDown)
  }, [])

  const form = useForm<z.infer<typeof ChatItemSchema>>({
    resolver: zodResolver(ChatItemSchema),
    defaultValues: {
      content: content,
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof ChatItemSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: socketUrl,
        query: socketQuery,
      })

      await axios.patch(url, values)

      form.reset()
      setIsEditing(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    form.reset({
      content: content,
    })
  }, [form, content])

  // const fileType = fileUrl?.split(".").pop();

  // const isAdmin = currentUser.role === Role.ADMIN;
  const isAdmin = false
  const isOwner = currentPlayer.id === player.id
  const canDeleteMessage = !deleted && (isAdmin || isOwner)
  const canEditMessage = !deleted && isOwner
  // const isPDF = fileType === "pdf" && fileUrl;
  // const isImage = !isPDF && fileUrl;

  return (
    <div className="group relative flex w-full items-center ">
      <div className="group flex w-full items-start gap-x-2 px-[8px] py-[4px] rounded-sm  bg-white/5  hover:bg-black/5  transition">
        <div
          // onClick={onUserClick}
          className="cursor-pointer transition hover:drop-shadow-md"
        >
          <UserAvatar
            size="sm"
            imageUrl={player?.user?.image!}
            name={player?.user?.username || 'Unknown'}
          />
        </div>

        <div className="flex w-full flex-col ">
          <div className="flex items-center gap-x-2">
            <p className="text-sm " style={{ color: stringColor }}>
              {player?.user?.username}
            </p>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 italic">
              {timestamp}
            </span>
          </div>
          {!isEditing && (
            <p
              className={cn(
                'text-sm text-zinc-600 dark:text-zinc-300 text-pretty',
                deleted &&
                  'mt-1 text-xs italic text-zinc-500 dark:text-zinc-400'
              )}
            >
              {content}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export const ChatItemSkeleton = () => (
  <div className="flex w-full items-center gap-x-2 p-4 transition hover:bg-black/5">
    <Skeleton className="min-h-8 min-w-8 rounded-full" />
    <div className="flex w-full flex-col gap-y-2">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-20 w-full md:w-80" />
    </div>
  </div>
)
