import { BaseService } from './BaseService'
import type {
  DashboardStats,
  RecentActivity,
  ProjectProgress,
  UpcomingDeadline
} from '@/types/Dashboard.types'

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

class DashboardService extends BaseService {
  constructor() {
    super('/dashboard')
  }

  async getDashboardStats(dateRange?: { from: string; to: string }): Promise<DashboardStatsResponse> {
    const query = dateRange ? this.buildQuery(dateRange) : {}
    return this.get<DashboardStatsResponse>('/stats', query)
  }

  async getRecentActivity(params?: { 
    limit?: number; 
    page?: number;
    types?: string[];
    userId?: string;
  }): Promise<RecentActivityResponse> {
    const query = params ? this.buildQuery(params) : {}
    return this.get<RecentActivityResponse>('/activity', query)
  }

  async getProjectProgress(projectIds?: number[]): Promise<ProjectProgressResponse> {
    const query = projectIds ? { projectIds: projectIds.join(',') } : {}
    return this.get<ProjectProgressResponse>('/projects/progress', query)
  }

  async getUpcomingDeadlines(params?: {
    days?: number;
    assigneeId?: string;
    priority?: string;
    limit?: number;
  }): Promise<UpcomingDeadlinesResponse> {
    const query = params ? this.buildQuery(params) : {}
    return this.get<UpcomingDeadlinesResponse>('/deadlines', query)
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
    return this.get(`/personal/${userId}`)
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
    const query = { teamId, period }
    return this.get('/team/performance', query)
  }
}

export const dashboardService = new DashboardService()
export default dashboardService