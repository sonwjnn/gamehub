'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

interface WrapperProps {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  const [isChatBoxVisible, setChatBoxVisible] = useState(false)

  return (
    <div className="group_chat">
      <div
        className={cn('chat_box', isChatBoxVisible && 'is-show')}
        id="chat_box"
      >
        <div
          className="btn_close icon sz-24"
          id="close_chat"
          onClick={() => setChatBoxVisible(false)}
        >
          <i className="icon-down"></i>
        </div>
        <div className="body ">
          <div className="wrap scrollbar mb-[40px]">{children}</div>
        </div>
      </div>

      <div
        className={cn(
          'btn_chat m-[12px]',
          isChatBoxVisible ? 'is-hide' : 'is-show'
        )}
        id="btn_chat"
        onClick={() => setChatBoxVisible(true)}
      >
        <div className="icon sz-24">
          <i className="icon-chat"></i>
        </div>
        <span>Chat</span>
      </div>
    </div>
  )
}
