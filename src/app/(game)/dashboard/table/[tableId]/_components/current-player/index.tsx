import Image from 'next/image'
import { Hand } from './hand'
import { UserAvatar } from '@/components/user-avatar'
import { CurrentPlayerAction } from './actions'

import { shuffle } from 'lodash'
import { useEffect, useState } from 'react'
import { Match, Participant, PlayerWithUser, PokerActions } from '@/types'
import { useSocket } from '@/providers/socket-provider'
import { cn } from '@/lib/utils'

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
  const [counter, setCounter] = useState(15)

  const currentParticipant = participants.find(
    item => item.playerId === player?.id
  )

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
    let timer: NodeJS.Timeout | null = null
    if (player?.isTurn && counter > 0) {
      timer = setInterval(() => {
        setCounter(counter - 1)
      }, 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [counter, player?.isTurn])

  useEffect(() => {
    if (player?.isTurn) {
      setCounter(15)
    }
  }, [player?.isTurn])

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    if (counter === 0 && player?.isTurn) {
      fold()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  const fold = () => {
    if (socket) {
      socket.emit(PokerActions.FOLD, {
        tableId,
        participantId: currentParticipant?.id,
      })
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
        <div className={cn('group_user', player?.isTurn && 'is-status')}>
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

              {player?.isTurn && (
                <div className="absolute top-0 right-0 text-[50px] text-white font-bold">
                  {counter}
                </div>
              )}

              <div className="status">
                <div className="wrap_status status_raise">
                  <svg viewBox="0 0 200 200">
                    <circle
                      className="circle"
                      cx="100"
                      cy="100"
                      r="95"
                      stroke="#231f20"
                      stroke-width="8"
                      fill-opacity="0"
                    ></circle>
                  </svg>
                  <span>라이즈</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {player?.isTurn && (
        <CurrentPlayerAction
          tableId={tableId}
          currentParticipant={currentParticipant}
        />
      )}
    </div>
  )
}
