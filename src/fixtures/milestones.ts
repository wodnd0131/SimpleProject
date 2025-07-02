import type { MilestonesResponse, Milestone, ApiResponse } from '@/types/api'

const mockMilestones: Milestone[] = [
  {
    id: 'milestone-1',
    name: 'Auth System MVP',
    description: 'Basic OAuth 2.0 implementation and security improvements',
    state: 'open',
    dueDate: '2024-01-25T00:00:00Z',
    issueCount: 8,
    closedIssueCount: 6,
    projectId: '1'
  },
  {
    id: 'milestone-2',
    name: 'Auth System Complete',
    description: 'Full authentication system with advanced features',
    state: 'open',
    dueDate: '2024-01-31T00:00:00Z',
    issueCount: 10,
    closedIssueCount: 3,
    projectId: '1'
  },
  {
    id: 'milestone-3',
    name: 'Dashboard Core Redesign',
    description: 'Basic UI/UX improvements and responsive design',
    state: 'open',
    dueDate: '2024-02-01T00:00:00Z',
    issueCount: 12,
    closedIssueCount: 8,
    projectId: '2'
  },
  {
    id: 'milestone-4',
    name: 'Dashboard Advanced Features',
    description: 'Widget system and performance optimizations',
    state: 'open',
    dueDate: '2024-02-14T00:00:00Z',
    issueCount: 13,
    closedIssueCount: 3,
    projectId: '2'
  },
  {
    id: 'milestone-5',
    name: 'API Docs v2.0',
    description: 'Complete API documentation overhaul',
    state: 'open',
    dueDate: '2024-01-25T00:00:00Z',
    issueCount: 6,
    closedIssueCount: 2,
    projectId: '3'
  },
  {
    id: 'milestone-6',
    name: 'AI Core Implementation',
    description: 'Basic AI document processing pipeline',
    state: 'open',
    dueDate: '2024-02-10T00:00:00Z',
    issueCount: 8,
    closedIssueCount: 1,
    projectId: '4'
  },
  {
    id: 'milestone-7',
    name: 'AI Advanced Features',
    description: 'ML models and intelligent analysis features',
    state: 'open',
    dueDate: '2024-02-28T00:00:00Z',
    issueCount: 10,
    closedIssueCount: 0,
    projectId: '4'
  },
  {
    id: 'milestone-8',
    name: 'Mobile Optimization Complete',
    description: 'Performance improvements and feature enhancements',
    state: 'closed',
    dueDate: '2024-01-15T00:00:00Z',
    issueCount: 12,
    closedIssueCount: 12,
    projectId: '5'
  },
  {
    id: 'milestone-9',
    name: 'Collaboration Platform Beta',
    description: 'Core collaboration features and real-time updates',
    state: 'open',
    dueDate: '2024-03-01T00:00:00Z',
    issueCount: 15,
    closedIssueCount: 1,
    projectId: '6'
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

export default {
  mockMilestones
}