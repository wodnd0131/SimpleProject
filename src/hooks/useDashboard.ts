import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/api'

export interface DashboardStatsParams {
  from?: string
  to?: string
}

export const useDashboardStats = (dateRange?: DashboardStatsParams) => {
  return useQuery({
    queryKey: ['dashboard', 'stats', dateRange],
    queryFn: () => dashboardService.getDashboardStats(dateRange),
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
    queryFn: () => dashboardService.getRecentActivity(params),
  })
}

export const useProjectProgress = (projectIds?: number[]) => {
  return useQuery({
    queryKey: ['dashboard', 'projects', 'progress', projectIds],
    queryFn: () => dashboardService.getProjectProgress(projectIds),
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
    queryFn: () => dashboardService.getUpcomingDeadlines(params),
  })
}

export const usePersonalDashboard = (userId: string) => {
  return useQuery({
    queryKey: ['dashboard', 'personal', userId],
    queryFn: () => dashboardService.getPersonalDashboard(userId),
    enabled: !!userId,
  })
}

export const useTeamPerformanceMetrics = (
  teamId?: string, 
  period?: 'week' | 'month' | 'quarter'
) => {
  return useQuery({
    queryKey: ['dashboard', 'team', 'performance', teamId, period],
    queryFn: () => dashboardService.getTeamPerformanceMetrics(teamId, period),
  })
}