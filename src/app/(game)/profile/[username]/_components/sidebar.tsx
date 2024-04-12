'use client'

import { UserAvatar } from '@/components/user-avatar'
import { useCurrentUser } from '@/hooks/use-current-user'
import { formatChipsAmount } from '@/utils/formatting'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const Sidebar = () => {
  const user = useCurrentUser()

  const router = useRouter()

  if (!user) {
    router.push('/auth/login')
    return null
  }

  return (
    <>
      <div className="sidebar_left">
        <div className="info_profile mt-8">
          {/* <div className="avatar mx-auto">
            <div className="images">
              <div className="imgDrop">
                <Image
                  src="/images/avt/1.jpg"
                  alt="image alt"
                  width={0}
                  height={0}
                />
              </div>
            </div>
          </div> */}
          <div className="flex justify-center">
            <UserAvatar
              size="xl"
              name={user.username}
              imageUrl="/images/avt/1.jpg"
            />
          </div>

          <div className="name text-center mt-8 fw-500">{user.username}</div>
          <div className="rank flex gap-8 flex-center fz-10 flex-midle mt-16">
            Rank:
            <div className="flex gapx-4 flex-midle">
              <div className="icon sz-12">
                <i className="icon-daimond" />
              </div>
              <div className="rank_daimond">(DAIMOND Gamer)</div>
            </div>
          </div>
          <div className="money flex flex-center gap-12 flex-midle mt-12">
            <span className="icon sz-16">
              <i className="icon-coin" />
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
                    <i className="icon-points" />
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
                    <i className="icon-win" />
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
                    <i className="icon-lose" />
                  </div>
                  <span>Total lose</span>
                </dt>
                <dd>50/120</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="list_menu mt-16 fz-14">
          <ul>
            <li className="active">
              <span className="icon sz-20 icon-color-white">
                <i className="icon-user" />
              </span>
              <span>Profile</span>
            </li>
            <li>
              <span className="icon sz-20 icon-color-white">
                <i className="icon-cash" />
              </span>
              <span>Cash Games</span>
            </li>
            <li>
              <span className="icon sz-20 icon-color-white">
                <i className="icon-points" />
              </span>
              <span>Points</span>
            </li>
            <li>
              <span className="icon sz-20 icon-color-white">
                <i className="icon-bell" />
              </span>
              <span>Notifications</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
