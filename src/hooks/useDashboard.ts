import { useQuery } from '@tanstack/react-query'
import { apiService } from '@/services/ApiServiceProxy'

export interface DashboardStatsParams {
  from?: string
  to?: string
}

export const useDashboardStats = (dateRange?: DashboardStatsParams) => {
  return useQuery({
    queryKey: ['dashboard', 'stats', dateRange],
    queryFn: () => apiService.dashboard.getDashboardStats(dateRange),
  })
}

export interface RecentActivityParams {
  limit?: number
  page?: number
  types?: string[]
  userId?: string
}

export const useRecentActivity = (params?: RecentActivityParams) => {
  return useQuery({
    queryKey: ['dashboard', 'activity', params],
    queryFn: () => apiService.dashboard.getRecentActivity(params),
  })
}

export const useProjectProgress = (projectIds?: number[]) => {
  return useQuery({
    queryKey: ['dashboard', 'projects', 'progress', projectIds],
    queryFn: () => apiService.dashboard.getProjectProgress(projectIds),
  })
}

export interface UpcomingDeadlinesParams {
  days?: number
  assigneeId?: string
  priority?: string
  limit?: number
}

export const useUpcomingDeadlines = (params?: UpcomingDeadlinesParams) => {
  return useQuery({
    queryKey: ['dashboard', 'deadlines', params],
    queryFn: () => apiService.dashboard.getUpcomingDeadlines(params),
  })
}

export const usePersonalDashboard = (userId: string) => {
  return useQuery({
    queryKey: ['dashboard', 'personal', userId],
    queryFn: () => apiService.dashboard.getPersonalDashboard(userId),
    enabled: !!userId,
  })
}

export const useTeamPerformanceMetrics = (
  teamId?: string, 
  period?: 'week' | 'month' | 'quarter'
) => {
  return useQuery({
    queryKey: ['dashboard', 'team', 'performance', teamId, period],
    queryFn: () => apiService.dashboard.getTeamPerformanceMetrics(teamId, period),
  })
}