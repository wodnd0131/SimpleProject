
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PageLayout } from '@/components/layout';
import { StatusBadge, UserAvatar, CommentCard, LabelBadge } from '@/components/common';
import { mockIssues } from '@/data/mockIssues';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

const IssueDetail = () => {
  const { number } = useParams<{ number: string }>();
  const [newComment, setNewComment] = useState('');
  
  const issue = mockIssues.find(i => i.number === parseInt(number || '0'));
  
  if (!issue) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Issue not found</h1>
            <Link to="/issues">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to issues
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would make an API call
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <PageLayout>
      <div className="mb-6">
        <Link to="/issues">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to issues
          </Button>
        </Link>
        
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold">{issue.title}</h1>
          <span className="text-muted-foreground">#{issue.number}</span>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <StatusBadge 
            status={issue.state as 'open' | 'closed'} 
            size="md"
          >
            {issue.state.charAt(0).toUpperCase() + issue.state.slice(1)}
          </StatusBadge>
          
          <div className="text-sm text-muted-foreground">
            <span>opened {formatDistanceToNow(new Date(issue.createdAt))} ago by </span>
            <span className="font-medium">{issue.author.username}</span>
          </div>
        </div>
        
        {issue.labels.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {issue.labels.map((label) => (
              <LabelBadge
                key={label.name}
                label={label}
                size="md"
              />
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <CommentCard
            author={issue.author}
            createdAt={issue.createdAt}
            body={issue.body}
            variant="highlighted"
          />

          {issue.comments.map((comment) => (
            <CommentCard
              key={comment.id}
              author={comment.author}
              createdAt={comment.createdAt}
              body={comment.body}
            />
          ))}

            <Card>
              <CardHeader>
                <h3 className="font-medium">Add a comment</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Leave a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="font-medium">Assignees</h3>
            </CardHeader>
            <CardContent>
              {issue.assignees.length > 0 ? (
                <div className="space-y-2">
                  {issue.assignees.map((assignee) => (
                    <div key={assignee.username} className="flex items-center gap-2">
                      <UserAvatar
                        src={assignee.avatar}
                        alt={assignee.username}
                        size="sm"
                      />
                      <span className="text-sm">{assignee.username}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No one assigned</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-medium">Labels</h3>
            </CardHeader>
            <CardContent>
              {issue.labels.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {issue.labels.map((label) => (
                    <LabelBadge
                      key={label.name}
                      label={label}
                      size="sm"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">None yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default IssueDetail;
