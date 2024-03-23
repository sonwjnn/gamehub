import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, stringToColor } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { User } from "lucide-react";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "size-8",
      md: "size-12",
      lg: "size-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  name: string;
  imageUrl?: string;
  isLive?: boolean;
  showBadge?: boolean;
  className?: string;
}

export const UserAvatar = ({
  name,
  imageUrl,
  isLive,
  showBadge,
  size,
  className,
}: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive;

  const color = stringToColor(name || "");
  return (
    <div
      className={cn("relative rounded-full", className, avatarSizes({ size }))}
    >
      <Avatar
        className={cn(
          isLive && "border border-background ring-2 ring-rose-500",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback style={{ backgroundColor: color }}>
          <User className="text-white" fontSize={18} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};
