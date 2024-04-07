import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Hand } from './hand'
import { UserAvatar } from '@/components/user-avatar'
import { Participant, PlayerWithUser } from '@/types'
import { useEffect, useState } from 'react'

interface OtherPlayerProps {
  type?: 'fold' | 'active' | 'default'
  showdown?: boolean
  isHandVisible?: boolean
  player: PlayerWithUser
  participants: Participant[]
}

export const OtherPlayer = ({
  type = 'default',
  showdown = false,
  isHandVisible,
  player,
  participants,
}: OtherPlayerProps) => {
  const [imageUrlFirst, setImageUrlFirst] = useState('')
  const [imageUrlSecond, setImageUrlSecond] = useState('')

  useEffect(() => {
    if (Array.isArray(participants) && participants.length > 0) {
      const participant = participants.find(
        participant => participant.playerId === player.id
      )
      const imageUrlFirst = `/images/pocker/${participant?.cardOne.rank.toLocaleLowerCase()}_${participant?.cardOne.suit.toLocaleLowerCase()}.png`
      const imageUrlSecond = `/images/pocker/${participant?.cardTwo.rank.toLocaleLowerCase()}_${participant?.cardTwo.suit.toLocaleLowerCase()}.png`

      setImageUrlFirst(imageUrlFirst)
      setImageUrlSecond(imageUrlSecond)
    }
  }, [participants, player])

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
            <div className="name text-center">{player.user?.username}</div>
          </div>
          <div className="right sp_full">
            <div className="money fw-700">$ 1.500.324</div>
          </div>
        </div>
      </div>
    </div>
  )
}
