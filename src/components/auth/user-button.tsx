'use client'

import { LogoutButton } from '@/components/auth/logout-button'

import { useCurrentUser } from '@/hooks/use-current-user'

import { usePathname, useRouter } from 'next/navigation'
import { formatChipsAmount } from '@/utils/formatting'
import Link from 'next/link'
import Image from 'next/image'

export const UserButton = () => {
  const router = useRouter()
  const user = useCurrentUser()
  const pathname = usePathname()

  if (!user) {
    router.push('/auth/login')
    return null
  }

  return (
    <>
      <div className="item flex flex-midle gap-12 item_account">
        <div className="avatar icon sz-36 flex-shrink">
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
        <div className="content">
          {user.username}
          <div className="flex flex-midle gapx-4">
            <span className="icon sz-12">
              <i className="icon-coin"> </i>
            </span>
            <span className="text-gold fw-600">
              {formatChipsAmount(user.chipsAmount)} $
            </span>
          </div>
        </div>
        <span className="icon sz-20 icon-color-white flex-shrink">
          <i className="icon-down2"></i>
        </span>
        <div className="dropdown_content">
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
              Lorem ipsum dolor
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
                    {' '}
                    <i className="icon-daimond"></i>
                  </div>
                  <div className="rank_daimond">(DAIMOND Gamer)</div>
                </div>
              </div>
            </div>
            <div className="money flex flex-center gap-12 flex-midle mt-12">
              <span className="icon sz-16">
                {' '}
                <i className="icon-coin"></i>
              </span>
              <div className="number">20.000 $</div>
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
          <div className="list_menu">
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
                className={
                  pathname === '/settings/notification' ? 'active' : ''
                }
              >
                <Link href="/settings/history">
                  <span className="icon sz-20 icon-color-white">
                    <i className="icon-bell"></i>
                  </span>
                  <span>Notifications</span>
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
      </div>
    </>
  )
}
