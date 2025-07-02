import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const userAvatarVariants = cva(
  'inline-flex items-center justify-center rounded-full border bg-background overflow-hidden',
  {
    variants: {
      size: {
        xs: 'w-4 h-4 text-xs',
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-10 h-10 text-base',
        xl: 'w-12 h-12 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

interface UserAvatarProps extends VariantProps<typeof userAvatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  className?: string
  children?: ReactNode
}

export const UserAvatar = ({ 
  src, 
  alt, 
  fallback, 
  size, 
  className, 
  children 
}: UserAvatarProps) => {
  const initials = fallback || alt?.slice(0, 2).toUpperCase() || '??'
  
  return (
    <div className={cn(userAvatarVariants({ size }), className)}>
      {src ? (
        <img 
          src={src} 
          alt={alt || 'User avatar'} 
          className="w-full h-full object-cover"
        />
      ) : children ? (
        children
      ) : (
        <span className="font-medium text-muted-foreground">
          {initials}
        </span>
      )}
    </div>
  )
}