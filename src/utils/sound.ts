import { PokerActions } from '@/types'
import sounds from '@/utils/contants/sound'

export const getGenderFromImageUrl = (imageUrl: string) => {
  const imageNumber = parseInt(
    imageUrl.replace('/images/avt/', '').replace('.jpg', '')
  )
  return imageNumber >= 1 && imageNumber <= 6 ? 'male' : 'female'
}

export const playSound = (action: PokerActions, gender: string) => {
  let soundUrl
  let canNotPlaybackRate = 0
  switch (action) {
    case PokerActions.FOLD:
      canNotPlaybackRate = 1
      soundUrl = gender === 'male' ? sounds.soundFoldBoy : sounds.soundFoldGirl
      break
    case PokerActions.CHECK:
      soundUrl =
        gender === 'male' ? sounds.soundCheckBoy : sounds.soundCheckGirl
      break
    case PokerActions.CALL:
      canNotPlaybackRate = 1
      soundUrl = gender === 'male' ? sounds.soundCallBoy : sounds.soundCallGirl
      break
    case PokerActions.RAISE:
      soundUrl =
        gender === 'male' ? sounds.soundRaiseBoy : sounds.soundRaiseGirl
      break
    case PokerActions.QUARTER:
      soundUrl =
        gender === 'male' ? sounds.soundQuarterBoy : sounds.soundQuarterGirl
      break
    case PokerActions.HALF:
      soundUrl = gender === 'male' ? sounds.soundHalfBoy : sounds.soundHalfGirl
      break
    case PokerActions.FULL:
      canNotPlaybackRate = 1
      soundUrl = gender === 'male' ? sounds.soundFullBoy : sounds.soundFullGirl
      break
    case PokerActions.ALLIN:
      soundUrl = gender === 'male' ? sounds.soundAllBoy : sounds.soundAllGirl
      break
    default:
      soundUrl = ''
  }

  const audio = new Audio(soundUrl)
  if (!canNotPlaybackRate) {
    audio.playbackRate = 1.5
  }
  audio.play()
}
