import Image from "next/image";
import Link from "next/link";

interface LogoProps {}

export const Logo = ({}: LogoProps) => {
  return (
    <Link className="logo" href="/">
      <div className="size-full relative">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </Link>
  );
};
