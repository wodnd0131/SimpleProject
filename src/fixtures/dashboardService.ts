import type {
  DashboardStats,
  RecentActivity,
  ProjectProgress,
  UpcomingDeadline
} from '@/types/Dashboard.types'
import {
  mockDashboardStats,
  mockRecentActivity,
  mockProjectProgress,
  mockUpcomingDeadlines
} from './dashboard'

export interface DashboardStatsResponse {
  data: DashboardStats;
}

export interface RecentActivityResponse {
  data: RecentActivity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ProjectProgressResponse {
  data: ProjectProgress[];
}

export interface UpcomingDeadlinesResponse {
  data: UpcomingDeadline[];
}

export class DashboardFixtures {
  async getDashboardStats(dateRange?: { from: string; to: string }): Promise<DashboardStatsResponse> {
    await this.delay()
    return {
      data: mockDashboardStats
    }
  }

  async getRecentActivity(params?: { 
    limit?: number; 
    page?: number;
    types?: string[];
    userId?: string;
  }): Promise<RecentActivityResponse> {
    await this.delay()
    
    const limit = params?.limit || 10
    const page = params?.page || 1
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    let filteredActivity = [...mockRecentActivity]
    
    if (params?.types && params.types.length > 0) {
      filteredActivity = filteredActivity.filter(activity => 
        params.types!.includes(activity.type)
      )
    }
    
    if (params?.userId) {
      filteredActivity = filteredActivity.filter(activity => 
        activity.actor.username === params.userId
      )
    }
    
    const paginatedActivity = filteredActivity.slice(startIndex, endIndex)
    
    return {
      data: paginatedActivity,
      pagination: {
        page,
        limit,
        total: filteredActivity.length
      }
    }
  }

  async getProjectProgress(projectIds?: number[]): Promise<ProjectProgressResponse> {
    await this.delay()
    
    let filteredProgress = [...mockProjectProgress]
    
    if (projectIds && projectIds.length > 0) {
      filteredProgress = filteredProgress.filter(project => 
        projectIds.includes(project.projectId)
      )
    }
    
    return {
      data: filteredProgress
    }
  }

  async getUpcomingDeadlines(params?: {
    days?: number;
    assigneeId?: string;
    priority?: string;
    limit?: number;
  }): Promise<UpcomingDeadlinesResponse> {
    await this.delay()
    
    const limit = params?.limit || 10
    let filteredDeadlines = [...mockUpcomingDeadlines]
    
    if (params?.days) {
      filteredDeadlines = filteredDeadlines.filter(deadline => 
        deadline.daysRemaining <= params.days!
      )
    }
    
    if (params?.assigneeId) {
      filteredDeadlines = filteredDeadlines.filter(deadline => 
        deadline.assignee.username === params.assigneeId
      )
    }
    
    if (params?.priority) {
      filteredDeadlines = filteredDeadlines.filter(deadline => 
        deadline.priority === params.priority
      )
    }
    
    const limitedDeadlines = filteredDeadlines.slice(0, limit)
    
    return {
      data: limitedDeadlines
    }
  }

  async getPersonalDashboard(userId: string): Promise<{
    stats: DashboardStats;
    assignedIssues: Array<{
      id: number;
      title: string;
      priority: string;
      dueDate?: string;
      status: string;
    }>;
    upcomingMeetings: Array<{
      id: number;
      title: string;
      date: string;
      startTime: string;
    }>;
    pendingActionItems: Array<{
      id: number;
      description: string;
      dueDate?: string;
      meetingTitle: string;
    }>;
  }> {
    await this.delay()
    
    const userDeadlines = mockUpcomingDeadlines.filter(deadline => 
      deadline.assignee.username === userId
    )
    
    return {
      stats: mockDashboardStats,
      assignedIssues: userDeadlines
        .filter(d => d.type === 'issue')
        .map(d => ({
          id: d.id,
          title: d.title,
          priority: d.priority,
          dueDate: d.dueDate,
          status: d.status
        })),
      upcomingMeetings: userDeadlines
        .filter(d => d.type === 'meeting')
        .map(d => ({
          id: d.id,
          title: d.title,
          date: d.dueDate,
          startTime: new Date(d.dueDate).toTimeString().slice(0, 5)
        })),
      pendingActionItems: userDeadlines
        .filter(d => d.type === 'action_item')
        .map(d => ({
          id: d.id,
          description: d.title,
          dueDate: d.dueDate,
          meetingTitle: 'Related Meeting'
        }))
    }
  }

  async getTeamPerformanceMetrics(teamId?: string, period?: 'week' | 'month' | 'quarter'): Promise<{
    completionRate: number;
    averageTaskTime: number;
    overdueRate: number;
    memberPerformance: Array<{
      memberId: string;
      memberName: string;
      tasksCompleted: number;
      averageCompletionTime: number;
      overdueTasks: number;
    }>;
  }> {
    await this.delay()
    
    return {
      completionRate: 87.5,
      averageTaskTime: 2.3,
      overdueRate: 8.2,
      memberPerformance: [
        {
          memberId: 'sarah_dev',
          memberName: 'Sarah Dev',
          tasksCompleted: 28,
          averageCompletionTime: 1.8,
          overdueTasks: 1
        },
        {
          memberId: 'mike_designer',
          memberName: 'Mike Designer',
          tasksCompleted: 22,
          averageCompletionTime: 2.1,
          overdueTasks: 0
        },
        {
          memberId: 'alex_devops',
          memberName: 'Alex DevOps',
          tasksCompleted: 18,
          averageCompletionTime: 3.2,
          overdueTasks: 3
        },
        {
          memberId: 'john_doe',
          memberName: 'John Doe',
          tasksCompleted: 19,
          averageCompletionTime: 2.0,
          overdueTasks: 0
        }
      ]
    }
  }

  private async delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const dashboardFixtures = new DashboardFixtures()