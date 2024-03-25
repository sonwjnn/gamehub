import { UserButton } from '@/components/auth/user-button'
import Image from 'next/image'

interface ActionsProps {}

export const Actions = ({}: ActionsProps) => {
  return (
    <div className="toolbar flex flex-midle">
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
      <div className="line"></div>
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

      <UserButton />
    </div>
  )
}
