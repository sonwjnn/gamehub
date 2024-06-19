import { ModalData, ModalType } from '@/store/use-modal-store'
import { Match, WinnerHandType } from '@/types'
import sounds from './contants/sound'

type Props = {
  match: Match | null
  onOpen: (type: ModalType, data?: ModalData) => void
  isWinner: boolean | undefined
}

const soundLose = new Audio(sounds.soundLose)
const soundStraight = new Audio(sounds.soundStraight)
const soundFlush = new Audio(sounds.soundFlush)
const soundFullHouse = new Audio(sounds.soundFullHouse)
const soundFourCards = new Audio(sounds.soundFourCards)
const soundStraightFlush = new Audio(sounds.soundStraightFlush)
const soundRoyalFlush = new Audio(sounds.soundRoyalFlush)
const soundTwoPair = new Audio(sounds.soundTwoPair)
const soundHighCard = new Audio(sounds.soundHighCard)
const soundPair = new Audio(sounds.soundPair)
const soundThreeCards = new Audio(sounds.soundThreeCards)
const soundWeakCongrats = new Audio(sounds.soundWeakCongrats)
const soundStrongCongrats = new Audio(sounds.soundStrongCongrats)

export const showModalByHandName = ({ match, onOpen, isWinner }: Props) => {
  const winMessages = match?.winMessages || []

  if (!winMessages.length) return

  const lastWinMessage = winMessages[winMessages.length - 1]

  const handName = lastWinMessage.handName

  if (!handName) return

  const handleSound = () => {
    if (!isWinner) {
      soundLose.play()
      return
    }

    switch (handName) {
      case WinnerHandType.Straight:
        soundStraight.play()
        soundStrongCongrats.play()
        break
      case WinnerHandType.Flush:
        soundFlush.play()
        soundStrongCongrats.play()
        break
      case WinnerHandType.FullHouse:
        soundFullHouse.play()
        soundStrongCongrats.play()
        break
      case WinnerHandType.FourOfAKind:
        soundFourCards.play()
        soundStrongCongrats.play()
        break
      case WinnerHandType.StraightFlush:
        soundStraightFlush.play()
        soundStrongCongrats.play()
        break
      case WinnerHandType.RoyalFlush:
        soundRoyalFlush.play()
        soundStrongCongrats.play()
        break
      case WinnerHandType.TwoPair:
        soundTwoPair.play()
        soundWeakCongrats.play()
        break
      case WinnerHandType.HighCard:
        soundHighCard.play()
        soundWeakCongrats.play()
        break
      case WinnerHandType.Pair:
        soundPair.play()
        soundWeakCongrats.play()
        break
      case WinnerHandType.ThreeOfAKind:
        soundThreeCards.play()
        soundWeakCongrats.play()
        break
      default:
        soundWeakCongrats.play()
    }
  }

  handleSound()

  switch (handName) {
    case WinnerHandType.Straight:
      return onOpen('straight')
    case WinnerHandType.Flush:
      return onOpen('flush')
    case WinnerHandType.FullHouse:
      return onOpen('fullHouse')
    case WinnerHandType.FourOfAKind:
      return onOpen('fourCard')
    case WinnerHandType.StraightFlush:
      return onOpen('straightFlush')
    case WinnerHandType.RoyalFlush:
      return onOpen('royalFlush')
    default:
      return onOpen('winDefault')
  }
}
