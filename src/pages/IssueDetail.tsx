
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { PageLayout } from '@/components/layout';
import { StatusBadge, UserAvatar, CommentCard, LabelBadge } from '@/components/common';
import { useIssue, useIssueComments, useAddCommentMutation, useCloseIssueMutation, useReopenIssueMutation } from '@/hooks';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const IssueDetail = () => {
  const { number } = useParams<{ number: string }>();
  const [newComment, setNewComment] = useState('');
  
  const issueNumber = parseInt(number || '0');
  
  const { 
    data: issueResponse, 
    isLoading: issueLoading, 
    isError: issueError,
    error: issueErrorDetails,
    refetch: refetchIssue
  } = useIssue(issueNumber);
  
  const { 
    data: commentsResponse,
    isLoading: commentsLoading,
    refetch: refetchComments
  } = useIssueComments(issueNumber);
  
  const addCommentMutation = useAddCommentMutation();
  const closeIssueMutation = useCloseIssueMutation();
  const reopenIssueMutation = useReopenIssueMutation();
  
  const issue = issueResponse?.data;
  const comments = commentsResponse?.data || [];
  
  if (issueLoading) {
    return (
      <PageLayout>
        <Link to="/issues">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            이슈로 돌아가기
          </Button>
        </Link>
        
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </div>
      </PageLayout>
    );
  }

  if (issueError || !issue) {
    return (
      <PageLayout>
        <Link to="/issues">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            이슈로 돌아가기
          </Button>
        </Link>
        
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {issueError ? '이슈 로드 오류' : '이슈를 찾을 수 없습니다'}
            </h1>
            {issueError && (
              <p className="text-destructive mb-4">
                {issueErrorDetails?.message}
              </p>
            )}
            <div className="space-x-2">
              <Button variant="outline" onClick={() => refetchIssue()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                다시 시도
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await addCommentMutation.mutateAsync({ 
          issueId: issueNumber, 
          body: newComment 
        });
        setNewComment('');
      } catch (error) {
        // Error handling is done in the mutation
      }
    }
  };

  const handleToggleIssueState = async () => {
    try {
      if (issue.state === 'open') {
        await closeIssueMutation.mutateAsync(issueNumber);
      } else {
        await reopenIssueMutation.mutateAsync(issueNumber);
      }
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  return (
    <PageLayout>
      <div className="mb-6">
        <Link to="/issues">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            이슈로 돌아가기
          </Button>
        </Link>
        
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold">{issue.title}</h1>
          <span className="text-muted-foreground">#{issue.number}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <StatusBadge 
              status={issue.state as 'open' | 'closed'} 
              size="md"
            >
              {issue.state.charAt(0).toUpperCase() + issue.state.slice(1)}
            </StatusBadge>
            
            <div className="text-sm text-muted-foreground">
              <span>{formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })} </span>
              <span className="font-medium">{issue.author.username}</span>
            </div>
          </div>
          
          <Button
            variant={issue.state === 'open' ? 'destructive' : 'default'}
            onClick={handleToggleIssueState}
            disabled={closeIssueMutation.isPending || reopenIssueMutation.isPending}
          >
            {closeIssueMutation.isPending || reopenIssueMutation.isPending ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            {issue.state === 'open' ? '이슈 닫기' : '이슈 다시 열기'}
          </Button>
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

          {commentsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            comments.map((comment) => (
              <CommentCard
                key={comment.id}
                author={comment.author}
                createdAt={comment.createdAt}
                body={comment.body}
              />
            ))
          )}

            <Card>
              <CardHeader>
                <h3 className="font-medium">댓글 추가</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="댓글을 남겨주세요"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleAddComment} 
                    disabled={!newComment.trim() || addCommentMutation.isPending}
                  >
                    {addCommentMutation.isPending ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        추가 중...
                      </>
                    ) : (
                      '댓글'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="font-medium">담당자</h3>
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
                <p className="text-sm text-muted-foreground">담당자 없음</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-medium">라벨</h3>
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
                <p className="text-sm text-muted-foreground">아직 없음</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default IssueDetail;
