import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { teamService } from '@/services/api'
import type { TeamMember, CreateReminderRequest } from '@/types/Team.types'

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team', 'members'],
    queryFn: () => teamService.getTeamMembers(),
  })
}

export const useTeamMember = (id: string) => {
  return useQuery({
    queryKey: ['team', 'members', id],
    queryFn: () => teamService.getTeamMember(id),
    enabled: !!id,
  })
}

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TeamMember> }) =>
      teamService.updateTeamMember(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['team', 'members'] })
      queryClient.invalidateQueries({ queryKey: ['team', 'members', variables.id] })
    },
  })
}

export const useWorkloadSummary = (memberId?: string) => {
  return useQuery({
    queryKey: ['team', 'workload', memberId],
    queryFn: () => teamService.getWorkloadSummary(memberId),
  })
}

export interface RemindersParams {
  assigneeId?: string
  status?: string
  type?: string
  page?: number
  limit?: number
}

export const useReminders = (params?: RemindersParams) => {
  return useQuery({
    queryKey: ['team', 'reminders', params],
    queryFn: () => teamService.getReminders(params),
  })
}

export const useCreateReminder = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateReminderRequest) => teamService.createReminder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'reminders'] })
    },
  })
}

export const useUpdateReminder = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Reminder> }) =>
      teamService.updateReminder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'reminders'] })
    },
  })
}

export const useAcknowledgeReminder = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => teamService.acknowledgeReminder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'reminders'] })
    },
  })
}

export const useDismissReminder = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => teamService.dismissReminder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'reminders'] })
    },
  })
}

export const useSendReminders = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (reminderIds: number[]) => teamService.sendReminders(reminderIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'reminders'] })
    },
  })
}

export const useTeamUpcomingDeadlines = (memberId?: string, days?: number) => {
  return useQuery({
    queryKey: ['team', 'deadlines', memberId, days],
    queryFn: () => teamService.getUpcomingDeadlines(memberId, days),
  })
}

export const useCreateBulkReminders = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: {
      type: Reminder['type'];
      assigneeIds: string[];
      template: {
        title: string;
        description: string;
        priority: 'low' | 'medium' | 'high';
      };
      dueDate: string;
    }) => teamService.createBulkReminders(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'reminders'] })
    },
  })
}