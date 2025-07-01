
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { mockIssues } from '@/data/mockIssues';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, Edit } from 'lucide-react';

const IssueDetail = () => {
  const { number } = useParams<{ number: string }>();
  const [newComment, setNewComment] = useState('');
  
  const issue = mockIssues.find(i => i.number === parseInt(number || '0'));
  
  if (!issue) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
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
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${
                issue.state === 'open' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="font-medium capitalize">{issue.state}</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <span>opened {formatDistanceToNow(new Date(issue.createdAt))} ago by </span>
              <span className="font-medium">{issue.author.username}</span>
            </div>
          </div>
          
          {issue.labels.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {issue.labels.map((label) => (
                <Badge
                  key={label.name}
                  variant="secondary"
                  style={{ backgroundColor: label.color + '20', color: label.color }}
                >
                  {label.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <img
                  src={issue.author.avatar}
                  alt={issue.author.username}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">{issue.author.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(issue.createdAt))} ago
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {issue.body.split('\n').map((line, index) => (
                    <p key={index} className="mb-2 whitespace-pre-wrap">
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {issue.comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader className="flex flex-row items-center gap-3 pb-3">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{comment.author.username}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt))} ago
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{comment.body}</p>
                </CardContent>
              </Card>
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
                        <img
                          src={assignee.avatar}
                          alt={assignee.username}
                          className="w-6 h-6 rounded-full"
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
                      <Badge
                        key={label.name}
                        variant="secondary"
                        style={{ backgroundColor: label.color + '20', color: label.color }}
                        className="text-xs"
                      >
                        {label.name}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">None yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
