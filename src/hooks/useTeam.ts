import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '@/services/ApiServiceProxy'
import type { TeamMember, CreateReminderRequest, Reminder } from '@/types/Team.types'

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team', 'members'],
    queryFn: () => apiService.team.getTeamMembers(),
  })
}

export const useTeamMember = (id: string) => {
  return useQuery({
    queryKey: ['team', 'members', id],
    queryFn: () => apiService.team.getTeamMember(id),
    enabled: !!id,
  })
}

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TeamMember> }) =>
      apiService.team.updateTeamMember(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['team', 'members'] })
      queryClient.invalidateQueries({ queryKey: ['team', 'members', variables.id] })
    },
  })
}

export const useWorkloadSummary = () => {
  return useQuery({
    queryKey: ['team', 'workload'],
    queryFn: () => apiService.team.getWorkloadSummary(),
  })
}

export interface RemindersParams {
  assigneeId?: string
  status?: string
  type?: string
  page?: number
  limit?: number
}

export const useReminders = () => {
  return useQuery({
    queryKey: ['team', 'reminders'],
    queryFn: () => apiService.team.getReminders(),
  })
}


export const useCreateReminder = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateReminderRequest) => apiService.team.createReminder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'reminders'] })
    },
  })
}

export const useUpdateReminder = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Reminder> }) =>
      apiService.team.updateReminder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'reminders'] })
    },
  })
}

export const useAcknowledgeReminder = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => apiService.team.acknowledgeReminder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'reminders'] })
    },
  })
}

export const useDismissReminder = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => apiService.team.dismissReminder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'reminders'] })
    },
  })
}

export const useSendReminders = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (reminderIds: number[]) => apiService.team.sendReminders(reminderIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'reminders'] })
    },
  })
}

export const useTeamUpcomingDeadlines = (memberId?: string, days?: number) => {
  return useQuery({
    queryKey: ['team', 'deadlines', memberId, days],
    queryFn: () => apiService.team.getUpcomingDeadlines(memberId, days),
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
    }) => apiService.team.createBulkReminders(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'reminders'] })
    },
  })
}