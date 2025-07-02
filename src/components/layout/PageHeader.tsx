import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const pageHeaderVariants = cva(
  'flex items-center justify-between mb-6',
  {
    variants: {
      size: {
        sm: 'mb-4',
        md: 'mb-6',
        lg: 'mb-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const titleVariants = cva(
  'font-bold text-foreground',
  {
    variants: {
      size: {
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-3xl',
        xl: 'text-4xl',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
)

interface PageHeaderProps extends VariantProps<typeof pageHeaderVariants> {
  title: string
  subtitle?: string
  titleSize?: VariantProps<typeof titleVariants>['size']
  actions?: ReactNode
  className?: string
  children?: ReactNode
}

export const PageHeader = ({ 
  title, 
  subtitle, 
  titleSize, 
  actions, 
  size, 
  className, 
  children 
}: PageHeaderProps) => {
  return (
    <div className={cn(pageHeaderVariants({ size }), className)}>
      <div className="flex-1">
        <h1 className={titleVariants({ size: titleSize })}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {actions && (
        <div className="flex items-center gap-2 ml-4">
          {actions}
        </div>
      )}
    </div>
  )
}