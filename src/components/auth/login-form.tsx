'use client'

import { CardWrapper } from '@/components/auth/card-wrapper'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { login } from '@/actions/login'
import Image from 'next/image'

interface LoginFormProps {}

export const LoginForm = ({}: LoginFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl')
  const urlError =
    searchParams?.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      login(values, callbackUrl)
        .then((data: any) => {
          if (data?.error) {
            form.reset()
            setError(data.error)
          }

          if (data?.success) {
            form.reset()
            setSuccess(data.success)
          }
        })
        .catch(() => setError('Something went wrong!'))
    })
  }

  return (
    <CardWrapper
      headerLabel=""
      headerDescription="Log in to your account."
      backButtonLabel="Sign up here"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" mt-[28px]">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="input-group">
                      <div className="wrap-input">
                        <Input type="text" disabled={isPending} {...field} />
                        <label>Username</label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="input-group">
                      <div className="wrap-input">
                        <Input
                          disabled={isPending}
                          type="password"
                          {...field}
                        />
                        <label>Password</label>
                        <span className="validation">Text err</span>
                      </div>
                    </div>
                  </FormControl>

                  {/* <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href={"/auth/reset"}>Forgot password?</Link>
                  </Button> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <p className="text-center color-main fz-12 mb-32 text-link mt-0">
            Forgot password
          </p>
          <div className="input-group text-center">
            <button
              type="submit"
              className="btn btn-submit disabled:pointer-events-none disabled:opacity-50"
              disabled={isPending}
            >
              <span className="color-main">Login</span>
            </button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}
