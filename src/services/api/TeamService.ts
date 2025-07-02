import { BaseService } from './BaseService'
import type {
  TeamMember,
  WorkloadSummary,
  Reminder,
  CreateReminderRequest
} from '@/types/Team.types'

export interface TeamMembersResponse {
  data: TeamMember[];
}

export interface TeamMemberResponse {
  data: TeamMember;
}

export interface WorkloadSummaryResponse {
  data: WorkloadSummary[];
}

export interface RemindersResponse {
  data: Reminder[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ReminderResponse {
  data: Reminder;
}

class TeamService extends BaseService {
  constructor() {
    super('/team')
  }

  async getTeamMembers(): Promise<TeamMembersResponse> {
    return this.get<TeamMembersResponse>('/members')
  }

  async getTeamMember(id: string): Promise<TeamMemberResponse> {
    return this.get<TeamMemberResponse>(`/members/${id}`)
  }

  async updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMemberResponse> {
    return this.put<TeamMemberResponse>(`/members/${id}`, data)
  }

  async getWorkloadSummary(memberId?: string): Promise<WorkloadSummaryResponse> {
    const endpoint = memberId ? `/workload/${memberId}` : '/workload'
    return this.get<WorkloadSummaryResponse>(endpoint)
  }

  async getReminders(params?: { 
    assigneeId?: string; 
    status?: string; 
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<RemindersResponse> {
    const query = params ? this.buildQuery(params) : {}
    return this.get<RemindersResponse>('/reminders', query)
  }

  async createReminder(data: CreateReminderRequest): Promise<ReminderResponse> {
    return this.post<ReminderResponse>('/reminders', data)
  }

  async updateReminder(id: number, data: Partial<Reminder>): Promise<ReminderResponse> {
    return this.put<ReminderResponse>(`/reminders/${id}`, data)
  }

  async acknowledgeReminder(id: number): Promise<ReminderResponse> {
    return this.patch<ReminderResponse>(`/reminders/${id}`, { status: 'acknowledged' })
  }

  async dismissReminder(id: number): Promise<ReminderResponse> {
    return this.patch<ReminderResponse>(`/reminders/${id}`, { status: 'dismissed' })
  }

  async sendReminders(reminderIds: number[]): Promise<{ sent: number; failed: number }> {
    return this.post<{ sent: number; failed: number }>('/reminders/send', { reminderIds })
  }

  async getUpcomingDeadlines(memberId?: string, days?: number): Promise<{
    data: Array<{
      id: number;
      title: string;
      type: 'issue' | 'meeting' | 'action_item';
      dueDate: string;
      assignee: TeamMember;
      priority: 'low' | 'medium' | 'high';
      daysRemaining: number;
    }>;
  }> {
    const params = { memberId, days }
    return this.get('/deadlines', params)
  }

  async createBulkReminders(data: {
    type: Reminder['type'];
    assigneeIds: string[];
    template: {
      title: string;
      description: string;
      priority: 'low' | 'medium' | 'high';
    };
    dueDate: string;
  }): Promise<{ created: number; failed: number }> {
    return this.post<{ created: number; failed: number }>('/reminders/bulk', data)
  }
}

export const teamService = new TeamService()
export default teamService