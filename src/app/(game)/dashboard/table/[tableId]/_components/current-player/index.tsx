'use client'

import Image from 'next/image'
import { Hand } from './hand'
import { CurrentPlayerAction } from './actions'

import { useEffect, useState } from 'react'
import {
  HighlightCard,
  Match,
  Participant,
  PlayerWithUser,
  PokerActions,
} from '@/types'
import { useSocket } from '@/providers/socket-provider'
import { cn } from '@/lib/utils'
import { formatChipsAmount, getStarRating } from '@/utils/formatting'
import sounds from '@/utils/contants/sound'
import playerApi from '@/services/api/modules/player-api'
import { useRouter } from 'next/navigation'
import { CoinBet } from '@/components/coin-bet'
import { getGenderFromImageUrl, playSound } from '@/utils/sound'
import { useAudio } from 'react-use'
import { useModal } from '@/store/use-modal-store'
import { ReviewStars } from './review-stars'
import { CoinAnimate } from '@/components/coin-animate'
import { showModalByHandName } from '@/utils/poker'
import { RebuyButton } from '@/components/rebuy-button'
import { useAutoRebuy } from '@/store/use-auto-rebuy'

interface CurrentPlayerProps {
  isShowdown?: boolean
  match: Match | null
  participants: Participant[]
  isHandVisible: boolean
  player: PlayerWithUser | undefined
  tableId: string
  highlightCards?: HighlightCard
}

export const CurrentPlayer = ({
  match,
  participants,
  isHandVisible,
  player,
  tableId,
  highlightCards,
}: CurrentPlayerProps) => {
  const { socket } = useSocket()
  const { onOpen } = useModal()
  const { isAutoRebuy, autoRebuyAmount, setAutoRebuy } = useAutoRebuy()

  const router = useRouter()
  const [imageUrlFirst, setImageUrlFirst] = useState('')
  const [imageUrlSecond, setImageUrlSecond] = useState('')
  const [isAction, setIsAction] = useState(false)
  const [counter, setCounter] = useState(12)
  const [bet, setBet] = useState(0)
  const [stars, setStars] = useState(0)
  const [countdownSrcAudio, _, controls, ref] = useAudio({
    src: sounds.soundCountdown,
    autoPlay: false,
  })
  const [isBet, setIsBet] = useState(false)
  const [winnerDelay, setWinnerDelay] = useState(false)
  const [foldCount, setFoldCount] = useState(0)
  const [callRaiseMissing, setCallRaiseMissing] = useState(0)

  const gender = getGenderFromImageUrl(player?.user?.image || '')
  const currentParticipant = participants.find(
    item => item.playerId === player?.id
  )

  const isFolded = currentParticipant?.isFolded
  const isHaveWinner = (match?.winners?.length ?? 0) > 0
  const isWinner = !isFolded && match?.winners?.some(w => w.id === player?.id)
  const isTurn = !isFolded && player?.isTurn
  const isShowdown = match?.isShowdown
  const isUnfoldedParticipant = currentParticipant?.isFolded ? false : true

  const canKick =
    !isAutoRebuy &&
    !autoRebuyAmount &&
    ((player && player?.stack <= 0 && isHaveWinner) ||
      (player &&
        match?.minBet &&
        player?.stack + match?.minBet - match.table.ante < 0 &&
        isHaveWinner) ||
      foldCount >= 2)

  const canShowHand = match && isWinner && !match.isShowdown

  const isWaiting = match && !match?.table.isHandOver && !currentParticipant
  const currentStack = player?.stack || 0
  const currentBet = currentParticipant?.bet || 0
  const currentPot = match?.pot || 0

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
      const stars = getStarRating(
        `${currentParticipant?.cardOne?.rank}_${currentParticipant?.cardOne?.suit}`,
        `${currentParticipant?.cardTwo?.rank}_${currentParticipant?.cardTwo?.suit}`
      )

      setStars(stars)
    } else {
      setImageUrlFirst('')
      setImageUrlSecond('')
      setStars
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (isAction) {
      setFoldCount(0)
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
      setFoldCount(prev => prev + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  useEffect(() => {
    if (match) {
      if (match.callAmount > match.minBet) {
        setBet(match.callAmount)
      } else if (match.pot > 0) {
        setBet(match.minRaise)
      } else {
        setBet(match.minBet)
      }
    }
  }, [match])

  useEffect(() => {
    if (isWinner) {
      const timeoutId = setTimeout(() => {
        setWinnerDelay(true)
      }, 2000)

      return () => clearTimeout(timeoutId)
    } else {
      setWinnerDelay(false)
    }
  }, [isWinner])

  useEffect(() => {
    if (currentParticipant && !currentParticipant.isFolded && isHaveWinner) {
      const timeoutId = setTimeout(() => {
        showModalByHandName({ match, onOpen, isWinner })
      }, 2000)

      return () => clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHaveWinner])

  useEffect(() => {
    if (canKick) {
      const timer = setTimeout(() => {
        removePlayer()
      }, 4000)

      return () => clearTimeout(timer)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canKick])

  useEffect(() => {
    if (currentBet) {
      setIsBet(true)
      const timer = setTimeout(() => {
        setIsBet(false)
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      setIsBet(false)
    }
  }, [currentBet])

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
      setAutoRebuy({ isAutoRebuy: false, autoRebuyAmount: 0 })
      router.push('/dashboard/table')
    } catch (error) {
      console.log(error)
    }
  }

  const fold = () => {
    if (socket) {
      playSound(PokerActions.FOLD, gender)
      socket.emit(PokerActions.FOLD, {
        tableId,
        participantId: currentParticipant?.id,
      })
    }
  }

  const showHand = () => {
    if (socket && canShowHand) {
      socket.emit(PokerActions.SHOW_HAND, {
        tableId,
        playerId: player?.id,
      })
    }
  }

  const hasFirstHighlight = highlightCards?.cards.some(item => {
    return (
      item.rank === currentParticipant?.cardOne?.rank &&
      item.suit === currentParticipant?.cardOne?.suit
    )
  })

  const hasSecondHighlight = highlightCards?.cards.some(item => {
    return (
      item.rank === currentParticipant?.cardTwo?.rank &&
      item.suit === currentParticipant?.cardTwo?.suit
    )
  })

  return (
    <div
      className={cn(
        'group_tool flex flex-space gap-12 before:border-none',
        (isTurn || (winnerDelay && isHaveWinner)) && 'user_active',
        !winnerDelay && isHaveWinner && currentParticipant && 'is-lose'
      )}
    >
      {countdownSrcAudio}
      <div className="group_flush">
        <div className="ttl">
          <span>{highlightCards?.name || ''}</span>
        </div>

        <div className="content flex flex-midle gap-8 flex-center">
          <div className="star" onClick={() => onOpen('feeling')}>
            <ReviewStars stars={stars} />
          </div>
          <div className="btn_detail" onClick={() => onOpen('quality')}>
            Detail
          </div>
        </div>
      </div>
      <div className="group_left">
        <div
          className={cn(
            'group_user before:border-none',
            isTurn && 'is-status',
            isWaiting && 'user_waitting',
            isShowdown && isUnfoldedParticipant && 'target_showdown',
            isFolded && 'user_fold'
          )}
        >
          <CoinBet
            className="coin_bet_current"
            bet={currentBet}
            pot={currentPot}
          />

          {match?.smallBlindId === player?.id && (
            <div className="slind slind_small">
              <div className="box">
                <span>SB</span>
              </div>
            </div>
          )}

          {match?.bigBlindId === player?.id && (
            <div className="slind slind_big">
              <div className="box">
                <span>BB</span>
              </div>
            </div>
          )}

          <div className="wrap">
            <div className="flex flex-midle">
              <div className="left">
                {isBet && <CoinAnimate />}
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
                {!isWaiting && (
                  <Hand
                    onClick={showHand}
                    imageUrlFirst={imageUrlFirst}
                    imageUrlSecond={imageUrlSecond}
                    isHidden={!isHandVisible}
                    hasFirstHighlight={hasFirstHighlight}
                    hasSecondHighlight={hasSecondHighlight}
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
                <div className="name text-center ">{player?.user?.name}</div>
              </div>

              <div className="right sp_full">
                <div className="money fw-700 flex flex-midle flex-center">
                  <div className="icon sz-12 mr-4">
                    <i className="icon-coin"></i>
                  </div>
                  $ {formatChipsAmount(currentStack)}
                </div>
                <RebuyButton tableId={tableId} />
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
                    <span className="sub">풀</span>
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
                    <span className="sub">
                      {counter - 2 >= 0 ? counter - 2 : 0}s
                    </span>
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
        setCallRaiseMissing={setCallRaiseMissing}
      />
    </div>
  )
}
