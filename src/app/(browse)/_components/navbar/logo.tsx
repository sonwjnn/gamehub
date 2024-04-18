import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {}

export const Logo = ({}: LogoProps) => {
  return (
    <Link className="logo block" href="/">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto max-w-full"
      />
    </Link>
  )
}
