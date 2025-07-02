import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '@/services/ApiServiceProxy'
import type { 
  CreateMeetingMinutesRequest, 
  UpdateMeetingMinutesRequest,
  ActionItem
} from '@/types/MeetingMinutes.types'

export interface MeetingMinutesParams {
  page?: number
  limit?: number
  status?: string
}

export const useMeetingMinutes = (params?: MeetingMinutesParams) => {
  return useQuery({
    queryKey: ['meeting-minutes', params],
    queryFn: () => apiService.meetingMinutes.getMeetingMinutes(params),
  })
}

export const useMeetingMinute = (id: number) => {
  return useQuery({
    queryKey: ['meeting-minutes', id],
    queryFn: () => apiService.meetingMinutes.getMeetingMinute(id),
    enabled: !!id,
  })
}

export const useCreateMeetingMinutes = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateMeetingMinutesRequest) => 
      apiService.meetingMinutes.createMeetingMinutes(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meeting-minutes'] })
    },
  })
}

export const useUpdateMeetingMinutes = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMeetingMinutesRequest }) =>
      apiService.meetingMinutes.updateMeetingMinutes(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['meeting-minutes'] })
      queryClient.invalidateQueries({ queryKey: ['meeting-minutes', variables.id] })
    },
  })
}

export const useDeleteMeetingMinutes = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => apiService.meetingMinutes.deleteMeetingMinutes(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meeting-minutes'] })
    },
  })
}

export const usePublishMeetingMinutes = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => apiService.meetingMinutes.publishMeetingMinutes(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['meeting-minutes'] })
      queryClient.invalidateQueries({ queryKey: ['meeting-minutes', id] })
    },
  })
}

export const useActionItems = (meetingId: number) => {
  return useQuery({
    queryKey: ['meeting-minutes', meetingId, 'action-items'],
    queryFn: () => apiService.meetingMinutes.getActionItems(meetingId),
    enabled: !!meetingId,
  })
}

export const useConvertActionItemToIssue = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ 
      meetingId, 
      actionItemId, 
      issueData 
    }: { 
      meetingId: number; 
      actionItemId: number; 
      issueData: {
        title: string;
        body: string;
        assignee?: string;
        labels?: string[];
        milestone?: string;
      }
    }) => apiService.meetingMinutes.convertActionItemToIssue(meetingId, actionItemId, issueData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['meeting-minutes', variables.meetingId, 'action-items'] })
      queryClient.invalidateQueries({ queryKey: ['issues'] })
    },
  })
}

export const useUpdateActionItem = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ 
      meetingId, 
      actionItemId, 
      data 
    }: { 
      meetingId: number; 
      actionItemId: number; 
      data: Partial<ActionItem> 
    }) => apiService.meetingMinutes.updateActionItem(meetingId, actionItemId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['meeting-minutes', variables.meetingId, 'action-items'] })
    },
  })
}

export const useSearchMeetingMinutes = (
  query: string, 
  filters?: { 
    dateFrom?: string; 
    dateTo?: string; 
    participants?: string[];
    status?: string;
  }
) => {
  return useQuery({
    queryKey: ['meeting-minutes', 'search', query, filters],
    queryFn: () => apiService.meetingMinutes.searchMeetingMinutes(query, filters),
    enabled: !!query,
  })
}