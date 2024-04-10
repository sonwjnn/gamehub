import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Hand } from './hand'
import { UserAvatar } from '@/components/user-avatar'
import { Match, Participant, PlayerWithUser, PokerActions } from '@/types'
import { useEffect, useState } from 'react'
import { useSocket } from '@/providers/socket-provider'

interface OtherPlayerProps {
  type?: 'fold' | 'active' | 'default'
  isHandVisible?: boolean
  match: Match | null
  player: PlayerWithUser
  participants: Participant[]
  tableId: string
}

export const OtherPlayer = ({
  type = 'default',
  isHandVisible,
  player,
  match,
  participants,
  tableId,
}: OtherPlayerProps) => {
  const { socket } = useSocket()
  const [imageUrlFirst, setImageUrlFirst] = useState('')
  const [imageUrlSecond, setImageUrlSecond] = useState('')
  const [counter, setCounter] = useState(15)

  const currentParticipant = participants.find(
    item => item.playerId === player?.id
  )
  const isFolded = currentParticipant?.isFolded
  const isWinner = !isFolded && match?.winnerId === player?.id
  const isTurn = !isFolded && player?.isTurn

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
    let timer: NodeJS.Timeout | null = null
    if (isTurn && counter > 0) {
      timer = setInterval(() => {
        setCounter(counter - 1)
      }, 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [counter, player, isTurn])

  useEffect(() => {
    if (isTurn) {
      setCounter(15)
    }
  }, [isTurn])

  useEffect(() => {
    if (counter === 0 && isTurn) {
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

  console.log(currentParticipant)

  return (
    <div
      className={cn(
        'group_user',
        (isTurn || isWinner) && 'user_active',
        isFolded && 'user_fold',
        isTurn && 'is-status'
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
            {!isFolded ? (
              <Hand
                imageUrlFirst={imageUrlFirst}
                imageUrlSecond={imageUrlSecond}
                isShowdown={match?.isShowdown}
                isHidden={!isHandVisible}
              />
            ) : (
              <div className="text_fold fw-900">FOLD</div>
            )}
          </div>
        </div>
        <div className="flex info_user">
          <div className="left sp_full">
            <div className="name text-center text-sm font-semibold">
              {player.user?.username}
            </div>
          </div>
          <div className="right sp_full">
            <div className="money fw-700">$ 1.500.324</div>
          </div>

          {isWinner && (
            <div className="status status_win !opacity-100">
              <Image
                src="/images/status_win.png"
                alt="pokerOnImage"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: 'auto', height: '100%' }}
              />
            </div>
          )}

          {isFolded && (
            <div className="status">
              <div className="wrap_status status_full">
                <svg viewBox="0 0 200 200">
                  <circle
                    className="circle"
                    cx="100"
                    cy="100"
                    r="95"
                    stroke="#231f20"
                    stroke-width="8"
                    fill-opacity="0"
                  />
                </svg>
                <span>풀</span>
              </div>
            </div>
          )}

          {isTurn && (
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
