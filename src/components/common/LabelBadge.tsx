import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

const labelBadgeVariants = cva(
  'inline-flex items-center gap-1 border transition-colors',
  {
    variants: {
      size: {
        sm: 'text-xs px-1.5 py-0.5',
        md: 'text-xs px-2 py-1',
        lg: 'text-sm px-3 py-1.5',
      },
      interactive: {
        true: 'cursor-pointer hover:opacity-80',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      interactive: false,
    },
  }
)

interface Label {
  name: string
  color: string
}

interface LabelBadgeProps extends VariantProps<typeof labelBadgeVariants> {
  label: Label
  className?: string
  removable?: boolean
  onRemove?: () => void
  onClick?: () => void
  children?: ReactNode
}

export const LabelBadge = ({
  label,
  size,
  interactive,
  className,
  removable = false,
  onRemove,
  onClick,
  children,
}: LabelBadgeProps) => {
  const badgeStyle = {
    backgroundColor: label.color + '20',
    color: label.color,
    borderColor: label.color + '40',
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onRemove) {
      onRemove()
    }
  }

  return (
    <Badge
      variant="secondary"
      style={badgeStyle}
      className={cn(
        labelBadgeVariants({ size, interactive: interactive || !!onClick }),
        className
      )}
      onClick={handleClick}
    >
      {children || label.name}
      {removable && (
        <X 
          className="w-3 h-3 cursor-pointer hover:opacity-70" 
          onClick={handleRemove}
        />
      )}
    </Badge>
  )
}