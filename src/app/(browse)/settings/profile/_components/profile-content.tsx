'use client'

import Image from 'next/image'
import { ImageOption } from './image-option'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { UserSchema } from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { useCurrentUser } from '@/hooks/use-current-user'
import userApi from '@/services/api/modules/user-api'
import { Button } from '@/components/ui/button'

interface ProfileContentProps {}

export const ProfileContent = ({}: ProfileContentProps) => {
  const user = useCurrentUser()

  const [isPending, startTransition] = useTransition()
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    user?.image
  )

  const { update } = useSession()

  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: '',
      email: '',
      name: '',
      image: '',
    },
  })

  useEffect(() => {
    if (user) {
      form.setValue('username', user?.username || '')
      form.setValue('email', user?.email || '')
      form.setValue('name', user?.name || '')
      form.setValue('image', user?.image || '')
    }
  }, [user, form])

  const onSubmit = async (values: z.infer<typeof UserSchema>) => {
    if (!user) return

    startTransition(async () => {
      const { response, error } = await userApi.updateUser(
        values,
        user?.id as string
      )

      if (error) {
        toast.error('Something went wrong!')
        return
      }
      update()
    })
  }

  function handleImageClick(index: number) {
    const imageUrl = `/images/avt/${index + 1}.jpg`
    setSelectedImage(imageUrl)
    form.setValue('image', imageUrl)
  }

  return (
    <Form {...form}>
      <form className="mt-32" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="row  flex-center gapy-60 ">
          <div className="col-7 col-md-6 col-lg-4">
            <div className="avatar mx-auto flex-srink  aspect-square">
              <div className="images ">
                <div className="imgDrop ">
                  <Image
                    src={selectedImage || '/images/avt/1.jpg'}
                    alt="image alt"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-8 form_content space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-white/50">
                    User name
                  </FormLabel>
                  <FormControl>
                    <Input disabled={true} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="row">
              <div className="col-12 col-xl-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-white/50">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-12 col-xl-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-white/50">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input disabled={true} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="group_select_avater">
              <label className="label_select_avt">Change Profile Avatar</label>
              <div className="select_avt mt-8 flex flex-wrap flex-grow">
                {Array.from({ length: 10 }).map((_, index) => (
                  <ImageOption
                    key={index}
                    index={index}
                    onClick={() => handleImageClick(index)}
                    imageUrl={`/images/avt/${index + 1}.jpg`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footing flex flex-end gap-8">
          <Button type="submit" className="btn_main" disabled={isPending}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
