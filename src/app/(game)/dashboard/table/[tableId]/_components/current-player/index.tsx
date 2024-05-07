'use client'

import Image from 'next/image'
import { Hand } from './hand'
import { CurrentPlayerAction } from './actions'

import { useEffect, useState } from 'react'
import { Match, Participant, PlayerWithUser, PokerActions } from '@/types'
import { useSocket } from '@/providers/socket-provider'
import { cn } from '@/lib/utils'
import { formatChipsAmount } from '@/utils/formatting'
import sounds from '@/utils/contants/sound'
import { useIsWinner } from '@/store/use-is-winner'
import playerApi from '@/services/api/modules/player-api'
import { useRouter } from 'next/navigation'
import { CoinBet } from '@/components/coin-bet'
import { getGenderFromImageUrl, playSound } from '@/utils/sound'
import { useAudio } from 'react-use'

interface CurrentPlayerProps {
  isShowdown?: boolean
  match: Match | null
  participants: Participant[]
  isHandVisible: boolean
  player: PlayerWithUser | undefined
  tableId: string
}

export const CurrentPlayer = ({
  match,
  participants,
  isHandVisible,
  player,
  tableId,
}: CurrentPlayerProps) => {
  const { socket } = useSocket()
  const router = useRouter()
  const { setIsWinner } = useIsWinner()
  const [imageUrlFirst, setImageUrlFirst] = useState('')
  const [imageUrlSecond, setImageUrlSecond] = useState('')
  const [isAction, setIsAction] = useState(false)
  const [counter, setCounter] = useState(12)
  const [bet, setBet] = useState(0)
  const [countdownSrcAudio, _, controls, ref] = useAudio({
    src: sounds.soundCountdown,
    autoPlay: false,
  })

  const gender = getGenderFromImageUrl(player?.user?.image || '')
  const currentParticipant = participants.find(
    item => item.playerId === player?.id
  )

  const isFolded = currentParticipant?.isFolded
  const isHaveWinner = match?.winnerId
  const isWinner = !isFolded && match?.winnerId === player?.id
  const isTurn = !isFolded && player?.isTurn
  const isShowdown = match?.isShowdown
  const isUnfoldedParticipant = currentParticipant?.isFolded ? false : true

  const isWaiting = match && !match?.table.isHandOver && !currentParticipant

  const currentStack = player?.stack || 0

  const currentBet = currentParticipant?.bet || 0

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
    if (isTurn && counter > 0 && !isAction) {
      timer = setInterval(() => {
        setCounter(counter - 1)
      }, 1000)
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [counter, isTurn, isAction])

  useEffect(() => {
    if (!isTurn) {
      setCounter(12)
    }
  }, [isTurn])

  useEffect(() => {
    if (isTurn && counter === 5) {
      controls.play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTurn, counter])

  useEffect(() => {
    if (isAction || counter === 2) {
      controls.pause()
      if (ref.current) {
        ref.current.currentTime = 0
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAction, counter, ref])

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

  useEffect(() => {
    if (isHaveWinner && !isWinner && currentParticipant) {
      new Audio(sounds.soundLose).play()
    }
  }, [isWinner, isHaveWinner, currentParticipant])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    if (currentParticipant?.lastAction === PokerActions.WINNER && isWinner) {
      new Audio(sounds.soundWin).play()
      setIsWinner(true)

      timeoutId = setTimeout(() => {
        setIsWinner(false)
      }, 5000)
    } else {
      setIsWinner(false)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWinner])

  const removePlayer = async () => {
    try {
      if (!player) return
      const { response, error } = await playerApi.removePlayer({
        playerId: player?.id,
        tableId: tableId,
      })

      if (error) {
        console.log(error)
      }

      router.push('/dashboard/table')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (player && player?.stack <= 0 && isHaveWinner) {
      timer = setTimeout(() => {
        removePlayer()
      }, 5000)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStack, isHaveWinner])

  const fold = () => {
    if (socket) {
      playSound(PokerActions.FOLD, gender)
      socket.emit(PokerActions.FOLD, {
        tableId,
        participantId: currentParticipant?.id,
      })
    }
  }

  return (
    <div
      className={cn(
        'group_tool flex flex-space gap-12 before:border-none',
        (isTurn || (isWinner && isHaveWinner)) && 'user_active',
        isFolded && 'user_fold',
        !isWinner && isHaveWinner && currentParticipant && 'is-lose'
      )}
    >
      {countdownSrcAudio}
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
            isTurn && 'is-status',
            isWaiting && 'user_waitting',
            isShowdown && isUnfoldedParticipant && 'target_showdown'
          )}
        >
          <CoinBet bet={currentBet} />

          <div className="wrap">
            <div className="flex flex-midle">
              <div className="left">
                <div className="avatar sz-36">
                  <div className="images">
                    <div className="imgDrop ratio_1_1">
                      <Image
                        src={player?.user?.image || '/images/avt/1.jpg'}
                        alt="image alt"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-auto h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                {!isWaiting && !isFolded && (
                  <Hand
                    imageUrlFirst={imageUrlFirst}
                    imageUrlSecond={imageUrlSecond}
                    isHidden={!isHandVisible}
                  />
                )}
                {!isWaiting && isFolded && (
                  <div className="text_fold fw-900">FOLD</div>
                )}
                {isWaiting && (
                  <div className="text_waiting fw-700 text-up">
                    waiting...
                    <div className="spinner space-x-0.5">
                      <div className="rect1"></div>
                      <div className="rect2"></div>
                      <div className="rect3"></div>
                      <div className="rect4"></div>
                      <div className="rect5"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex info_user">
              <div className="left sp_full">
                <div className="name text-center ">
                  {player?.user?.username}
                </div>
              </div>

              <div className="right sp_full">
                <div className="money fw-700 flex flex-midle flex-center">
                  <div className="icon sz-12 mr-4">
                    <i className="icon-coin"></i>
                  </div>
                  $ {formatChipsAmount(currentStack)}
                </div>
              </div>

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
                <div className="status">
                  <div className="wrap_status status_countdown">
                    <svg viewBox="0 0 200 200">
                      <circle
                        className="circle !animate-[stroke_17s_ease-out_forwards]"
                        cx="100"
                        cy="100"
                        r="95"
                        stroke="#231f20"
                        stroke-width="8"
                        fill-opacity="0"
                      ></circle>
                    </svg>
                    <span>{counter - 2 >= 0 ? counter - 2 : 0}s</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CurrentPlayerAction
        isTurn={isTurn}
        player={player}
        bet={bet}
        setIsAction={setIsAction}
        setBet={setBet}
        match={match}
        tableId={tableId}
        currentParticipant={currentParticipant}
      />
    </div>
  )
}
