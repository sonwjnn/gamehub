'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { cn } from '@/lib/utils'
import historyApi from '@/services/api/modules/history-api'
import { formatChipsAmount } from '@/utils/formatting'
import { RotateCcw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsCashCoin } from 'react-icons/bs'
import { toast } from 'sonner'

interface UserBoardProps {
  hasMenu?: boolean
}

export const UserBoard = ({ hasMenu = false }: UserBoardProps) => {
  const user = useCurrentUser()

  const router = useRouter()
  const pathname = usePathname()

  const [history, setHistory] = useState({
    loseCount: 0,
    winCount: 0,
  })

  useEffect(() => {
    const getHistories = async () => {
      if (!user) return

      const { response: data, error } = await historyApi.getAllByUserId({
        userId: user?.id,
      })

      if (error) {
        toast.error('Something went wrong!')
        return
      }

      if (data) {
        setHistory({
          loseCount:
            data.filter((item: any) => item.type === 'lose')?.length || 0,
          winCount:
            data.filter((item: any) => item.type === 'win')?.length || 0,
        })
      }
    }
    getHistories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <div className="name text-center mt-8 fw-500">{user.name}</div>
        <div className="rank flex gap-8 flex-center fz-10 flex-midle mt-8">
          등급:
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
              <div className="rank_daimond">(DIAMOND Gamer)</div>
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
                <span>포인트</span>
              </dt>
              <dd>{history.winCount * 100}</dd>
            </dl>
          </div>
          <div className="col-4">
            <dl className="text-center">
              <dt>
                <div className="icon sz-20 icon-color-white mx-auto">
                  <i className="icon-win"></i>
                </div>
                <span>총 승리</span>
              </dt>
              <dd>
                {history.winCount}/{history.loseCount + history.winCount}
              </dd>
            </dl>
          </div>
          <div className="col-4">
            <dl className="text-center">
              <dt>
                <div className="icon sz-20 icon-color-white mx-auto">
                  <i className="icon-lose"></i>
                </div>
                <span>총 패배</span>
              </dt>
              <dd>
                {history.loseCount}/{history.loseCount + history.winCount}
              </dd>
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
                <span>마이 정보</span>
              </Link>
            </li>
            <li className={pathname === '/settings/cash' ? 'active' : ''}>
              <Link href="/settings/cash">
                <span className="icon sz-20 icon-color-white">
                  <i className="icon-cash"></i>
                </span>
                <span>캐시 게임</span>
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
                <span>포인트</span>
              </Link>
            </li>
            <li className={pathname === '/settings/history' ? 'active' : ''}>
              <Link href="/settings/history">
                <span className="icon sz-20 icon-color-white">
                  <i className="icon-history"></i>
                </span>
                <span>게임 기록</span>
              </Link>
            </li>
            <li
              className={pathname === '/settings/notification' ? 'active' : ''}
            >
              <Link href="/settings/history">
                <span className="icon sz-20 icon-color-white">
                  <i className="icon-bell"></i>
                </span>
                <span>알림</span>
              </Link>
            </li>

            <li
              className={pathname === '/settings/new-password' ? 'active' : ''}
            >
              <Link href="/settings/new-password">
                <span className="icon sz-20 icon-color-white">
                  <RotateCcw size={20} />
                </span>
                <span>새 비밀번호</span>
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  )
}
