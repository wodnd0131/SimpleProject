import { BaseService } from './BaseService'
import type {
  MeetingMinutes,
  CreateMeetingMinutesRequest,
  UpdateMeetingMinutesRequest,
  ActionItem
} from '@/types/MeetingMinutes.types'

export interface MeetingMinutesResponse {
  data: MeetingMinutes;
}

export interface MeetingMinutesListResponse {
  data: MeetingMinutes[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ActionItemsResponse {
  data: ActionItem[];
}

class MeetingMinutesService extends BaseService {
  constructor() {
    super('/meeting-minutes')
  }

  async getMeetingMinutes(params?: { page?: number; limit?: number; status?: string }): Promise<MeetingMinutesListResponse> {
    const query = params ? this.buildQuery(params) : {}
    return this.get<MeetingMinutesListResponse>('', query)
  }

  async getMeetingMinute(id: number): Promise<MeetingMinutesResponse> {
    return this.get<MeetingMinutesResponse>(`/${id}`)
  }

  async createMeetingMinutes(data: CreateMeetingMinutesRequest): Promise<MeetingMinutesResponse> {
    return this.post<MeetingMinutesResponse>('', data)
  }

  async updateMeetingMinutes(id: number, data: UpdateMeetingMinutesRequest): Promise<MeetingMinutesResponse> {
    return this.put<MeetingMinutesResponse>(`/${id}`, data)
  }

  async deleteMeetingMinutes(id: number): Promise<void> {
    return this.delete<void>(`/${id}`)
  }

  async publishMeetingMinutes(id: number): Promise<MeetingMinutesResponse> {
    return this.patch<MeetingMinutesResponse>(`/${id}`, { status: 'published' })
  }

  async archiveMeetingMinutes(id: number): Promise<MeetingMinutesResponse> {
    return this.patch<MeetingMinutesResponse>(`/${id}`, { status: 'archived' })
  }

  async getActionItems(meetingId: number): Promise<ActionItemsResponse> {
    return this.get<ActionItemsResponse>(`/${meetingId}/action-items`)
  }

  async convertActionItemToIssue(meetingId: number, actionItemId: number, issueData: {
    title: string;
    body: string;
    assignee?: string;
    labels?: string[];
    milestone?: string;
  }): Promise<{ issueId: number; actionItemId: number }> {
    return this.post<{ issueId: number; actionItemId: number }>(`/${meetingId}/action-items/${actionItemId}/convert-to-issue`, issueData)
  }

  async updateActionItem(meetingId: number, actionItemId: number, data: Partial<ActionItem>): Promise<ActionItem> {
    return this.put<ActionItem>(`/${meetingId}/action-items/${actionItemId}`, data)
  }

  async searchMeetingMinutes(query: string, filters?: { 
    dateFrom?: string; 
    dateTo?: string; 
    participants?: string[];
    status?: string;
  }): Promise<MeetingMinutesListResponse> {
    const params = { q: query, ...filters }
    return this.get<MeetingMinutesListResponse>('/search', params)
  }
}

export const meetingMinutesService = new MeetingMinutesService()
export default meetingMinutesService