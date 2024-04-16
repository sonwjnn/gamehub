import { Actions } from './actions'
import { Logo } from './logo'

import '@/styles/css/styles.css'

export const Navbar = () => {
  return (
    <div
      className="game_heading  !h-[56px] !py-0 !px-[16px]"
      style={{ backgroundImage: 'url(/images/header_bg.png)' }}
    >
      <Logo />
      <Actions />
    </div>
  )
}
