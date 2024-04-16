'use client'

// import { Navbar } from '@/components/navbar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { UserBoard } from './user-board'
import { formatChipsAmount } from '@/utils/formatting'
import Image from 'next/image'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useRouter } from 'next/navigation'
import { LogoutButton } from './auth/logout-button'
import Link from 'next/link'

export const MobileToggle = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const user = useCurrentUser()

  if (!user) {
    router.push('/auth/login')
    return
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div
          className={cn('btn_hamburger', isOpen && 'active')}
          id="btn_hamburger"
        >
          <span />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0">
        <div className="bg-[#00152d] w-full p-[12px]">
          <div className="sidebar_left w-full pt-[50px]">
            <div className="info_profile mt-8">
              <div className="avatar mx-auto">
                <div className="images">
                  <div className="imgDrop">
                    <Image
                      src="/images/avt/1.jpg"
                      alt="image alt"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-auto h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="name text-center mt-8 fw-500">
                {user.username}
              </div>
              <div className="rank flex gap-8 flex-center fz-10 flex-midle mt-8">
                Rank:
                <div>
                  {/* <!--.flex.gap-8.flex-midle
                  .icon.sz-12 
                  	i.icon-silver
                  .rank_silver (SILVER Gamer)
                  -->
                  <!--.flex.gap-8.flex-midle
                  .icon.sz-12 
                  	i.icon-gold
                  .rank_gold (GOLD Gamer)
                  --> */}
                  <div className="flex gapx-4 flex-midle">
                    <div className="icon sz-12">
                      <i className="icon-daimond"></i>
                    </div>
                    <div className="rank_daimond">(DAIMOND Gamer)</div>
                  </div>
                </div>
              </div>
              <div className="money flex flex-center gap-12 flex-midle mt-12">
                <span className="icon sz-16">
                  <i className="icon-coin"></i>
                </span>
                <div className="number">
                  {formatChipsAmount(user.chipsAmount)} $
                </div>
              </div>
              <div className="row info_more fz-10 mt-12 grid gap-x-2 grid-cols-12">
                <div className="col-span-4">
                  <dl className="text-center">
                    <dt>
                      <div className="icon sz-20 icon-color-white mx-auto">
                        <i className="icon-points"></i>
                      </div>
                      <span>Points</span>
                    </dt>
                    <dd>1000</dd>
                  </dl>
                </div>
                <div className="col-span-4">
                  <dl className="text-center">
                    <dt>
                      <div className="icon sz-20 icon-color-white mx-auto">
                        <i className="icon-win"></i>
                      </div>
                      <span>Total win</span>
                    </dt>
                    <dd>30/120</dd>
                  </dl>
                </div>
                <div className="col-span-4">
                  <dl className="text-center">
                    <dt>
                      <div className="icon sz-20 icon-color-white mx-auto">
                        <i className="icon-lose"></i>
                      </div>
                      <span>Total lose</span>
                    </dt>
                    <dd>50/120</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="list_menu mt-[12px]">
            <ul>
              <li>
                <Link href="/settings/profile">
                  <span className="icon sz-16 icon-color-white">
                    <i className="icon-user"></i>
                  </span>
                  <span className="icon-color-white">Profile</span>
                </Link>
              </li>
              <li>
                <Link href="/settings/cash">
                  <span className="icon sz-20 icon-color-white">
                    <i className="icon-cash"></i>
                  </span>
                  <span>Cash Games</span>
                </Link>
              </li>
              <li>
                <Link href="/settings/cash">
                  <span className="icon sz-20 icon-color-white">
                    <i className="icon-points"></i>
                  </span>
                  <span>Points</span>
                </Link>
              </li>

              <li>
                <Link href="/settings/history">
                  <span className="icon sz-20 icon-color-white">
                    <i className="icon-history"></i>
                  </span>
                  <span>History</span>
                </Link>
              </li>
              <li>
                <LogoutButton>
                  <a href="">
                    <span className="icon sz-16 icon-color-red">
                      <i className="icon-logout"></i>
                    </span>
                    <span className="icon-color-red">Logout</span>
                  </a>
                </LogoutButton>
              </li>
              {/* <li>
                <a href="">
                  <span className="icon sz-16 icon-color-red">
                    <i className="icon-remove_acc"></i>
                  </span>
                  <span className="icon-color-red">Remove account</span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
