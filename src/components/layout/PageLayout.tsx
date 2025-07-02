import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const pageLayoutVariants = cva(
  'min-h-screen bg-background',
  {
    variants: {
      spacing: {
        comfortable: 'py-8',
        compact: 'py-4',
        none: 'py-0',
      },
      maxWidth: {
        sm: 'max-w-2xl',
        md: 'max-w-4xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        full: 'max-w-none',
      },
    },
    defaultVariants: {
      spacing: 'comfortable',
      maxWidth: 'lg',
    },
  }
)

const containerVariants = cva(
  'mx-auto px-4',
  {
    variants: {
      maxWidth: {
        sm: 'max-w-2xl',
        md: 'max-w-4xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        full: 'max-w-none',
      },
    },
    defaultVariants: {
      maxWidth: 'lg',
    },
  }
)

interface PageLayoutProps extends VariantProps<typeof pageLayoutVariants> {
  children: ReactNode
  className?: string
  containerClassName?: string
}

export const PageLayout = ({ 
  children, 
  spacing, 
  maxWidth, 
  className, 
  containerClassName 
}: PageLayoutProps) => {
  return (
    <div className={cn(pageLayoutVariants({ spacing }), className)}>
      <div className={cn(containerVariants({ maxWidth }), containerClassName)}>
        {children}
      </div>
    </div>
  )
}