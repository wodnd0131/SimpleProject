import type {
  MeetingMinutes,
  ActionItem,
  CreateMeetingMinutesRequest,
  UpdateMeetingMinutesRequest
} from '@/types/MeetingMinutes.types'
import {
  mockMeetingMinutes,
  mockActionItems
} from './meetingMinutes'

export interface MeetingMinutesResponse {
  data: MeetingMinutes[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
  message: string;
}

export interface MeetingMinuteResponse {
  data: MeetingMinutes;
  success: boolean;
  message: string;
}

export interface ActionItemsResponse {
  data: ActionItem[];
  success: boolean;
  message: string;
}

export class MeetingMinutesFixtures {
  private meetings: MeetingMinutes[] = [...mockMeetingMinutes]
  private actionItems: ActionItem[] = [...mockActionItems]
  private idCounter = Math.max(...this.meetings.map(m => m.id)) + 1

  async getMeetingMinutes(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<MeetingMinutesResponse> {
    await this.delay()
    
    const page = params?.page || 1
    const limit = params?.limit || 20
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    let filteredMeetings = [...this.meetings]
    
    if (params?.status && params.status !== 'all') {
      filteredMeetings = filteredMeetings.filter(meeting => 
        meeting.status === params.status
      )
    }
    
    // Sort by date (newest first)
    filteredMeetings.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    
    const paginatedMeetings = filteredMeetings.slice(startIndex, endIndex)
    
    return {
      data: paginatedMeetings,
      pagination: {
        page,
        limit,
        total: filteredMeetings.length,
        totalPages: Math.ceil(filteredMeetings.length / limit)
      },
      success: true,
      message: 'Meeting minutes retrieved successfully'
    }
  }

  async getMeetingMinute(id: number): Promise<MeetingMinuteResponse> {
    await this.delay()
    
    const meeting = this.meetings.find(m => m.id === id)
    
    if (!meeting) {
      throw new Error(`Meeting with id ${id} not found`)
    }

    return {
      data: meeting,
      success: true,
      message: 'Meeting minute retrieved successfully'
    }
  }

  async createMeetingMinutes(data: CreateMeetingMinutesRequest): Promise<MeetingMinuteResponse> {
    await this.delay()
    
    const newMeeting: MeetingMinutes = {
      id: this.idCounter++,
      title: data.title,
      content: data.content,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      participants: data.participants?.map(p => ({ username: p, avatar: '', role: 'participant' })) || [],
      agenda: data.agenda || [],
      actionItems: [],
      decisions: [],
      attachments: [],
      createdBy: { username: 'system', avatar: '' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: data.status || 'draft'
    }

    this.meetings.unshift(newMeeting)

    return {
      data: newMeeting,
      success: true,
      message: 'Meeting minutes created successfully'
    }
  }

  async updateMeetingMinutes(id: number, data: UpdateMeetingMinutesRequest): Promise<MeetingMinuteResponse> {
    await this.delay()
    
    const meetingIndex = this.meetings.findIndex(m => m.id === id)
    
    if (meetingIndex === -1) {
      throw new Error(`Meeting with id ${id} not found`)
    }

    const updatedMeeting = {
      ...this.meetings[meetingIndex],
      ...data,
      updatedAt: new Date().toISOString()
    }

    this.meetings[meetingIndex] = updatedMeeting

    return {
      data: updatedMeeting,
      success: true,
      message: 'Meeting minutes updated successfully'
    }
  }

  async deleteMeetingMinutes(id: number): Promise<void> {
    await this.delay()
    
    const meetingIndex = this.meetings.findIndex(m => m.id === id)
    
    if (meetingIndex === -1) {
      throw new Error(`Meeting with id ${id} not found`)
    }

    this.meetings.splice(meetingIndex, 1)
  }

  async publishMeetingMinutes(id: number): Promise<MeetingMinuteResponse> {
    await this.delay()
    
    const meetingIndex = this.meetings.findIndex(m => m.id === id)
    
    if (meetingIndex === -1) {
      throw new Error(`Meeting with id ${id} not found`)
    }

    this.meetings[meetingIndex].status = 'published'
    this.meetings[meetingIndex].updatedAt = new Date().toISOString()

    return {
      data: this.meetings[meetingIndex],
      success: true,
      message: 'Meeting minutes published successfully'
    }
  }

  async getActionItems(meetingId: number): Promise<ActionItemsResponse> {
    await this.delay()
    
    const meeting = this.meetings.find(m => m.id === meetingId)
    
    if (!meeting) {
      throw new Error(`Meeting with id ${meetingId} not found`)
    }

    return {
      data: meeting.actionItems,
      success: true,
      message: 'Action items retrieved successfully'
    }
  }

  async convertActionItemToIssue(
    meetingId: number,
    actionItemId: number,
    issueData: {
      title: string;
      body: string;
      assignee?: string;
      labels?: string[];
      milestone?: string;
    }
  ): Promise<{ issue: unknown; success: boolean; message: string }> {
    await this.delay()
    
    const meeting = this.meetings.find(m => m.id === meetingId)
    
    if (!meeting) {
      throw new Error(`Meeting with id ${meetingId} not found`)
    }

    const actionItem = meeting.actionItems.find(item => item.id === actionItemId)
    
    if (!actionItem) {
      throw new Error(`Action item with id ${actionItemId} not found`)
    }

    // Mock issue creation
    const newIssue = {
      id: Math.floor(Math.random() * 1000) + 100,
      number: Math.floor(Math.random() * 1000) + 100,
      title: issueData.title,
      body: issueData.body,
      state: 'open',
      createdAt: new Date().toISOString(),
      sourceActionItem: actionItemId,
      sourceMeeting: meetingId
    }

    // Update action item to link to issue
    actionItem.linkedIssueId = newIssue.id

    return {
      issue: newIssue,
      success: true,
      message: 'Action item converted to issue successfully'
    }
  }

  async updateActionItem(
    meetingId: number,
    actionItemId: number,
    data: Partial<ActionItem>
  ): Promise<{ data: ActionItem; success: boolean; message: string }> {
    await this.delay()
    
    const meeting = this.meetings.find(m => m.id === meetingId)
    
    if (!meeting) {
      throw new Error(`Meeting with id ${meetingId} not found`)
    }

    const actionItemIndex = meeting.actionItems.findIndex(item => item.id === actionItemId)
    
    if (actionItemIndex === -1) {
      throw new Error(`Action item with id ${actionItemId} not found`)
    }

    const updatedActionItem = {
      ...meeting.actionItems[actionItemIndex],
      ...data
    }

    meeting.actionItems[actionItemIndex] = updatedActionItem

    return {
      data: updatedActionItem,
      success: true,
      message: 'Action item updated successfully'
    }
  }

  async searchMeetingMinutes(
    query: string,
    filters?: {
      dateFrom?: string;
      dateTo?: string;
      participants?: string[];
      status?: string;
    }
  ): Promise<MeetingMinutesResponse> {
    await this.delay()
    
    let filteredMeetings = [...this.meetings]
    
    // Text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase()
      filteredMeetings = filteredMeetings.filter(meeting =>
        meeting.title.toLowerCase().includes(searchTerm) ||
        meeting.content.toLowerCase().includes(searchTerm) ||
        meeting.participants.some(p => p.username.toLowerCase().includes(searchTerm))
      )
    }
    
    // Date filters
    if (filters?.dateFrom) {
      filteredMeetings = filteredMeetings.filter(meeting =>
        new Date(meeting.date) >= new Date(filters.dateFrom!)
      )
    }
    
    if (filters?.dateTo) {
      filteredMeetings = filteredMeetings.filter(meeting =>
        new Date(meeting.date) <= new Date(filters.dateTo!)
      )
    }
    
    // Participants filter
    if (filters?.participants && filters.participants.length > 0) {
      filteredMeetings = filteredMeetings.filter(meeting =>
        meeting.participants.some(p => filters.participants!.includes(p.username))
      )
    }
    
    // Status filter
    if (filters?.status && filters.status !== 'all') {
      filteredMeetings = filteredMeetings.filter(meeting =>
        meeting.status === filters.status
      )
    }
    
    return {
      data: filteredMeetings,
      pagination: {
        page: 1,
        limit: filteredMeetings.length,
        total: filteredMeetings.length,
        totalPages: 1
      },
      success: true,
      message: 'Meeting search completed successfully'
    }
  }

  private async delay(ms: number = 400): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const meetingMinutesFixtures = new MeetingMinutesFixtures()