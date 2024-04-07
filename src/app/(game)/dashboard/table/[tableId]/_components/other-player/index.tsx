import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Hand } from './hand'
import { UserAvatar } from '@/components/user-avatar'
import { Participant, PlayerWithUser, PokerActions } from '@/types'
import { useEffect, useState } from 'react'
import { useSocket } from '@/providers/socket-provider'

interface OtherPlayerProps {
  type?: 'fold' | 'active' | 'default'
  showdown?: boolean
  isHandVisible?: boolean
  player: PlayerWithUser
  participants: Participant[]
  tableId: string
}

export const OtherPlayer = ({
  type = 'default',
  showdown = false,
  isHandVisible,
  player,
  participants,
  tableId,
}: OtherPlayerProps) => {
  const { socket } = useSocket()
  const [imageUrlFirst, setImageUrlFirst] = useState('')
  const [imageUrlSecond, setImageUrlSecond] = useState('')
  const [turn, setTurn] = useState<boolean>(false)
  const [counter, setCounter] = useState(2)

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

  useEffect(() => {
    if (player && turn !== player?.isTurn) {
      setTurn(player?.isTurn)
    }
    // eslint-disable-next-line
  }, [player?.isTurn])

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (turn && counter > 0) {
      timer = setInterval(() => setCounter(counter - 1), 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [counter, turn])

  useEffect(() => {
    if (counter === 0) {
      fold()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  const fold = () => {
    if (socket) {
      const currentParticipant = participants.find(
        item => item.playerId === player.id
      )

      socket.emit(PokerActions.FOLD, {
        tableId,
        participantId: currentParticipant?.id,
      })
    }
  }

  return (
    <div
      className={cn(
        'group_user',
        type === 'active' && 'user_active',
        type === 'fold' && 'user_fold',
        player.isTurn && 'is-status'
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

          {turn && (
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
  )
}
