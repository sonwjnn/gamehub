import { UserButton } from '@/components/auth/user-button'
import { SocketIndicator } from '@/components/socket-indicator'
import Image from 'next/image'
import Link from 'next/link'

interface ActionsProps {}

export const Actions = ({}: ActionsProps) => {
  return (
    <div className="toolbar flex flex-midle">
      <SocketIndicator />

      <div className="item flex flex-midle gap-8">
        <div className="icon flex-shrink">
          <Image
            src="/images/icon_top.svg"
            alt="iconTopImage"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <span>Top</span>
      </div>
      <div className="line"></div>
      <Link href={'/dashboard/rule'}>
        <div className="item flex flex-midle gap-8">
          <div className="icon flex-shrink">
            <Image
              src="/images/icon_rule.svg"
              alt="iconRuleImage"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <span>Rule</span>
        </div>
      </Link>
      <div className="line"></div>
      <Link href={'/dashboard/setting'}>
        <div className="item flex flex-midle gap-8 mr-2">
          <div className="icon flex-shrink">
            <Image
              src="/images/icon_setting.svg"
              alt="iconSettingImage"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <span>Setting</span>
        </div>
      </Link>

      <UserButton />
    </div>
  )
}
