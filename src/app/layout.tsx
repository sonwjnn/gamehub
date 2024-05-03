import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/providers/modal-provider'
import { QueryProvider } from '@/providers/query-provider'
import { SocketProvider } from '@/providers/socket-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import type { Metadata } from 'next'

import './globals.css'
import '@/styles/bootstrap.css'

import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: 'Poker',
  description: 'A Poker Game built with Next.js and Tailwind CSS.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html className="h-full" lang="en" suppressHydrationWarning>
        <body className={cn('bg-white dark:bg-[#213338] h-full')}>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="game-theme"
          >
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
