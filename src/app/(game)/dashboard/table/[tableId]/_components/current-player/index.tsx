import Image from 'next/image'
import { Hand } from './hand'
import { UserAvatar } from '@/components/user-avatar'
import { CurrentPlayerAction } from './actions'

import { useEffect, useState } from 'react'
import { Match, Participant, PlayerWithUser, PokerActions } from '@/types'
import { useSocket } from '@/providers/socket-provider'
import { cn } from '@/lib/utils'
import { formatChipsAmount } from '@/utils/formatting'

interface CurrentPlayerProps {
  type?: 'fold' | 'active' | 'default'
  isShowdown?: boolean
  match: Match | null
  participants: Participant[]
  isHandVisible: boolean
  player: PlayerWithUser | undefined
  tableId: string
}

export const CurrentPlayer = ({
  type = 'default',
  match,
  participants,
  isHandVisible,
  player,
  tableId,
}: CurrentPlayerProps) => {
  const { socket } = useSocket()
  const [imageUrlFirst, setImageUrlFirst] = useState('')
  const [imageUrlSecond, setImageUrlSecond] = useState('')
  const [counter, setCounter] = useState(15)
  const [bet, setBet] = useState(0)

  const currentParticipant = participants.find(
    item => item.playerId === player?.id
  )

  const isFolded = currentParticipant?.isFolded
  const isWinner = !isFolded && match?.winnerId === player?.id
  const isTurn = !isFolded && player?.isTurn
  const chipsAmount =
    currentParticipant?.player?.user?.chipsAmount ||
    player?.user?.chipsAmount ||
    0

  useEffect(() => {
    if (
      currentParticipant &&
      currentParticipant.cardOne &&
      currentParticipant.cardTwo
    ) {
      const imageUrlFirst = `/images/pocker/${currentParticipant.cardOne?.rank.toLocaleLowerCase()}_${currentParticipant.cardOne?.suit.toLocaleLowerCase()}.png`
      const imageUrlSecond = `/images/pocker/${currentParticipant.cardTwo?.rank.toLocaleLowerCase()}_${currentParticipant.cardTwo?.suit.toLocaleLowerCase()}.png`

      setImageUrlFirst(imageUrlFirst)
      setImageUrlSecond(imageUrlSecond)
    } else {
      setImageUrlFirst('')
      setImageUrlSecond('')
    }
  }, [participants, player, currentParticipant])

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
  }, [counter, isTurn])

  useEffect(() => {
    if (isTurn) {
      setCounter(15)
    }
  }, [isTurn])

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
    if (counter === 0 && isTurn) {
      fold()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  useEffect(() => {
    if (match) {
      match.callAmount > match.minBet
        ? setBet(match.callAmount)
        : match.pot > 0
          ? setBet(match.minRaise)
          : setBet(match.minBet)
    }
  }, [match])

  const fold = () => {
    if (socket) {
      socket.emit(PokerActions.FOLD, {
        tableId,
        participantId: currentParticipant?.id,
      })
    }
  }

  return (
    <div
      className={cn(
        'group_tool flex flex-space gap-12',
        (isWinner || isTurn) && 'user_active',
        isFolded && 'user_fold'
      )}
    >
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
              className="w-full h-auto"
            />
          </div>
          <div className="btn_detail">Detail</div>
        </div>
      </div>
      <div className="group_left">
        <div
          className={cn(
            'group_user before:border-none',
            player?.isTurn && 'is-status'
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
                  {player?.user?.username}
                </div>
              </div>
              <div className="right sp_full">
                <div className="money fw-700">
                  $ {formatChipsAmount(chipsAmount)}
                </div>
              </div>

              {isWinner && (
                <div className="status status_win !opacity-100">
                  <Image
                    src="/images/status_win.png"
                    alt="pokerOnImage"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-full"
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
                        strokeWidth="8"
                        fillOpacity="0"
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
                      strokeWidth="8"
                      fillOpacity="0"
                    ></circle>
                  </svg>
                  <span>라이즈</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isTurn && (
        <CurrentPlayerAction
          player={player}
          bet={bet}
          setBet={setBet}
          match={match}
          tableId={tableId}
          currentParticipant={currentParticipant}
        />
      )}
    </div>
  )
}
