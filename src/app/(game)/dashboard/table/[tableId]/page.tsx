'use client'

import Image from 'next/image'
import { OtherPlayer } from './_components/other-player'
import { CurrentPlayer } from './_components/current-player'
import { Button } from '@/components/ui/button'
import { shuffle } from 'lodash'
import { Board } from './_components/board'
import { useState, useEffect, useRef, use, Suspense } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import SoundUrls from '@/utils/contants/sound'
import { Chat } from './_components/chat'
import { useParams } from 'next/navigation'
import { useOrigin } from '@/hooks/use-origin'

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a']
const suits = ['hearts', 'diamonds', 'clubes', 'spades']

const TablePage = () => {
  const [isChatBoxVisible, setChatBoxVisible] = useState(false)
  const [isHandVisible, setHandVisible] = useState(false)
  const [deck, setDeck] = useState([] as Array<{ suit: string; rank: string }>)
  const [pairs, setPairs] = useState(
    [] as Array<{ first: string; second: string }>
  )
  const [boardCards, setBoardCards] = useState([] as string[])
  const [isShuffle, setSuffle] = useState(false)
  const params = useParams()
  const origin = useOrigin()
  const handleChatButtonClick = () => {
    setChatBoxVisible(true)
  }

  const handleCloseChatClick = (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    setChatBoxVisible(false)
  }

  const createDeckAndShuffle = () => {
    let cards = [] as Array<{ suit: string; rank: string }>

    suits.forEach(suit => {
      ranks.forEach(rank => {
        cards.push({ suit, rank })
      })
    })

    for (let i = 0; i <= 7; i++) {
      cards = shuffle(cards)
    }

    return cards
  }

  const tableRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const dealerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const table = tableRef.current
    const players = wrapperRef.current?.getElementsByClassName('pocker_list')

    if (!table || !players) return

    const bounds = table.getBoundingClientRect()

    const cardWidth = 50
    const cardsHand = 2
    const dealX = bounds.width / 2 - cardWidth / 2
    const dealY = bounds.height
    const stackOffset = 15
    const offsetX = 0
    const offsetY = 0
    const positions = Array.from(players).map(playerPosition)
    const numPlayers = 10
    const totalCards = numPlayers * cardsHand
    let round = -1
    let zIndex = 0

    function playerPosition(element: Element) {
      const rect = element.getBoundingClientRect()
      return {
        x: rect.left - bounds.left + offsetX,
        y: rect.top - bounds.top + offsetY,
      }
    }

    function createCard(i: number) {
      const card = table?.ownerDocument.createElement('div')
      if (card) {
        card.className = 'player-card'
        card.textContent = i.toString()
        table?.appendChild(card)
      }
    }

    function cyclePosition(coord: 'x' | 'y', i: number) {
      i = i % numPlayers
      if (coord === 'x' && !i) round++

      return positions[i][coord] + round * stackOffset
    }

    if (isShuffle) {
      let i = totalCards
      while (i--) {
        createCard(i + 1)
      }

      new Audio(SoundUrls.soundShufle).play()

      gsap.set('.player-card', {
        x: dealX,
        y: dealY,
      })

      gsap.to('.player-card', {
        duration: 1,
        rotation: 360,
        x: (i: number) => cyclePosition('x', i),
        y: (i: number) => cyclePosition('y', i),
        zIndex: (i: number) => zIndex++,
        stagger: 0.03,
        onComplete: () => {
          setHandVisible(true)
          setSuffle(false)

          setTimeout(() => {
            const elements = document.querySelectorAll('.player-card')
            elements.forEach(element => {
              element?.parentNode?.removeChild(element)
            })
          }, 0)
        },
      })
    }
  }, [isShuffle])

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isShuffle) {
      init()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShuffle])

  const init = () => {
    const deck = createDeckAndShuffle()

    const cardsForPairing =
      deck.length % 2 === 0 ? deck : deck.slice(0, deck.length - 1)

    const pairs = []

    for (let i = 0; i < cardsForPairing.length; i += 2) {
      const card1 = cardsForPairing[i]
      const card2 = cardsForPairing[i + 1]

      pairs.push({
        first: `/images/pocker/${card1.rank}_${card1.suit}.png`,
        second: `/images/pocker/${card2.rank}_${card2.suit}.png`,
      })
    }

    const boardCards = pairs
      .slice(10)
      .reduce((items: string[], { first, second }) => {
        if (items.length >= 5) return items
        if (items.length === 4) return [...items, first]

        return [...items, first, second]
      }, [])

    setDeck(deck)
    setPairs(pairs)
    setBoardCards(boardCards)
  }

  const onSuffleClick = () => {
    setSuffle(true)
    setHandVisible(false)
  }

  if (!origin) return null

  if (!params?.tableId) return null

  return (
    <>
      <div className="absolute flex items-center gap-x-8  left-1/2 translate-x-[-50%] top-[25%] z-10">
        <Button
          className="px-[16px] py-[8px] text-white"
          variant="outline"
          onClick={onSuffleClick}
        >
          Suffle
        </Button>
      </div>
      <div className="wrapper" ref={wrapperRef}>
        <Image
          src="/images/table_v2.png"
          alt="tableImage"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
        <div className="inner">
          <div className="list_user" ref={tableRef}>
            <div className="dealer" ref={dealerRef}></div>

            <div className="wrap_list">
              {pairs.slice(0, 9).map(({ first, second }, index) => {
                return (
                  <OtherPlayer
                    key={index}
                    imageUrlFirst={first}
                    imageUrlSecond={second}
                    isHandVisible={isHandVisible}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <Board cards={boardCards} isShuffle={isShuffle} />
        <CurrentPlayer
          imageUrlFirst={pairs[9]?.first}
          imageUrlSecond={pairs[9]?.second}
          showdown
          isHandVisible={isHandVisible}
        />
      </div>
    </>
  )
}

export default TablePage
