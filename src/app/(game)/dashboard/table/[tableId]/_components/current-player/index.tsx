import Image from 'next/image'
import { Hand } from './hand'
import { UserAvatar } from '@/components/user-avatar'
import { CurrentPlayerAction } from './actions'

import { shuffle } from 'lodash'
import { useEffect, useState } from 'react'
import { Match, Participant, PlayerWithUser, PokerActions } from '@/types'
import { useSocket } from '@/providers/socket-provider'

interface CurrentPlayerProps {
  type?: 'fold' | 'active' | 'default'
  showdown?: boolean
  match: Match | null
  participants: Participant[]
  isHandVisible: boolean
  player: PlayerWithUser | undefined
  tableId: string
}

export const CurrentPlayer = ({
  type = 'default',
  match,
  showdown = false,
  participants,
  isHandVisible,
  player,
  tableId,
}: CurrentPlayerProps) => {
  const { socket } = useSocket()
  const [imageUrlFirst, setImageUrlFirst] = useState('')
  const [imageUrlSecond, setImageUrlSecond] = useState('')
  const [turn, setTurn] = useState<boolean>(false)
  const [turnTimeOutHandle, setHandle] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (Array.isArray(participants) && participants.length > 0) {
      const participant = participants.find(
        participant => participant.playerId === player?.id
      )
      const imageUrlFirst = `/images/pocker/${participant?.cardOne.rank.toLocaleLowerCase()}_${participant?.cardOne.suit.toLocaleLowerCase()}.png`
      const imageUrlSecond = `/images/pocker/${participant?.cardTwo.rank.toLocaleLowerCase()}_${participant?.cardTwo.suit.toLocaleLowerCase()}.png`

      setImageUrlFirst(imageUrlFirst)
      setImageUrlSecond(imageUrlSecond)
    }
  }, [participants, player])

  useEffect(() => {
    turn !== player?.isTurn && setTurn(player?.isTurn || false)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (turn && !turnTimeOutHandle) {
      const handle = setTimeout(fold, 15000)
      setHandle(handle)
    } else {
      turnTimeOutHandle && clearTimeout(turnTimeOutHandle)
      turnTimeOutHandle && setHandle(null)
    }
    // eslint-disable-next-line
  }, [turn])

  const fold = () => {
    if (socket) {
      socket.emit(PokerActions.FOLD, tableId)
    }
  }

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
                <div className="name text-center">{player?.user?.username}</div>
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
