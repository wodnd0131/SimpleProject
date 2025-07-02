import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
})

export const queryKeys = {
  issues: {
    all: ['issues'] as const,
    lists: () => [...queryKeys.issues.all, 'list'] as const,
    list: (params?: any) => [...queryKeys.issues.lists(), params] as const,
    details: () => [...queryKeys.issues.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.issues.details(), id] as const,
    comments: (issueId: number) => [...queryKeys.issues.detail(issueId), 'comments'] as const,
  },
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (query?: string) => [...queryKeys.users.lists(), query] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    current: () => [...queryKeys.users.all, 'current'] as const,
  },
  labels: {
    all: ['labels'] as const,
    lists: () => [...queryKeys.labels.all, 'list'] as const,
    details: () => [...queryKeys.labels.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.labels.details(), id] as const,
  },
  milestones: {
    all: ['milestones'] as const,
    lists: () => [...queryKeys.milestones.all, 'list'] as const,
    list: (state?: 'open' | 'closed' | 'all') => [...queryKeys.milestones.lists(), state] as const,
    details: () => [...queryKeys.milestones.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.milestones.details(), id] as const,
  },
  projects: {
    all: ['projects'] as const,
    lists: () => [...queryKeys.projects.all, 'list'] as const,
    details: () => [...queryKeys.projects.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.projects.details(), id] as const,
  },
} as const