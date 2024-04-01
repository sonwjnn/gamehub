'use client'

// import { EmojiPicker } from "@/components/emoji-picker";
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import { useModal } from "@/store/use-modal-store";
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Skeleton } from '@/components/ui/skeleton'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Textarea } from '@/components/ui/textarea'

interface ChatInputProps {
  apiUrl: string
  query: Record<string, any>
  name: string
  type: 'conversation' | 'table'
}

const formSchema = z.object({
  content: z.string().min(1),
})

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  // const { onOpen } = useModal();
  const user = useCurrentUser()

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })
  // if (!currentUser) {
  //   return null;
  // }

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      })

      await axios.post(url, {
        ...values,
        user,
      })

      form.reset()
      router.refresh()
    } catch (error) {
      // console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative mx-[12px] ">
                  <div className="h-[36px]">
                    <Textarea
                      disabled={isLoading}
                      className="border-0 border-none resize-none rounded-t-none   text-[12px] pl-[8px] pr-[50px] py-[4px] bg-[#181818]  no-scrollbar  text-white min-h-[36px] max-h-[36px] focus-visible:ring-0 focus-visible:ring-offset-0  "
                      placeholder={`Typing message...`}
                      onKeyDown={event => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                          event.preventDefault()
                          form.handleSubmit(onSubmit)()
                        }
                      }}
                      {...field}
                    />
                  </div>

                  <div
                    className="absolute right-0 inset-y-0 w-[60px] flex items-center justify-center hover:bg-black/50 rounded-br-md"
                    onClick={() => form.handleSubmit(onSubmit)()}
                  >
                    <span className="icon sz-24">
                      <i className="icon-send"></i>
                    </span>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export const ChatInputSkeleton = () => (
  <div className="relative p-4 pb-6">
    <Skeleton className="h-10 w-full" />
  </div>
)
