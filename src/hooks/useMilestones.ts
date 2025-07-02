import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/react-query'
import apiService from '@/services/ApiServiceProxy'
import toastService from '@/lib/toast'
import type { Milestone } from '@/types/api'

export function useMilestones(state?: 'open' | 'closed' | 'all') {
  return useQuery({
    queryKey: queryKeys.milestones.list(state),
    queryFn: () => apiService.milestones.getMilestones(state),
  })
}

export function useMilestone(id: string) {
  return useQuery({
    queryKey: queryKeys.milestones.detail(id),
    queryFn: () => apiService.milestones.getMilestone(id),
    enabled: !!id,
  })
}

export function useCreateMilestoneMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<Milestone, 'id' | 'issueCount' | 'closedIssueCount'>) =>
      apiService.milestones.createMilestone(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.milestones.lists() })
      toastService.success('Milestone created successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to create milestone')
    },
  })
}

export function useUpdateMilestoneMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Milestone> }) =>
      apiService.milestones.updateMilestone(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.milestones.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.milestones.lists() })
      toastService.success('Milestone updated successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to update milestone')
    },
  })
}

export function useDeleteMilestoneMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiService.milestones.deleteMilestone(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.milestones.lists() })
      queryClient.removeQueries({ queryKey: queryKeys.milestones.detail(id) })
      toastService.success('Milestone deleted successfully')
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to delete milestone')
    },
  })
}

export function useCloseMilestoneMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiService.milestones.closeMilestone(id),
    onSuccess: (response, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.milestones.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.milestones.lists() })
      toastService.success('Milestone closed successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to close milestone')
    },
  })
}

export function useReopenMilestoneMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiService.milestones.reopenMilestone(id),
    onSuccess: (response, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.milestones.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.milestones.lists() })
      toastService.success('Milestone reopened successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to reopen milestone')
    },
  })
}