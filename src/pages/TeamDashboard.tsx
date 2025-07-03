import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageLayout, PageHeader } from '@/components/layout';
import { UserAvatar } from '@/components/common';
import { 
  useTeamMembers, 
  useWorkloadSummary, 
  useReminders, 
  useUpcomingDeadlines 
} from '@/hooks';
import {
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  Bell,
  Target
} from 'lucide-react';
import React from 'react';

const TeamDashboard = () => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  
  const { data: teamData, isLoading: teamLoading } = useTeamMembers();
  const { data: workloadData, isLoading: workloadLoading } = useWorkloadSummary();
  const { data: remindersData, isLoading: remindersLoading } = useReminders();
  const { data: deadlinesData, isLoading: deadlinesLoading } = useUpcomingDeadlines();

  const teamMembers = teamData?.data || [];
  const workloadSummaries = workloadData?.data || [];
  const reminders = remindersData?.data || [];
  const deadlines = deadlinesData?.data || [];

  const getWorkloadSummary = (memberId: string) => {
    return workloadSummaries.find(summary => summary.memberId === memberId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'away': return 'bg-gray-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getWorkloadLevel = (capacity: number, current: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage > 90) return { level: '과부하', color: 'destructive' };
    if (percentage > 75) return { level: '바쁨', color: 'default' };
    if (percentage > 50) return { level: '보통', color: 'secondary' };
    return { level: '여유', color: 'outline' };
  };

  const StatCard = ({ 
    title, 
    value, 
    description, 
    icon: Icon, 
    loading = false 
  }: { 
    title: string; 
    value: number; 
    description: string; 
    icon: React.ElementType; 
    loading?: boolean;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? <Skeleton className="h-8 w-16" /> : value}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout>
      <PageHeader
        title="팀 대시보드"
        subtitle="팀 업무량 모니터링 및 업무 할당 관리"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              알림 전송
            </Button>
            <Button variant="outline" size="sm">
              <Target className="w-4 h-4 mr-2" />
              업무 할당
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* Team Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="팀 멤버"
            value={teamMembers.length}
            description="활성 협업자"
            icon={Users}
            loading={teamLoading}
          />
          <StatCard
            title="총 할당 업무"
            value={workloadSummaries.reduce((sum, w) => sum + w.totalAssigned, 0)}
            description="모든 멤버 합계"
            icon={Target}
            loading={workloadLoading}
          />
          <StatCard
            title="지연 업무"
            value={workloadSummaries.reduce((sum, w) => sum + w.overdue, 0)}
            description="조치 필요"
            icon={AlertTriangle}
            loading={workloadLoading}
          />
          <StatCard
            title="완료율"
            value={Math.round(workloadSummaries.reduce((sum, w) => sum + w.completionRate, 0) / workloadSummaries.length || 0)}
            description="팀 평균"
            icon={TrendingUp}
            loading={workloadLoading}
          />
        </div>

        <Tabs defaultValue="workload" className="space-y-4">
          <TabsList>
            <TabsTrigger value="workload">팀 업무량</TabsTrigger>
            <TabsTrigger value="reminders">알림</TabsTrigger>
            <TabsTrigger value="deadlines">예정된 마감일</TabsTrigger>
          </TabsList>

          <TabsContent value="workload" className="space-y-4">
            {teamLoading || workloadLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-1 flex-1">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Skeleton className="h-2 w-full" />
                        <div className="grid grid-cols-2 gap-2">
                          <Skeleton className="h-8" />
                          <Skeleton className="h-8" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => {
                  const workload = getWorkloadSummary(member.id);
                  const workloadLevel = getWorkloadLevel(member.workloadCapacity, member.currentWorkload);
                  const utilizationPercentage = (member.currentWorkload / member.workloadCapacity) * 100;

                  return (
                    <Card 
                      key={member.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedMember === member.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <UserAvatar user={member} size="md" />
                            <div 
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                            />
                          </div>
                          <div className="space-y-1 flex-1">
                            <CardTitle className="text-base">{member.username}</CardTitle>
                            <CardDescription className="flex items-center space-x-2">
                              <span>{member.role}</span>
                              <Badge variant={workloadLevel.color} className="text-xs">
                                {workloadLevel.level}
                              </Badge>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>업무량</span>
                              <span>{member.currentWorkload}/{member.workloadCapacity}</span>
                            </div>
                            <Progress value={utilizationPercentage} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              {utilizationPercentage.toFixed(0)}% 용량 사용
                            </p>
                          </div>

                          {workload && (
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="text-center p-2 bg-muted rounded">
                                <div className="font-semibold text-lg">{workload.inProgress}</div>
                                <div className="text-xs text-muted-foreground">진행 중</div>
                              </div>
                              <div className="text-center p-2 bg-muted rounded">
                                <div className="font-semibold text-lg">{workload.overdue}</div>
                                <div className="text-xs text-muted-foreground">지연</div>
                              </div>
                            </div>
                          )}

                          {workload && (
                            <div className="text-xs text-muted-foreground">
                              완료율: {workload.completionRate.toFixed(1)}%
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reminders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>활성 알림</CardTitle>
                <CardDescription>대기 중인 알림 및 경고</CardDescription>
              </CardHeader>
              <CardContent>
                {remindersLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Skeleton className="h-4 w-4" />
                        <div className="space-y-1 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                        <Skeleton className="h-6 w-16" />
                      </div>
                    ))}
                  </div>
                ) : reminders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>활성 알림이 없습니다</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reminders.slice(0, 10).map((reminder) => (
                      <div key={reminder.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="flex-shrink-0">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{reminder.title}</p>
                          <p className="text-xs text-muted-foreground">{reminder.description}</p>
                        </div>
                        <Badge variant={
                          reminder.priority === 'high' ? 'destructive' :
                          reminder.priority === 'medium' ? 'default' : 'secondary'
                        }>
                          {reminder.priority === 'high' ? '높음' : reminder.priority === 'medium' ? '보통' : '낮음'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deadlines" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>예정된 마감일</CardTitle>
                <CardDescription>곧 마감되는 업무와 회의</CardDescription>
              </CardHeader>
              <CardContent>
                {deadlinesLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-1 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                        <Skeleton className="h-6 w-20" />
                      </div>
                    ))}
                  </div>
                ) : deadlines.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>예정된 마감일이 없습니다</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {deadlines.map((deadline) => (
                      <div key={deadline.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <UserAvatar user={deadline.assignee} size="sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{deadline.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {deadline.assignee.username}에게 할당됨
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            deadline.status === 'overdue' ? 'destructive' :
                            deadline.daysRemaining <= 1 ? 'destructive' :
                            deadline.daysRemaining <= 3 ? 'default' : 'secondary'
                          }>
                            {deadline.status === 'overdue' ? '지연됨' : `${deadline.daysRemaining}일 남음`}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default TeamDashboard;