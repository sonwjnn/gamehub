export const formatChipsAmount = (value: number) => {
  return value.toLocaleString('vi-VN')
}

export const formattedCards = (rank: string) => {
  const rankMap: { [key: string]: string } = {
    TWO: '2',
    THREE: '3',
    FOUR: '4',
    FIVE: '5',
    SIX: '6',
    SEVEN: '7',
    EIGHT: '8',
    NINE: '9',
    TEN: '10',
    J: 'J',
    Q: 'Q',
    K: 'K',
    A: 'A',
  }

  return {
    rank: rankMap[rank],
  }
}

const rankMap = {
  A: 'A',
  '2': 'TWO',
  '3': 'THREE',
  '4': 'FOUR',
  '5': 'FIVE',
  '6': 'SIX',
  '7': 'SEVEN',
  '8': 'EIGHT',
  '9': 'NINE',
  T: 'TEN',
  J: 'J',
  Q: 'Q',
  K: 'K',
}

const suitMap = {
  H: 'HEARTS',
  D: 'DIAMONDS',
  C: 'CLUBS',
  S: 'SPADES',
}

export const formattedStringToCards = (value: string) => {
  let cards = value.replace(/[\[\] ']/g, '').split(',')

  return cards.map(card => {
    return {
      rank: rankMap[card[0] as keyof typeof rankMap],
      suit: suitMap[card[1] as keyof typeof suitMap],
    }
  })
}
