import type { MilestonesResponse, Milestone, ApiResponse } from '@/types/api'

const mockMilestones: Milestone[] = [
  {
    id: '1',
    name: 'v1.0.0',
    description: 'First major release',
    state: 'open',
    dueDate: '2024-03-01T00:00:00Z',
    issueCount: 15,
    closedIssueCount: 8
  },
  {
    id: '2',
    name: 'v1.1.0',
    description: 'Minor feature updates',
    state: 'open',
    dueDate: '2024-04-15T00:00:00Z',
    issueCount: 8,
    closedIssueCount: 2
  },
  {
    id: '3',
    name: 'v2.0.0',
    description: 'Major refactor',
    state: 'open',
    dueDate: '2024-06-01T00:00:00Z',
    issueCount: 25,
    closedIssueCount: 0
  },
  {
    id: '4',
    name: 'v0.9.0',
    description: 'Beta release',
    state: 'closed',
    dueDate: '2024-01-15T00:00:00Z',
    issueCount: 12,
    closedIssueCount: 12
  }
]

let milestoneIdCounter = mockMilestones.length + 1

export class MilestoneFixtures {
  private milestones: Milestone[] = [...mockMilestones]

  async getMilestones(state?: 'open' | 'closed' | 'all'): Promise<MilestonesResponse> {
    await this.delay()
    
    let filteredMilestones = [...this.milestones]
    
    if (state && state !== 'all') {
      filteredMilestones = filteredMilestones.filter(milestone => milestone.state === state)
    }

    return {
      data: filteredMilestones,
      success: true,
      message: 'Milestones retrieved successfully'
    }
  }

  async getMilestone(id: string): Promise<ApiResponse<Milestone>> {
    await this.delay()
    
    const milestone = this.milestones.find(m => m.id === id)
    
    if (!milestone) {
      throw new Error(`Milestone with id ${id} not found`)
    }

    return {
      data: milestone,
      success: true,
      message: 'Milestone retrieved successfully'
    }
  }

  async createMilestone(data: Omit<Milestone, 'id' | 'issueCount' | 'closedIssueCount'>): Promise<ApiResponse<Milestone>> {
    await this.delay()
    
    const newMilestone: Milestone = {
      id: (milestoneIdCounter++).toString(),
      issueCount: 0,
      closedIssueCount: 0,
      ...data
    }

    this.milestones.push(newMilestone)

    return {
      data: newMilestone,
      success: true,
      message: 'Milestone created successfully'
    }
  }

  async updateMilestone(id: string, data: Partial<Milestone>): Promise<ApiResponse<Milestone>> {
    await this.delay()
    
    const milestoneIndex = this.milestones.findIndex(m => m.id === id)
    
    if (milestoneIndex === -1) {
      throw new Error(`Milestone with id ${id} not found`)
    }

    const updatedMilestone = { ...this.milestones[milestoneIndex], ...data }
    this.milestones[milestoneIndex] = updatedMilestone

    return {
      data: updatedMilestone,
      success: true,
      message: 'Milestone updated successfully'
    }
  }

  async deleteMilestone(id: string): Promise<void> {
    await this.delay()
    
    const milestoneIndex = this.milestones.findIndex(m => m.id === id)
    
    if (milestoneIndex === -1) {
      throw new Error(`Milestone with id ${id} not found`)
    }

    this.milestones.splice(milestoneIndex, 1)
  }

  private async delay(ms: number = 250): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const milestoneFixtures = new MilestoneFixtures()