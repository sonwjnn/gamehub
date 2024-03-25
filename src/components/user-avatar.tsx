import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { cn, stringToColor } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { User } from 'lucide-react'

const avatarSizes = cva('', {
  variants: {
    size: {
      default: 'w-full h-full',
      md: 'size-12',
      lg: 'size-14',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  name: string
  imageUrl?: string
  isLive?: boolean
  showBadge?: boolean
  className?: string
}

export const UserAvatar = ({
  name,
  imageUrl,
  size,
  className,
}: UserAvatarProps) => {
  const color = stringToColor(name || '')
  return (
    <div className={cn('rounded-full', className, avatarSizes({ size }))}>
      <Avatar className={cn(avatarSizes({ size }))}>
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback style={{ backgroundColor: color }}>
          <User className="text-white" fontSize={18} />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />
}
