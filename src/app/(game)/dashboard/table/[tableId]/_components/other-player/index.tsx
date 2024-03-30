import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Hand } from './hand'
import { UserAvatar } from '@/components/user-avatar'

interface OtherPlayerProps {
  type?: 'fold' | 'active' | 'default'
  showdown?: boolean
  imageUrlFirst: string
  imageUrlSecond: string
  isHandVisible?: boolean
}

export const OtherPlayer = ({
  type = 'default',
  showdown = false,
  imageUrlFirst,
  imageUrlSecond,
  isHandVisible,
}: OtherPlayerProps) => {
  return (
    <div
      className={cn(
        'group_user',
        type === 'active' && 'user_active',
        type === 'fold' && 'user_fold'
      )}
    >
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
            {type !== 'fold' ? (
              <Hand
                imageUrlFirst={imageUrlFirst}
                imageUrlSecond={imageUrlSecond}
                showdown={showdown}
                isHidden={!isHandVisible}
              />
            ) : (
              <div className="text_fold fw-900">FOLD</div>
            )}
          </div>
        </div>
        <div className="flex info_user">
          <div className="left sp_full">
            <div className="name text-center">OtherPlayer2012</div>
          </div>
          <div className="right sp_full">
            <div className="money fw-700">$ 1.500.324</div>
          </div>
        </div>
      </div>
    </div>
  )
}
