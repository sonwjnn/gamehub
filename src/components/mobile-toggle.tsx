'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useCurrentUser } from '@/hooks/use-current-user'
import { LogoutButton } from './auth/logout-button'
import Link from 'next/link'
import '@/styles/css/styles.css'
import { UserBoard } from './user-board'
import { RotateCcw } from 'lucide-react'
import { BsCashCoin } from 'react-icons/bs'

export const MobileToggle = () => {
  const [isOpen, setIsOpen] = useState(false)

  const user = useCurrentUser()

  if (!user) {
    return null
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div
          className={cn('btn_hamburger shrink-0', isOpen && 'active')}
          id="btn_hamburger"
        >
          <span />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0 z-[9999] w-full">
        <div className="page-sub bg-[#00152d] w-full p-[12px]">
          <div className="sidebar_left">
            <UserBoard hasMenu={false} />
          </div>

          <div className="list_menu mt-[12px]">
            <ul>
              <li>
                <Link href="/settings/profile" onClick={() => setIsOpen(false)}>
                  <span className="icon sz-16 icon-color-white">
                    <i className="icon-user"></i>
                  </span>
                  <span className="icon-color-white">마이 정보</span>
                </Link>
              </li>
              <li>
                <Link href="/settings/cash" onClick={() => setIsOpen(false)}>
                  <span className="icon sz-20 icon-color-white">
                    <i className="icon-cash"></i>
                  </span>
                  <span>캐시 게임</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/settings/cash-action"
                  onClick={() => setIsOpen(false)}
                >
                  <BsCashCoin
                    size={20}
                    className="group-hover:text-white transition"
                  />
                  <span>Cash Actions</span>
                </Link>
              </li>

              <li>
                <Link href="/settings/cash" onClick={() => setIsOpen(false)}>
                  <span className="icon sz-20 icon-color-white">
                    <i className="icon-points"></i>
                  </span>
                  <span>포인트</span>
                </Link>
              </li>

              <li>
                <Link href="/settings/history" onClick={() => setIsOpen(false)}>
                  <span className="icon sz-20 icon-color-white">
                    <i className="icon-history"></i>
                  </span>
                  <span>게임 기록</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/settings/new-password"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="icon sz-20 icon-color-white">
                    <RotateCcw size={20} />
                  </span>
                  <span>새 비밀번호</span>
                </Link>
              </li>
              <li>
                <LogoutButton>
                  <a href="">
                    <span className="icon sz-16 icon-color-red">
                      <i className="icon-logout"></i>
                    </span>
                    <span className="icon-color-red">로그오웃</span>
                  </a>
                </LogoutButton>
              </li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
