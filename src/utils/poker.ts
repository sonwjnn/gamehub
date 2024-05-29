import { ModalData, ModalType } from '@/store/use-modal-store'
import { Match, WinnerHandType } from '@/types'

type Props = {
  match: Match | null
  onOpen: (type: ModalType, data?: ModalData) => void
}

export const showModalByHandName = ({ match, onOpen }: Props) => {
  const winMessages = match?.winMessages || []

  if (!winMessages.length) return

  const lastWinMessage = winMessages[winMessages.length - 1]

  const handName = lastWinMessage.handName

  if (!handName) return

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
