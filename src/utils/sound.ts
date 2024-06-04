import { PokerActions } from '@/types'
import sounds from '@/utils/contants/sound'

export const getGenderFromImageUrl = (imageUrl: string) => {
  const imageNumber = parseInt(
    imageUrl.replace('/images/avt/', '').replace('.jpg', '')
  )
  return imageNumber >= 1 && imageNumber <= 12 ? 'male' : 'female'
}

export const playSound = (action: PokerActions, gender: string) => {
  let soundUrl
  let playbackRate = 1.2
  switch (action) {
    case PokerActions.FOLD:
      soundUrl = gender === 'male' ? sounds.soundFoldBoy : sounds.soundFoldGirl
      break
    case PokerActions.CHECK:
      soundUrl =
        gender === 'male' ? sounds.soundCheckBoy : sounds.soundCheckGirl
      break
    case PokerActions.CALL:
      soundUrl = gender === 'male' ? sounds.soundCallBoy : sounds.soundCallGirl
      break
    case PokerActions.RAISE:
      soundUrl =
        gender === 'male' ? sounds.soundRaiseBoy : sounds.soundRaiseGirl
      // if (gender === 'female') playbackRate = 1.7
      // if (gender === 'male') playbackRate = 2
      break
    case PokerActions.QUARTER:
      soundUrl =
        gender === 'male' ? sounds.soundQuarterBoy : sounds.soundQuarterGirl
      // if (gender === 'female') playbackRate = 1
      // if (gender === 'male') playbackRate = 2
      break
    case PokerActions.HALF:
      soundUrl = gender === 'male' ? sounds.soundHalfBoy : sounds.soundHalfGirl
      // if (gender === 'female') playbackRate = 1
      break
    case PokerActions.FULL:
      soundUrl = gender === 'male' ? sounds.soundFullBoy : sounds.soundFullGirl
      // if (gender === 'female') playbackRate = 1
      break
    case PokerActions.ALLIN:
      soundUrl = gender === 'male' ? sounds.soundAllBoy : sounds.soundAllGirl
      // if (gender === 'female') playbackRate = 1
      break
    default:
      soundUrl = ''
  }

  const audio = new Audio(soundUrl)
  audio.playbackRate = playbackRate
  audio.volume = 1.0
  audio.play()
}
