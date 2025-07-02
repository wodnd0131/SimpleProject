import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/react-query'
import apiService from '@/services/ApiServiceProxy'
import toastService from '@/lib/toast'
import type { Project } from '@/types/api'

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects.lists(),
    queryFn: () => apiService.projects.getProjects(),
  })
}

export function useProject(id: string) {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => apiService.projects.getProject(id),
    enabled: !!id,
  })
}

export function useCreateProjectMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<Project, 'id'>) => apiService.projects.createProject(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.lists() })
      toastService.success('Project created successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to create project')
    },
  })
}

export function useUpdateProjectMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) =>
      apiService.projects.updateProject(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.lists() })
      toastService.success('Project updated successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to update project')
    },
  })
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiService.projects.deleteProject(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.lists() })
      queryClient.removeQueries({ queryKey: queryKeys.projects.detail(id) })
      toastService.success('Project deleted successfully')
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to delete project')
    },
  })
}