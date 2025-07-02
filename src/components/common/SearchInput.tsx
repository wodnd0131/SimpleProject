import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const searchInputVariants = cva(
  'relative',
  {
    variants: {
      size: {
        sm: '',
        md: 'mb-4',
        lg: 'mb-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

interface SearchInputProps extends VariantProps<typeof searchInputVariants> {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  icon?: ReactNode
  disabled?: boolean
}

export const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = 'Search...', 
  size, 
  className, 
  icon,
  disabled = false
}: SearchInputProps) => {
  return (
    <div className={cn(searchInputVariants({ size }), className)}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          {icon || <Search className="w-4 h-4" />}
        </div>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
          disabled={disabled}
        />
      </div>
    </div>
  )
}