import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/react-query'
import apiService from '@/services/ApiServiceProxy'
import toastService from '@/lib/toast'
import type { 
  SearchIssuesRequest, 
  CreateIssueRequest, 
  UpdateIssueRequest 
} from '@/types/api'

export function useIssues(params?: SearchIssuesRequest) {
  return useQuery({
    queryKey: queryKeys.issues.list(params),
    queryFn: () => apiService.issues.getIssues(params),
    placeholderData: (previousData) => previousData,
  })
}

export function useIssue(id: number) {
  return useQuery({
    queryKey: queryKeys.issues.detail(id),
    queryFn: () => apiService.issues.getIssue(id),
    enabled: !!id,
  })
}

export function useIssueComments(issueId: number) {
  return useQuery({
    queryKey: queryKeys.issues.comments(issueId),
    queryFn: () => apiService.issues.getComments(issueId),
    enabled: !!issueId,
  })
}

export function useCreateIssueMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateIssueRequest) => apiService.issues.createIssue(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.lists() })
      toastService.success('Issue created successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to create issue')
    },
  })
}

export function useUpdateIssueMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateIssueRequest }) =>
      apiService.issues.updateIssue(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.lists() })
      toastService.success('Issue updated successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to update issue')
    },
  })
}

export function useCloseIssueMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => apiService.issues.closeIssue(id),
    onSuccess: (response, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.lists() })
      toastService.success('Issue closed successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to close issue')
    },
  })
}

export function useReopenIssueMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => apiService.issues.reopenIssue(id),
    onSuccess: (response, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.lists() })
      toastService.success('Issue reopened successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to reopen issue')
    },
  })
}

export function useDeleteIssueMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => apiService.issues.deleteIssue(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.lists() })
      queryClient.removeQueries({ queryKey: queryKeys.issues.detail(id) })
      toastService.success('Issue deleted successfully')
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to delete issue')
    },
  })
}

export function useAddCommentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ issueId, body }: { issueId: number; body: string }) =>
      apiService.issues.addComment(issueId, { body }),
    onSuccess: (response, { issueId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.comments(issueId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.detail(issueId) })
      toastService.success('Comment added successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to add comment')
    },
  })
}

export function useUpdateCommentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ 
      issueId, 
      commentId, 
      body 
    }: { 
      issueId: number; 
      commentId: number; 
      body: string 
    }) => apiService.issues.updateComment(issueId, commentId, { body }),
    onSuccess: (response, { issueId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.comments(issueId) })
      toastService.success('Comment updated successfully')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to update comment')
    },
  })
}

export function useDeleteCommentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ issueId, commentId }: { issueId: number; commentId: number }) =>
      apiService.issues.deleteComment(issueId, commentId),
    onSuccess: (_, { issueId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.comments(issueId) })
      toastService.success('Comment deleted successfully')
    },
    onError: (error: Error) => {
      toastService.error(error.message, 'Failed to delete comment')
    },
  })
}

// Optimistic update for adding comments
export function useOptimisticAddComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ issueId, body }: { issueId: number; body: string }) =>
      apiService.issues.addComment(issueId, { body }),
    onMutate: async ({ issueId, body }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.issues.comments(issueId) })
      
      const previousComments = queryClient.getQueryData(queryKeys.issues.comments(issueId))
      
      const optimisticComment = {
        id: Date.now(), // Temporary ID
        body,
        author: {
          username: 'current-user',
          avatar: '/placeholder.svg'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      queryClient.setQueryData(queryKeys.issues.comments(issueId), (old: any) => ({
        ...old,
        data: [...(old?.data || []), optimisticComment]
      }))

      return { previousComments }
    },
    onError: (error, { issueId }, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(queryKeys.issues.comments(issueId), context.previousComments)
      }
      toastService.error(error.message, 'Failed to add comment')
    },
    onSettled: (_, __, { issueId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.comments(issueId) })
    },
  })
}