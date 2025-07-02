import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors',
  {
    variants: {
      status: {
        open: 'bg-green-100 text-green-800 border border-green-200',
        closed: 'bg-red-100 text-red-800 border border-red-200',
        draft: 'bg-gray-100 text-gray-800 border border-gray-200',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-xs',
        md: 'px-2 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      status: 'open',
      size: 'md',
    },
  }
)

const statusIndicatorVariants = cva(
  'rounded-full flex-shrink-0',
  {
    variants: {
      status: {
        open: 'bg-green-500',
        closed: 'bg-red-500',
        draft: 'bg-gray-500',
      },
      size: {
        sm: 'w-1.5 h-1.5',
        md: 'w-2 h-2',
        lg: 'w-2.5 h-2.5',
      },
    },
    defaultVariants: {
      status: 'open',
      size: 'md',
    },
  }
)

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  className?: string
  children?: ReactNode
  showIndicator?: boolean
}

export const StatusBadge = ({ 
  status, 
  size, 
  className, 
  children, 
  showIndicator = true 
}: StatusBadgeProps) => {
  return (
    <span className={cn(statusBadgeVariants({ status, size }), className)}>
      {showIndicator && (
        <span className={statusIndicatorVariants({ status, size })} />
      )}
      {children || (status && status.charAt(0).toUpperCase() + status.slice(1))}
    </span>
  )
}