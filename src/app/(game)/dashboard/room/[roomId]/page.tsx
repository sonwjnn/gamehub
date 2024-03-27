'use client'

import Image from 'next/image'
import { OtherPlayer } from './_components/other-player'
import { CurrentPlayer } from './_components/current-player'
import { TableCards } from './_components/table-cards'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useModal } from '@/store/use-modal-store'
import { Button } from '@/components/ui/button'

const RoomPage = () => {
  const [isChatBoxVisible, setChatBoxVisible] = useState(false)
  const { onOpen } = useModal()

  const handleChatButtonClick = () => {
    setChatBoxVisible(true)
  }

  const handleCloseChatClick = (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    setChatBoxVisible(false)
  }
  return (
    <>
      <div className="wrapper">
        <Image
          src="/images/table.png"
          alt="tableImage"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
        <div className="inner">
          <div className="list_user">
            <div className="wrap_list">
              <OtherPlayer />
              <OtherPlayer showdown />
              <OtherPlayer type="fold" />
              <OtherPlayer type="active" />
              <OtherPlayer />
              <OtherPlayer showdown />
              <OtherPlayer />
              <OtherPlayer />
              <OtherPlayer />
            </div>
          </div>
          B
        </div>
        <TableCards />
        <CurrentPlayer showdown />
      </div>
      <div className="group_chat">
        <div
          className={cn('chat_box', isChatBoxVisible && 'is-show')}
          id="chat_box"
          onClick={handleCloseChatClick}
        >
          <div className="btn_close icon sz-24" id="close_chat">
            <i className="icon-down"></i>
          </div>
          <div className="body">
            <div className="wrap scrollbar">
              <div className="chat_item">
                <div className="name">Player2012:</div>
                <div className="des">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  odio mauris, interdum id ultrices et,
                </div>
                <div className="time">2:05 p.m</div>
              </div>
              <div className="chat_item">
                <div className="name">Player2012:</div>
                <div className="des">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  odio mauris, interdum id ultrices et,
                </div>
                <div className="time">2:05 p.m</div>
              </div>
              <div className="chat_item me">
                <div className="name">Player2012:</div>
                <div className="des">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  odio mauris, interdum id ultrices et,
                </div>
                <div className="time">2:05 p.m</div>
              </div>
            </div>
          </div>
          <div className="footer">
            <div
              className="textarea_custom scrollbar"
              contentEditable="true"
              aria-placeholder="Typing here..."
            ></div>
            <div className="btn_send">
              <span className="icon sz-24">
                <i className="icon-send"></i>
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={handleChatButtonClick}
          className={cn('btn_chat', isChatBoxVisible && 'is-hide')}
          id="btn_chat"
        >
          <div className="icon sz-24">
            <i className="icon-chat"></i>
          </div>
          <span>Chat</span>
        </div>
      </div>
    </>
  )
}

export default RoomPage
