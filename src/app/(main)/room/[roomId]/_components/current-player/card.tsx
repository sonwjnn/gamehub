import { cn } from "@/lib/utils";
import Image from "next/image";

interface CardProps {
  imageUrl: string;
  value: number;
  flip?: boolean;
  className?: string;
}

export const Card = ({ imageUrl, flip, className }: CardProps) => {
  return (
    <div className={cn("h-full w-full", className)}>
      <Image
        src={flip ? imageUrl : `/images/pocker.png`}
        alt="pokerOnImage"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "auto", height: "100%" }}
      />
    </div>
  );
};
