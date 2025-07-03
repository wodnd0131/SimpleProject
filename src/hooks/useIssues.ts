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
      toastService.success('이슈가 성공적으로 생성되었습니다')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, '이슈 생성에 실패하였습니다')
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
      toastService.success('이슈가 성공적으로 업데이트되었습니다')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, '이슈 업데이트에 실패하였습니다')
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
      toastService.success('이슈가 성공적으로 닫혔습니다')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, '이슈 닫기에 실패하였습니다')
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
      toastService.success('이슈가 성공적으로 다시 열렸습니다')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, '이슈 다시 열기에 실패하였습니다')
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
      toastService.success('이슈가 성공적으로 삭제되었습니다')
    },
    onError: (error: Error) => {
      toastService.error(error.message, '이슈 삭제에 실패하였습니다')
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
      toastService.success('댑글이 성공적으로 추가되었습니다')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, '댑글 추가에 실패하였습니다')
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
      toastService.success('댑글이 성공적으로 업데이트되었습니다')
      return response
    },
    onError: (error: Error) => {
      toastService.error(error.message, '댑글 업데이트에 실패하였습니다')
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
      toastService.success('댑글이 성공적으로 삭제되었습니다')
    },
    onError: (error: Error) => {
      toastService.error(error.message, '댑글 삭제에 실패하였습니다')
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
      toastService.error(error.message, '댑글 추가에 실패하였습니다')
    },
    onSettled: (_, __, { issueId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.issues.comments(issueId) })
    },
  })
}