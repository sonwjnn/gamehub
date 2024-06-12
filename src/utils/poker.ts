import { ModalData, ModalType } from '@/store/use-modal-store'
import { Match, WinnerHandType } from '@/types'
import sounds from './contants/sound'

type Props = {
  match: Match | null
  onOpen: (type: ModalType, data?: ModalData) => void
  isWinner: boolean | undefined
}

export const showModalByHandName = ({ match, onOpen, isWinner }: Props) => {
  const winMessages = match?.winMessages || []

  if (!winMessages.length) return

  const lastWinMessage = winMessages[winMessages.length - 1]

  const handName = lastWinMessage.handName

  if (!handName) return

  const handleSound = () => {
    if (!isWinner) {
      new Audio(sounds.soundLose).play()
      return
    }

    switch (handName) {
      case WinnerHandType.Straight:
        new Audio(sounds.soundStraight).play()
        new Audio(sounds.soundStrongCongrats).play()
        break
      case WinnerHandType.Flush:
        new Audio(sounds.soundFlush).play()
        new Audio(sounds.soundStrongCongrats).play()
        break
      case WinnerHandType.FullHouse:
        new Audio(sounds.soundFullHouse).play()
        new Audio(sounds.soundStrongCongrats).play()
        break
      case WinnerHandType.FourOfAKind:
        new Audio(sounds.soundFourCards).play()
        new Audio(sounds.soundStrongCongrats).play()
        break
      case WinnerHandType.StraightFlush:
        new Audio(sounds.soundStraightFlush).play()
        new Audio(sounds.soundStrongCongrats).play()
        break
      case WinnerHandType.RoyalFlush:
        new Audio(sounds.soundRoyalFlush).play()
        new Audio(sounds.soundStrongCongrats).play()
        break
      case WinnerHandType.TwoPair:
        new Audio(sounds.soundTwoPair).play()
        new Audio(sounds.soundWeakCongrats).play()
        break
      case WinnerHandType.HighCard:
        new Audio(sounds.soundHighCard).play()
        new Audio(sounds.soundWeakCongrats).play()
        break
      case WinnerHandType.Pair:
        new Audio(sounds.soundPair).play()
        new Audio(sounds.soundWeakCongrats).play()
        break
      case WinnerHandType.ThreeOfAKind:
        new Audio(sounds.soundThreeCards).play()
        new Audio(sounds.soundWeakCongrats).play()
        break
      default:
        new Audio(sounds.soundWeakCongrats).play()
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
