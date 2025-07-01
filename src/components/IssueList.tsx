
import { Link } from 'react-router-dom';
import { Issue } from '@/types/issue';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface IssueListProps {
  issues: Issue[];
}

export const IssueList = ({ issues }: IssueListProps) => {
  if (issues.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No issues found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {issues.map((issue) => (
        <Card key={issue.id} className="p-4 hover:bg-accent/50 transition-colors bg-card border-border">
          <div className="flex items-start gap-3">
            <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${
              issue.state === 'open' ? 'bg-primary' : 'bg-destructive'
            }`}></div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link 
                    to={`/issues/${issue.number}`}
                    className="text-lg font-semibold hover:text-primary transition-colors text-card-foreground"
                  >
                    {issue.title}
                  </Link>
                  
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <span>#{issue.number}</span>
                    <span>opened {formatDistanceToNow(new Date(issue.createdAt))} ago</span>
                    <span>by {issue.author.username}</span>
                    {issue.comments.length > 0 && (
                      <span>{issue.comments.length} comments</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {issue.assignees.map((assignee) => (
                    <img
                      key={assignee.username}
                      src={assignee.avatar}
                      alt={assignee.username}
                      className="w-6 h-6 rounded-full border border-border"
                    />
                  ))}
                </div>
              </div>
              
              {issue.labels.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {issue.labels.map((label) => (
                    <Badge
                      key={label.name}
                      variant="secondary"
                      style={{ backgroundColor: label.color + '20', color: label.color }}
                      className="text-xs border-border"
                    >
                      {label.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
