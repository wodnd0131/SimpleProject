import type {
  TeamMember,
  WorkloadSummary,
  Reminder,
  UpcomingDeadline
} from '@/types/Team.types'
import { mockTeamMembers } from './team'

export interface TeamMembersResponse {
  data: TeamMember[];
  success: boolean;
  message: string;
}

export interface WorkloadSummaryResponse {
  data: WorkloadSummary[];
  success: boolean;
  message: string;
}

export interface RemindersResponse {
  data: Reminder[];
  success: boolean;
  message: string;
}

export interface UpcomingDeadlinesResponse {
  data: UpcomingDeadline[];
  success: boolean;
  message: string;
}

export class TeamServiceFixtures {
  private teamMembers: TeamMember[] = [...mockTeamMembers]
  private workloadSummaries: WorkloadSummary[] = this.generateWorkloadSummaries()
  private reminders: Reminder[] = this.generateReminders()
  private upcomingDeadlines: UpcomingDeadline[] = this.generateUpcomingDeadlines()

  async getTeamMembers(): Promise<TeamMembersResponse> {
    await this.delay()
    
    return {
      data: this.teamMembers,
      success: true,
      message: 'Team members retrieved successfully'
    }
  }

  async getWorkloadSummary(): Promise<WorkloadSummaryResponse> {
    await this.delay()
    
    return {
      data: this.workloadSummaries,
      success: true,
      message: 'Workload summaries retrieved successfully'
    }
  }

  async getReminders(): Promise<RemindersResponse> {
    await this.delay()
    
    return {
      data: this.reminders,
      success: true,
      message: 'Reminders retrieved successfully'
    }
  }

  async getUpcomingDeadlines(): Promise<UpcomingDeadlinesResponse> {
    await this.delay()
    
    return {
      data: this.upcomingDeadlines,
      success: true,
      message: 'Upcoming deadlines retrieved successfully'
    }
  }

  private generateWorkloadSummaries(): WorkloadSummary[] {
    return this.teamMembers.map(member => ({
      memberId: member.id,
      totalAssigned: Math.floor(Math.random() * 15) + 5,
      inProgress: Math.floor(Math.random() * 8) + 2,
      completed: Math.floor(Math.random() * 25) + 10,
      overdue: Math.floor(Math.random() * 4),
      completionRate: Math.floor(Math.random() * 30) + 70,
      weeklyHours: Math.floor(Math.random() * 20) + 30,
      efficiency: Math.floor(Math.random() * 20) + 80
    }))
  }

  private generateReminders(): Reminder[] {
    const reminderTemplates = [
      {
        title: 'Code Review Due',
        description: 'Pull request #247 needs review by EOD',
        priority: 'high' as const,
        type: 'code_review' as const
      },
      {
        title: 'Weekly Standup',
        description: 'Team standup meeting starts in 30 minutes',
        priority: 'medium' as const,
        type: 'meeting' as const
      },
      {
        title: 'Sprint Planning',
        description: 'Prepare user stories for next sprint planning',
        priority: 'medium' as const,
        type: 'planning' as const
      },
      {
        title: 'Documentation Update',
        description: 'API documentation needs to be updated',
        priority: 'low' as const,
        type: 'documentation' as const
      },
      {
        title: 'Performance Review',
        description: '1:1 performance discussion scheduled',
        priority: 'high' as const,
        type: 'review' as const
      },
      {
        title: 'Bug Triage',
        description: 'Critical bug reported in production',
        priority: 'high' as const,
        type: 'bug' as const
      },
      {
        title: 'Team Lunch',
        description: 'Monthly team lunch at 12:00 PM',
        priority: 'low' as const,
        type: 'social' as const
      }
    ]

    return reminderTemplates.map((template, index) => ({
      id: index + 1,
      ...template,
      createdAt: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
      dueDate: new Date(Date.now() + Math.random() * 86400000 * 7).toISOString(),
      assignedTo: this.teamMembers[Math.floor(Math.random() * this.teamMembers.length)]
    }))
  }

  private generateUpcomingDeadlines(): UpcomingDeadline[] {
    const deadlineTemplates = [
      {
        title: 'User Authentication API',
        type: 'development' as const,
        status: 'in_progress' as const
      },
      {
        title: 'Mobile App UI Design',
        type: 'design' as const,
        status: 'pending' as const
      },
      {
        title: 'Database Migration',
        type: 'infrastructure' as const,
        status: 'in_progress' as const
      },
      {
        title: 'Security Audit Report',
        type: 'security' as const,
        status: 'overdue' as const
      },
      {
        title: 'Client Presentation',
        type: 'meeting' as const,
        status: 'pending' as const
      },
      {
        title: 'Performance Testing',
        type: 'testing' as const,
        status: 'in_progress' as const
      },
      {
        title: 'Product Roadmap Review',
        type: 'planning' as const,
        status: 'pending' as const
      },
      {
        title: 'Integration Testing',
        type: 'testing' as const,
        status: 'in_progress' as const
      }
    ]

    return deadlineTemplates.map((template, index) => {
      const daysRemaining = template.status === 'overdue' 
        ? -Math.floor(Math.random() * 5) - 1 
        : Math.floor(Math.random() * 14) + 1
      
      return {
        id: index + 1,
        ...template,
        assignee: this.teamMembers[Math.floor(Math.random() * this.teamMembers.length)],
        dueDate: new Date(Date.now() + daysRemaining * 86400000).toISOString(),
        daysRemaining: Math.abs(daysRemaining),
        createdAt: new Date(Date.now() - Math.random() * 86400000 * 14).toISOString()
      }
    })
  }

  private async delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const teamServiceFixtures = new TeamServiceFixtures()