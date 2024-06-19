import { PokerActions } from '@/types'
import sounds from '@/utils/contants/sound'

const soundFoldBoy = new Audio(sounds.soundFoldBoy)
const soundFoldGirl = new Audio(sounds.soundFoldGirl)
const soundCheckBoy = new Audio(sounds.soundCheckBoy)
const soundCheckGirl = new Audio(sounds.soundCheckGirl)
const soundCallBoy = new Audio(sounds.soundCallBoy)
const soundCallGirl = new Audio(sounds.soundCallGirl)
const soundRaiseBoy = new Audio(sounds.soundRaiseBoy)
const soundRaiseGirl = new Audio(sounds.soundRaiseGirl)
const soundQuarterBoy = new Audio(sounds.soundQuarterBoy)
const soundQuarterGirl = new Audio(sounds.soundQuarterGirl)
const soundHalfBoy = new Audio(sounds.soundHalfBoy)
const soundHalfGirl = new Audio(sounds.soundHalfGirl)
const soundFullBoy = new Audio(sounds.soundFullBoy)
const soundFullGirl = new Audio(sounds.soundFullGirl)
const soundAllBoy = new Audio(sounds.soundAllBoy)
const soundAllGirl = new Audio(sounds.soundAllGirl)

export const getGenderFromImageUrl = (imageUrl: string) => {
  const imageNumber = parseInt(
    imageUrl.replace('/images/avt/', '').replace('.jpg', '')
  )
  return imageNumber >= 1 && imageNumber <= 12 ? 'male' : 'female'
}

export const playSound = (action: PokerActions, gender: string) => {
  let sound
  let playbackRate = 1.2
  switch (action) {
    case PokerActions.FOLD:
      sound = gender === 'male' ? soundFoldBoy : soundFoldGirl
      break
    case PokerActions.CHECK:
      sound = gender === 'male' ? soundCheckBoy : soundCheckGirl
      break
    case PokerActions.CALL:
      sound = gender === 'male' ? soundCallBoy : soundCallGirl
      break
    case PokerActions.RAISE:
      sound = gender === 'male' ? soundRaiseBoy : soundRaiseGirl
      break
    case PokerActions.QUARTER:
      sound = gender === 'male' ? soundQuarterBoy : soundQuarterGirl
      break
    case PokerActions.HALF:
      sound = gender === 'male' ? soundHalfBoy : soundHalfGirl
      break
    case PokerActions.FULL:
      sound = gender === 'male' ? soundFullBoy : soundFullGirl
      break
    case PokerActions.ALLIN:
      sound = gender === 'male' ? soundAllBoy : soundAllGirl
      break
    default:
      return
  }

  sound.playbackRate = playbackRate
  sound.volume = 1.0
  sound.play()
}
