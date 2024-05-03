'use client'

import '@/styles/custom.css'
import { HighlyCoins } from './highly-coins'
import { MinCoins } from './min-coins'
import { MediumCoins } from './medium-coins'
import { HighCoins } from './high-coins'
import { formatChipsAmount } from '@/utils/formatting'
import { useEffect } from 'react'
import sounds from '@/utils/contants/sound'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useAudio } from 'react-use'

interface CoinBetProps {
  bet: number
}
const formatBet = (bet: number) => {
  return bet >= 1000 ? `${bet / 1000}K` : bet
}

export const CoinBet = ({ bet }: CoinBetProps) => {
  const [audio, _, controls] = useAudio({
    src: sounds.soundCoin,
    autoPlay: false,
  })

  useEffect(() => {
    if (bet > 0) {
      controls.volume(0.5)
      controls.play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bet])

  useGSAP(() => {
    gsap.from('.coins1', {
      y: -100,
      delay: 0,
      ease: 'bounce.out',
      opacity: 0,
      stagger: 0.1,
    })
    gsap.from('.coins2', {
      y: -100,
      delay: 0.5,
      ease: 'bounce.out',
      opacity: 0,
      stagger: 0.2,
    })
    gsap.from('.coins3', {
      y: -100,
      delay: 0,
      ease: 'bounce.out',
      opacity: 0,
      stagger: 0.2,
    })
    gsap.from('.coins4', {
      y: -100,
      delay: 0.1,
      ease: 'bounce.out',
      opacity: 0,
      stagger: 0.1,
    })
  }, [])

  if (bet === 0) return null

  return (
    <div className="coin_bet">
      {audio}
      <span className="number">${formatChipsAmount(bet)}$</span>
      <svg className="svg-coins" viewBox="0 0 352.4 356.7">
        {/* <HighlyCoins /> */}
        {/* <HighCoins /> */}
        <MediumCoins />
        <MinCoins />
      </svg>
    </div>
  )
}
