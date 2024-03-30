import Image from 'next/image'
import { Hand } from './hand'
import { UserAvatar } from '@/components/user-avatar'
import { CurrentPlayerAction } from './actions'

import { shuffle } from 'lodash'
import { useEffect } from 'react'

interface CurrentPlayerProps {
  type?: 'fold' | 'active' | 'default'
  showdown?: boolean
  imageUrlFirst: string
  imageUrlSecond: string
  isHandVisible: boolean
}

export const CurrentPlayer = ({
  type = 'default',
  showdown = false,
  imageUrlFirst = '/images/pocker_on.png',
  imageUrlSecond = '/images/pocker_on.png',
  isHandVisible,
}: CurrentPlayerProps) => {
  const ranks = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'j',
    'q',
    'k',
    'a',
  ]

  // const imageUrlFirst = `/images/pocker/${randomRank}_of_${randomSuit}.png`

  return (
    <div className="group_tool flex flex-space gap-12">
      <div className="group_flush">
        <div className="ttl">
          <span>ROYAL FLUSH</span>
        </div>
        <div className="content flex flex-midle gap-8 flex-center">
          <div className="star">
            <Image
              src="/images/star.png"
              alt="starImage"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className="btn_detail">Detail</div>
        </div>
      </div>
      <div className="group_left">
        <div className="group_user">
          <div className="wrap">
            <div className="flex flex-midle">
              <div className="left">
                <div className="avatar">
                  <div className="imgDrop ratio_1_1">
                    <UserAvatar
                      className="absolute inset-0"
                      imageUrl="/images/avatar.png"
                      name="user"
                    />
                  </div>
                </div>
              </div>
              <div className="right">
                <Hand
                  imageUrlFirst={imageUrlFirst}
                  imageUrlSecond={imageUrlSecond}
                  isHidden={!isHandVisible}
                />
              </div>
            </div>
            <div className="flex info_user">
              <div className="left sp_full">
                <div className="name text-center">Player2012</div>
              </div>
              <div className="right sp_full">
                <div className="money fw-700">$ 1.500.324</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CurrentPlayerAction />
    </div>
  )
}
