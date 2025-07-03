import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { PageLayout, PageHeader } from '@/components/layout';
import { UserAvatar } from '@/components/common';
import { 
  useDashboardStats, 
  useRecentActivity, 
  useProjectProgress, 
  useUpcomingDeadlines 
} from '@/hooks';
import {
  Calendar,
  CheckCircle,
  Clock,
  Plus,
  TrendingUp,
  Users,
  AlertTriangle,
  FileText,
  MessageSquare,
  Target,
  FileEdit,
  Sparkles,
  UserPlus,
  BarChart3,
  Trophy
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';

const Dashboard = () => {
  const { data: statsData, isLoading: statsLoading } = useDashboardStats();
  const { data: activityData, isLoading: activityLoading } = useRecentActivity({ limit: 8 });
  const { data: progressData, isLoading: progressLoading } = useProjectProgress();
  const { data: deadlinesData, isLoading: deadlinesLoading } = useUpcomingDeadlines({ limit: 6 });

  const stats = statsData?.data;
  const activities = activityData?.data || [];
  const projects = progressData?.data || [];
  const deadlines = deadlinesData?.data || [];

  const StatCard = ({ 
    title, 
    value, 
    description, 
    icon: Icon, 
    trend 
  }: { 
    title: string; 
    value: number; 
    description: string; 
    icon: React.ElementType; 
    trend?: string 
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{statsLoading ? <Skeleton className="h-8 w-16" /> : value}</div>
        <p className="text-xs text-muted-foreground">
          {trend && <span className="text-green-600">{trend} </span>}
          {description}
        </p>
      </CardContent>
    </Card>
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'destructive';
      case 'in_progress': return 'default';
      case 'pending': return 'secondary';
      default: return 'default';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'issue_created': return CheckCircle;
      case 'issue_closed': return CheckCircle;
      case 'meeting_created': return Calendar;
      case 'action_item_completed': return Target;
      case 'user_assigned': return Users;
      case 'document_created': return FileEdit;
      case 'ai_analysis_completed': return Sparkles;
      case 'team_member_added': return UserPlus;
      case 'workload_updated': return BarChart3;
      case 'project_milestone': return Trophy;
      default: return FileText;
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="대시보드"
        subtitle="프로젝트 관리 활동 개요"
        actions={
          <div className="flex items-center gap-2">
            <Link to="/meetings/new">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                새 회의
              </Button>
            </Link>
            <Link to="/docs/new">
              <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                <FileEdit className="w-4 h-4 mr-2" />
                새 문서
              </Button>
            </Link>
          </div>
        }
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="전체 이슈"
            value={stats?.totalIssues || 0}
            description="모든 프로젝트"
            icon={FileText}
            trend="+12%"
          />
          <StatCard
            title="열린 이슈"
            value={stats?.openIssues || 0}
            description="주의 필요"
            icon={AlertTriangle}
          />
          <StatCard
            title="팀 멤버"
            value={stats?.teamMembers || 0}
            description="활성 협업자"
            icon={Users}
          />
          <StatCard
            title="이번 주 완료"
            value={stats?.completedThisWeek || 0}
            description="완료된 작업"
            icon={TrendingUp}
            trend="+8%"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Project Progress */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>프로젝트 진행률</CardTitle>
              <CardDescription>활성 프로젝트의 완료 상태 추적</CardDescription>
            </CardHeader>
            <CardContent>
              {progressLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.slice(0, 4).map((project) => (
                    <div key={project.projectId} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{project.projectName}</p>
                          <p className="text-xs text-muted-foreground">
                            {project.completedIssues}/{project.totalIssues} 작업 완료
                          </p>
                        </div>
                        <Badge variant={
                          project.status === 'on_track' ? 'default' :
                          project.status === 'at_risk' ? 'destructive' :
                          project.status === 'delayed' ? 'destructive' : 'secondary'
                        }>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <Progress value={project.progressPercentage} className="h-2" />
                    </div>
                  ))}
                  <Link to="/projects">
                    <Button variant="outline" className="w-full mt-4">
                      모든 프로젝트 보기
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle>다가오는 마감일</CardTitle>
              <CardDescription>곧 마감인 작업 및 회의</CardDescription>
            </CardHeader>
            <CardContent>
              {deadlinesLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-2 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {deadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <UserAvatar 
                          src={deadline.assignee.avatar}
                          alt={deadline.assignee.username}
                          size="sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{deadline.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            variant={getPriorityColor(deadline.priority)}
                            className="text-xs"
                          >
                            {deadline.priority}
                          </Badge>
                          <Badge 
                            variant={getStatusColor(deadline.status)}
                            className="text-xs"
                          >
                            {deadline.daysRemaining < 0 ? '연체' : `${deadline.daysRemaining}일 남음`}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link to="/team/deadlines">
                    <Button variant="outline" className="w-full mt-4">
                      모든 마감일 보기
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
              <CardDescription>프로젝트의 최신 업데이트</CardDescription>
            </CardHeader>
            <CardContent>
              {activityLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-2 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const Icon = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{activity.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <UserAvatar 
                              src={activity.actor.avatar}
                              alt={activity.actor.username}
                              size="xs"
                            />
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>빠른 작업</CardTitle>
              <CardDescription>일반적인 작업 및 바로가기</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Link to="/docs/new">
                  <Button variant="outline" className="w-full justify-start">
                    <FileEdit className="w-4 h-4 mr-2" />
                    새 문서 만들기
                  </Button>
                </Link>
                <Link to="/issues/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    새 이슈 만들기
                  </Button>
                </Link>
                <Link to="/meetings/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    회의 일정 잡기
                  </Button>
                </Link>
                <Link to="/team/workload">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    팀 업무량 보기
                  </Button>
                </Link>
                <Link to="/team/reminders">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="w-4 h-4 mr-2" />
                    알림 관리
                  </Button>
                </Link>
                <Link to="/meetings">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    회의록
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;