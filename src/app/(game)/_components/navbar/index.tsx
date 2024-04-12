import { Actions } from './actions'
import { Logo } from './logo'

export const Navbar = () => {
  return (
    <div
      className="game_heading !py-0"
      style={{ backgroundImage: 'url(/images/header_bg.png)' }}
    >
      <Logo />
      <Actions />
    </div>
  )
}
