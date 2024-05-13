import { formatChipsAmount } from '@/utils/formatting'

type CoinBetProps = {
  bet: number
}

export const CoinBet = ({ bet }: CoinBetProps) => {
  if (!bet) return null

  return (
    <div className="coin_bet">
      <span className="number">{formatChipsAmount(bet)}$</span>
      <ul className="chip">
        <li>
          <span>0</span>
        </li>
        <li>
          <span>1</span>
        </li>
        <li>
          <span>2</span>
        </li>
        <li>
          <span>3</span>
        </li>
        {/* <li>
          <span>4</span>
        </li>
        <li>
          <span>5</span>
        </li> */}
      </ul>
    </div>
  )
}
