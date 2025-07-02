import { BaseService } from './BaseService'
import type { MilestonesResponse, Milestone, ApiResponse } from '@/types/api'

class MilestoneService extends BaseService {
  constructor() {
    super('/milestones')
  }

  async getMilestones(state?: 'open' | 'closed' | 'all'): Promise<MilestonesResponse> {
    const params = state && state !== 'all' ? { state } : {}
    return this.get<MilestonesResponse>('', params)
  }

  async getMilestone(id: string): Promise<ApiResponse<Milestone>> {
    return this.get<ApiResponse<Milestone>>(`/${id}`)
  }

  async createMilestone(data: Omit<Milestone, 'id' | 'issueCount' | 'closedIssueCount'>): Promise<ApiResponse<Milestone>> {
    return this.post<ApiResponse<Milestone>>('', data)
  }

  async updateMilestone(id: string, data: Partial<Milestone>): Promise<ApiResponse<Milestone>> {
    return this.put<ApiResponse<Milestone>>(`/${id}`, data)
  }

  async deleteMilestone(id: string): Promise<void> {
    return this.delete<void>(`/${id}`)
  }

  async closeMilestone(id: string): Promise<ApiResponse<Milestone>> {
    return this.patch<ApiResponse<Milestone>>(`/${id}`, { state: 'closed' })
  }

  async reopenMilestone(id: string): Promise<ApiResponse<Milestone>> {
    return this.patch<ApiResponse<Milestone>>(`/${id}`, { state: 'open' })
  }
}

export const milestoneService = new MilestoneService()
export default milestoneService