import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { UserAvatar } from './UserAvatar'
import { formatDistanceToNow } from 'date-fns'

const commentCardVariants = cva(
  'bg-card border-border',
  {
    variants: {
      variant: {
        default: '',
        highlighted: 'border-primary/50 bg-primary/5',
        muted: 'bg-muted/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface Author {
  username: string
  avatar: string
}

interface CommentCardProps extends VariantProps<typeof commentCardVariants> {
  author: Author
  createdAt: string
  body: string
  className?: string
  actions?: ReactNode
  children?: ReactNode
}

export const CommentCard = ({
  author,
  createdAt,
  body,
  variant,
  className,
  actions,
  children,
}: CommentCardProps) => {
  return (
    <Card className={cn(commentCardVariants({ variant }), className)}>
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <UserAvatar
          src={author.avatar}
          alt={author.username}
          size="md"
        />
        <div className="flex-1">
          <p className="font-medium text-card-foreground">{author.username}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(createdAt))} ago
          </p>
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          {body.split('\n').map((line, index) => (
            <p key={index} className="mb-2 whitespace-pre-wrap text-card-foreground">
              {line}
            </p>
          ))}
        </div>
        {children}
      </CardContent>
    </Card>
  )
}