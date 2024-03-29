'use client'

import { Message } from '@/types'
import { createContext, ReactNode, useContext, useState } from 'react'

export const MessageManagerContext = createContext<{
  messages: Message[]
  addMessage: (message: Message) => void
}>({ messages: [], addMessage: v => {} })

export const MessageManagerProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [messages, setMessages] = useState<Message[]>([])

  return (
    <MessageManagerContext.Provider
      value={{
        messages,

        // this can be used when a messageMessage logs in
        addMessage: message => {
          setMessages(prev => [...prev, message])
        },
      }}
    >
      {children}
    </MessageManagerContext.Provider>
  )
}

export const useMessageManager = () => {
  return useContext(MessageManagerContext)
}
