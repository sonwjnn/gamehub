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
