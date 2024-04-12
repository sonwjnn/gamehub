'use client'

import { LogoutButton } from '@/components/auth/logout-button'

import { useCurrentUser } from '@/hooks/use-current-user'

import { UserAvatar } from '@/components/user-avatar'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { formatChipsAmount } from '@/utils/formatting'

export const UserButton = () => {
  const router = useRouter()
  const user = useCurrentUser()

  if (!user) {
    router.push('/auth/login')
    return null
  }

  return (
    <>
      <div className="item flex flex-midle gap-12 item_account">
        {/* <div className="avatar icon sz-36 flex-shrink">
          <div className="images">
            <div className="imgDrop">
              <Image
                src="/images/avt/1.jpg"
                alt="Logo"
                width={0}
                height={0}
                className="w-auto h-full object-cover absolute"
              />
            </div>
          </div>
        </div> */}

        <UserAvatar
          size="sm"
          name={user.username}
          imageUrl="/images/avt/1.jpg"
        />

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
        <span className="ml-auto icon sz-20 icon-color-white flex-shrink">
          <i className="icon-down2" />
        </span>
        <div className="dropdown_content">
          <div className="info_profile mt-8">
            {/* <div className="avatar mx-auto">
              <div className="images">
                <div className="imgDrop">
                  <Image
                    src="/images/avt/1.jpg"
                    alt="Logo"
                    width={0}
                    height={0}
                  />
                </div>
              </div>
            </div> */}

            <UserAvatar name={user.username} imageUrl="/images/avt/1.jpg" />
            <div className="name text-center mt-8 fw-500">{user.username}U</div>
            <div className="rank flex gap-8 flex-center fz-10 flex-midle mt-16">
              Rank:
              <div>
                {/*.flex.gap-8.flex-midle
                .icon.sz-12
                	i.icon-silver
                .rank_silver (SILVER Gamer)
                */}
                {/*.flex.gap-8.flex-midle
                .icon.sz-12
                	i.icon-gold
                .rank_gold (GOLD Gamer)
                */}
                <div className="flex gapx-4 flex-midle">
                  <div className="icon sz-12">
                    <i className="icon-daimond" />
                  </div>
                  <div className="rank_daimond">(DAIMOND Gamer)</div>
                </div>
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
            <div className="row info_more fz-10 mt-12">
              <div className="col-4">
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
              <div className="col-4">
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
              <div className="col-4">
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
          <div className="list_menu">
            <ul>
              <li
                className="active"
                onClick={() => router.push(`/profile/${user.username}`)}
              >
                <span className="icon sz-16 icon-color-white">
                  <i className="icon-user" />
                </span>
                <span className="icon-color-white">Profile</span>
              </li>
              <li>
                <span className="icon sz-16 icon-color-white">
                  <i className="icon-cash" />
                </span>
                <span className="icon-color-white">Cash Games</span>
              </li>
              <li>
                <span className="icon sz-16 icon-color-white">
                  <i className="icon-points" />
                </span>
                <span className="icon-color-white">Points</span>
              </li>
              <li>
                <span className="icon sz-16 icon-color-red">
                  <i className="icon-logout" />
                </span>
                <LogoutButton>
                  <span className="icon-color-red">Logout</span>
                </LogoutButton>
              </li>
              {/* <li>
                <span className="icon sz-16 icon-color-red">
                  <i className="icon-remove_acc" />
                </span>
                <span className="icon-color-red">Remove account</span>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
