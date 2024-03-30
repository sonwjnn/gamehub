'use client'

import Image from 'next/image'
import { OtherPlayer } from './_components/other-player'
import { CurrentPlayer } from './_components/current-player'
import { cn } from '@/lib/utils'
import { useModal } from '@/store/use-modal-store'
import { Button } from '@/components/ui/button'
import { shuffle } from 'lodash'
import { Board } from './_components/board'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import SoundUrls from '@/utils/contants/sound'

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a']
const suits = ['hearts', 'diamonds', 'clubes', 'spades']

const TablePage = () => {
  const [isChatBoxVisible, setChatBoxVisible] = useState(false)
  const [isHandVisible, setHandVisible] = useState(false)

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
    const wrapper = wrapperRef.current
    const dealer = dealerRef.current
    const players = wrapperRef.current?.getElementsByClassName('pocker_list')

    if (!table || !players) return

    const bounds = table.getBoundingClientRect()

    const cardWidth = 50
    const cardsHand = 2
    const dealX = bounds.width / 2 - cardWidth / 2
    const dealY = 0
    const stackOffset = 15
    const offsetX = 0
    const offsetY = -bounds.height
    const positions = Array.from(players).map(playerPosition)
    const numPlayers = players.length
    const totalCards = numPlayers * cardsHand
    let round = -1
    let zIndex = 0

    let i = 10
    while (i--) {
      createCard(i + 1)
    }

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
        table?.appendChild(card)
      }
    }

    gsap.set('.player-card', {
      x: dealX,
      y: dealY,
    })

    function cyclePosition(coord: 'x' | 'y', i: number) {
      i = i % numPlayers
      if (coord === 'x' && !i) round++
      const sound = new Audio(SoundUrls.soundShufle)

      return positions[i][coord] + round * stackOffset
    }

    gsap.to('.player-card', {
      duration: 1,
      rotation: 360,
      x: (i: number) => cyclePosition('x', i),
      y: (i: number) => cyclePosition('y', i),
      zIndex: (i: number) => zIndex++,
      stagger: 0.03,
      onComplete: () => {
        gsap.to('.player-card', {
          autoAlpha: 0,
          delay: 0,
        })

        setHandVisible(true)
      },
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

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

  return (
    <>
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
        <Board cards={boardCards} />
        <CurrentPlayer
          imageUrlFirst={pairs[9].first}
          imageUrlSecond={pairs[9].second}
          showdown
          isHandVisible={isHandVisible}
        />
      </div>
      <div className="group_chat">
        <div
          className={cn('chat_box', isChatBoxVisible && 'is-show')}
          id="chat_box"
          onClick={handleCloseChatClick}
        >
          <div className="btn_close icon sz-24" id="close_chat">
            <i className="icon-down"></i>
          </div>
          <div className="body">
            <div className="wrap scrollbar">
              <div className="chat_item">
                <div className="name">Player2012:</div>
                <div className="des">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  odio mauris, interdum id ultrices et,
                </div>
                <div className="time">2:05 p.m</div>
              </div>
              <div className="chat_item">
                <div className="name">Player2012:</div>
                <div className="des">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  odio mauris, interdum id ultrices et,
                </div>
                <div className="time">2:05 p.m</div>
              </div>
              <div className="chat_item me">
                <div className="name">Player2012:</div>
                <div className="des">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  odio mauris, interdum id ultrices et,
                </div>
                <div className="time">2:05 p.m</div>
              </div>
            </div>
          </div>
          <div className="footer">
            <div
              className="textarea_custom scrollbar"
              contentEditable="true"
              aria-placeholder="Typing here..."
            ></div>
            <div className="btn_send">
              <span className="icon sz-24">
                <i className="icon-send"></i>
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={handleChatButtonClick}
          className={cn('btn_chat', isChatBoxVisible && 'is-hide')}
          id="btn_chat"
        >
          <div className="icon sz-24">
            <i className="icon-chat"></i>
          </div>
          <span>Chat</span>
        </div>
      </div>
    </>
  )
}

export default TablePage
