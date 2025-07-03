import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PageLayout, PageHeader } from '@/components/layout';
import { SearchInput, UserAvatar } from '@/components/common';
import { useMeetingMinutes } from '@/hooks';
import { Plus, Calendar, Users, Clock, FileText, Search } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

const Meetings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  
  const searchParams = useMemo(() => ({
    page: 1,
    limit: 20,
    status: statusFilter === 'all' ? undefined : statusFilter,
  }), [statusFilter]);

  const { 
    data: meetingsResponse, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useMeetingMinutes(searchParams);

  const meetings = meetingsResponse?.data || [];
  
  const filteredMeetings = useMemo(() => {
    if (!searchQuery) return meetings;
    return meetings.filter(meeting => 
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.participants.some(p => p.username.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [meetings, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
      case 'archived': return 'outline';
      default: return 'default';
    }
  };

  const LoadingSkeleton = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-5 w-16" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex -space-x-1">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-6 w-6 rounded-full" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <PageLayout>
        <PageHeader
          title="회의록"
          subtitle="회의 기록 관리 및 검토"
          actions={
            <Link to="/meetings/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                새 회의
              </Button>
            </Link>
          }
        />
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-10 w-32" />
          </div>
          <LoadingSkeleton />
        </div>
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout>
        <PageHeader title="회의록" />
        <div className="text-center py-12">
          <p className="text-destructive mb-4">
            회의 로드 실패: {error?.message}
          </p>
          <Button variant="outline" onClick={() => refetch()}>
            다시 시도
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader
        title="회의록"
        subtitle={`${filteredMeetings.length}건의 회의 기록`}
        actions={
          <Link to="/meetings/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Meeting
            </Button>
          </Link>
        }
      />

      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="제목 또는 참석자로 회의 검색..."
            />
          </div>
          <div className="flex items-center space-x-2">
            {(['all', 'published', 'draft', 'archived'] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'all' ? '전체' : status === 'published' ? '게시됨' : status === 'draft' ? '초안' : '보관됨'}
              </Button>
            ))}
          </div>
        </div>

        {/* Meeting Cards */}
        {filteredMeetings.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">회의를 찾을 수 없습니다</h3>
            <p>
              {searchQuery ? 
                '검색 조건이나 필터를 조정해 보세요' : 
                '첫 번째 회의록을 작성하여 시작하세요'
              }
            </p>
            <Link to="/meetings/new">
              <Button className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                회의록 작성
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMeetings.map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg leading-tight">
                        <Link 
                          to={`/meetings/${meeting.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {meeting.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>
                        {format(new Date(meeting.date), 'MMM d, yyyy')}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusColor(meeting.status)}>
                      {meeting.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>
                        {meeting.startTime} - {meeting.endTime}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{meeting.participants.length}명 참석</span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span>{meeting.actionItems.length}건의 액션 아이템</span>
                    </div>

                    {/* Participants Avatars */}
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-1">
                        {meeting.participants.slice(0, 4).map((participant, index) => (
                          <UserAvatar
                            key={index}
                            src={participant.avatar}
                            alt={participant.username}
                            fallback={participant.username.slice(0, 2).toUpperCase()}
                            size="sm"
                            className="border-2 border-background"
                          />
                        ))}
                        {meeting.participants.length > 4 && (
                          <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                            <span className="text-xs">+{meeting.participants.length - 4}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(meeting.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Meetings;