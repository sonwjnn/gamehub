'use client'

import { Hint } from '@/components/hint'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'
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

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-2 h-4 w-4 text-indigo-500" />,
  ADMIN: <ShieldAlert className="ml-2 h-4 w-4 text-rose-500" />,
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
    <div className="group relative flex w-full items-center p-4 transition hover:bg-black/5">
      <div className="group flex w-full items-start gap-x-2">
        <div
          // onClick={onUserClick}
          className="cursor-pointer transition hover:drop-shadow-md"
        >
          <UserAvatar
            // imageUrl={user.user.image!}
            name={player?.user?.username || 'Unknown'}
          />
        </div>

        <div className="flex w-full flex-col">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="cursor-pointer text-sm font-semibold text-zinc-600 hover:underline dark:text-zinc-300">
                {player?.user?.username}
              </p>
              {/* <Hint label={user.role}>{roleIconMap[user.role]}</Hint> */}
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {/* {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-2 flex aspect-square h-48 w-48 items-center overflow-hidden rounded-md border bg-secondary"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className="object-cover"
              />
            </a>
          )}
          {isPDF && (
            <div className="relative mt-2 flex items-center rounded-md bg-background/10 p-2">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 hover:underline dark:text-indigo-400"
              >
                PDF File
              </a>
            </div>
          )} */}
          {!isEditing && (
            <p
              className={cn(
                'text-sm text-zinc-600 dark:text-zinc-300',
                deleted &&
                  'mt-1 text-xs italic text-zinc-500 dark:text-zinc-400'
              )}
            >
              {content}
            </p>
          )}
          {isEditing && (
            <Form {...form}>
              <form
                className="flex w-full items-center gap-x-2 pt-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            className="border-0 border-none bg-zinc-200/90 p-2 text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-700/75 dark:text-zinc-200"
                            placeholder="Edited message"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size="sm" variant="primary">
                  {isLoading ? <Spinner className="mr-2" /> : null}
                  Save
                </Button>
              </form>
              <span className="mt-1 text-[10px] text-zinc-400">
                Press escape to cancel, enter to save
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="absolute -top-2 right-5 hidden items-center gap-x-2 rounded-sm border bg-white p-1 group-hover:flex dark:bg-zinc-800">
          {canEditMessage && (
            <Hint label="Edit">
              <Edit
                onClick={() => setIsEditing(true)}
                className="ml-auto h-4 w-4 cursor-pointer text-zinc-500 transition hover:text-zinc-600 dark:hover:text-zinc-300"
              />
            </Hint>
          )}
          {/* <Hint label="Delete">
            <Trash
              onClick={() =>
                onOpen("deleteMessage", {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                })
              }
              className="ml-auto h-4 w-4 cursor-pointer text-zinc-500 transition hover:text-zinc-600 dark:hover:text-zinc-300"
            />
          </Hint> */}
        </div>
      )}
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
