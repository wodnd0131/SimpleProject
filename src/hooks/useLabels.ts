import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/react-query'
import apiService from '@/services/ApiServiceProxy'
import toastService from '@/lib/toast'
import type { Label } from '@/types/api'

export function useLabels() {
  return useQuery({
    queryKey: queryKeys.labels.lists(),
    queryFn: () => apiService.labels.getLabels(),
  })
}

export function useLabel(id: string) {
  return useQuery({
    queryKey: queryKeys.labels.detail(id),
    queryFn: () => apiService.labels.getLabel(id),
    enabled: !!id,
  })
}

export function useCreateLabelMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<Label, 'id'>) => apiService.labels.createLabel(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.labels.lists() })
      toastService.success('Label created successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to create label')
    },
  })
}

export function useUpdateLabelMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Label> }) =>
      apiService.labels.updateLabel(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.labels.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.labels.lists() })
      toastService.success('Label updated successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to update label')
    },
  })
}

export function useDeleteLabelMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiService.labels.deleteLabel(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.labels.lists() })
      queryClient.removeQueries({ queryKey: queryKeys.labels.detail(id) })
      toastService.success('Label deleted successfully')
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to delete label')
    },
  })
}