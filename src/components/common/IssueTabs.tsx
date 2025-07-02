import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge } from './StatusBadge'

const issueTabsVariants = cva(
  'w-full',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

interface IssueTabsProps extends VariantProps<typeof issueTabsVariants> {
  openCount: number
  closedCount: number
  openContent: ReactNode
  closedContent: ReactNode
  defaultValue?: string
  className?: string
  onValueChange?: (value: string) => void
}

export const IssueTabs = ({ 
  openCount, 
  closedCount, 
  openContent, 
  closedContent, 
  defaultValue = 'open',
  size,
  className,
  onValueChange
}: IssueTabsProps) => {
  return (
    <Tabs 
      defaultValue={defaultValue} 
      className={cn(issueTabsVariants({ size }), className)}
      onValueChange={onValueChange}
    >
      <TabsList className="grid grid-cols-2 w-fit">
        <TabsTrigger value="open" className="flex items-center gap-2">
          <StatusBadge status="open" size="sm" showIndicator />
          {openCount} Open
        </TabsTrigger>
        <TabsTrigger value="closed" className="flex items-center gap-2">
          <StatusBadge status="closed" size="sm" showIndicator />
          {closedCount} Closed
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="open" className="mt-4">
        {openContent}
      </TabsContent>
      
      <TabsContent value="closed" className="mt-4">
        {closedContent}
      </TabsContent>
    </Tabs>
  )
}