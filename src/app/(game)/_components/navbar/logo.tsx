import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {}

export const Logo = ({}: LogoProps) => {
  return (
    <Link className="logo" href="/">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-[80%]"
      />
    </Link>
  )
}
