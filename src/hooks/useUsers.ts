import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/react-query'
import apiService from '@/services/ApiServiceProxy'
import toastService from '@/lib/toast'
import type { User } from '@/types/api'

export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: () => apiService.users.getUsers(),
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => apiService.users.getUser(id),
    enabled: !!id,
  })
}

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.users.current(),
    queryFn: () => apiService.users.getCurrentUser(),
  })
}

export function useSearchUsers(query?: string) {
  return useQuery({
    queryKey: queryKeys.users.list(query),
    queryFn: () => query ? apiService.users.searchUsers(query) : apiService.users.getUsers(),
    enabled: !!query || query === '',
  })
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      apiService.users.updateUser(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() })
      toastService.success('User updated successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to update user')
    },
  })
}

export function useUpdateCurrentUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<User>) => apiService.users.updateCurrentUser(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.current() })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() })
      toastService.success('Profile updated successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to update profile')
    },
  })
}