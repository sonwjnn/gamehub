'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { cn } from '@/lib/utils'
import { formatChipsAmount } from '@/utils/formatting'
import { RotateCcw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BsCashCoin } from 'react-icons/bs'

interface UserBoardProps {
  hasMenu?: boolean
}

export const UserBoard = ({ hasMenu = false }: UserBoardProps) => {
  const user = useCurrentUser()

  const router = useRouter()
  const pathname = usePathname()

  if (!user) {
    router.push('/auth/login')
    return
  }

  return (
    <>
      <div className="info_profile mt-8">
        <div className="avatar mx-auto">
          <div className="images">
            <div className="imgDrop">
              <Image
                src={user.image}
                alt="image alt"
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="name text-center mt-8 fw-500">{user.username}</div>
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
          <div className="number">{formatChipsAmount(user.chipsAmount)} $</div>
        </div>
        <div className="row info_more fz-10 mt-12">
          <div className="col-4">
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
          <div className="col-4">
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
          <div className="col-4">
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
      {hasMenu ? (
        <div className="list_menu mt-16 fz-14">
          <ul>
            <li className={pathname === '/settings/profile' ? 'active' : ''}>
              <Link href="/settings/profile">
                <span className="icon sz-20 icon-color-white">
                  <i className="icon-user"></i>
                </span>
                <span>Profile</span>
              </Link>
            </li>
            <li className={pathname === '/settings/cash' ? 'active' : ''}>
              <Link href="/settings/cash">
                <span className="icon sz-20 icon-color-white">
                  <i className="icon-cash"></i>
                </span>
                <span>Cash Games</span>
              </Link>
            </li>
            <li
              className={cn(
                'group',
                pathname === '/settings/cash-action' ? 'active' : ''
              )}
            >
              <Link href="/settings/cash-action">
                <BsCashCoin
                  size={20}
                  className="group-hover:text-white transition"
                />
                <span>Cash Actions</span>
              </Link>
            </li>
            <li className={pathname === '/settings/point' ? 'active' : ''}>
              <Link href="/settings/cash">
                <span className="icon sz-20 icon-color-white">
                  <i className="icon-points"></i>
                </span>
                <span>Points</span>
              </Link>
            </li>
            <li className={pathname === '/settings/history' ? 'active' : ''}>
              <Link href="/settings/history">
                <span className="icon sz-20 icon-color-white">
                  <i className="icon-history"></i>
                </span>
                <span>History</span>
              </Link>
            </li>
            <li
              className={pathname === '/settings/notification' ? 'active' : ''}
            >
              <Link href="/settings/history">
                <span className="icon sz-20 icon-color-white">
                  <i className="icon-bell"></i>
                </span>
                <span>Notifications</span>
              </Link>
            </li>

            <li
              className={pathname === '/settings/new-password' ? 'active' : ''}
            >
              <Link href="/settings/new-password">
                <span className="icon sz-20 icon-color-white">
                  <RotateCcw size={20} />
                </span>
                <span>New Password</span>
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  )
}
