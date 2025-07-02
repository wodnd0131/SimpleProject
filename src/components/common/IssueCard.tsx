import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from './StatusBadge'
import { UserAvatar } from './UserAvatar'
import { Issue } from '@/types/issue'
import { formatDistanceToNow } from 'date-fns'

const issueCardVariants = cva(
  'transition-colors border-border',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent/50 bg-card',
        compact: 'hover:bg-accent/30 bg-card py-2',
        detailed: 'hover:bg-accent/50 bg-card',
      },
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: true,
    },
  }
)

interface IssueCardProps extends VariantProps<typeof issueCardVariants> {
  issue: Issue
  className?: string
  showLabels?: boolean
  showAssignees?: boolean
  showCommentCount?: boolean
  children?: ReactNode
}

export const IssueCard = ({
  issue,
  variant,
  interactive,
  className,
  showLabels = true,
  showAssignees = true,
  showCommentCount = true,
  children,
}: IssueCardProps) => {
  const cardContent = (
    <Card className={cn(issueCardVariants({ variant, interactive }), className)}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <StatusBadge 
            status={issue.state as 'open' | 'closed'} 
            size="sm"
            className="mt-1 flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-card-foreground hover:text-primary transition-colors truncate">
                  {issue.title}
                </h3>
                
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground flex-wrap">
                  <span>#{issue.number}</span>
                  <span>•</span>
                  <span>opened {formatDistanceToNow(new Date(issue.createdAt))} ago</span>
                  <span>•</span>
                  <span>by {issue.author.username}</span>
                  {showCommentCount && issue.comments.length > 0 && (
                    <>
                      <span>•</span>
                      <span>{issue.comments.length} comment{issue.comments.length !== 1 ? 's' : ''}</span>
                    </>
                  )}
                </div>
              </div>
              
              {showAssignees && issue.assignees.length > 0 && (
                <div className="flex items-center gap-1 ml-2">
                  {issue.assignees.slice(0, 3).map((assignee) => (
                    <UserAvatar
                      key={assignee.username}
                      src={assignee.avatar}
                      alt={assignee.username}
                      size="sm"
                      className="border-border"
                    />
                  ))}
                  {issue.assignees.length > 3 && (
                    <span className="text-xs text-muted-foreground ml-1">
                      +{issue.assignees.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            {showLabels && issue.labels.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {issue.labels.map((label) => (
                  <Badge
                    key={label.name}
                    variant="secondary"
                    style={{ 
                      backgroundColor: label.color + '20', 
                      color: label.color,
                      borderColor: label.color + '40'
                    }}
                    className="text-xs border"
                  >
                    {label.name}
                  </Badge>
                ))}
              </div>
            )}
            
            {children}
          </div>
        </div>
      </div>
    </Card>
  )

  if (interactive) {
    return (
      <Link to={`/issues/${issue.number}`} className="block">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}