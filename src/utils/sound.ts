import { PokerActions } from '@/types'
import sounds from '@/utils/contants/sound'

export const getGenderFromImageUrl = (imageUrl: string) => {
  const imageNumber = parseInt(
    imageUrl.replace('/images/avt/', '').replace('.jpg', '')
  )
  return imageNumber >= 1 && imageNumber <= 12 ? 'male' : 'female'
}

let audioContext = new window.AudioContext()

export const playSound = (action: PokerActions, gender: string): string => {
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
      break
    case PokerActions.QUARTER:
      soundUrl =
        gender === 'male' ? sounds.soundQuarterBoy : sounds.soundQuarterGirl
      break
    case PokerActions.HALF:
      soundUrl = gender === 'male' ? sounds.soundHalfBoy : sounds.soundHalfGirl
      break
    case PokerActions.FULL:
      soundUrl = gender === 'male' ? sounds.soundFullBoy : sounds.soundFullGirl
      break
    case PokerActions.ALLIN:
      soundUrl = gender === 'male' ? sounds.soundAllBoy : sounds.soundAllGirl
      break
    default:
      soundUrl = ''
  }

  return soundUrl

  // const track = audioContext.createMediaElementSource(audio)
  // track.connect(audioContext.destination)
  const audio = new Audio(soundUrl)
  audio.playbackRate = playbackRate
  audio.volume = 1.0
  audio.play()
}
