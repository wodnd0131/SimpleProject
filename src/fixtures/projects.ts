import type { ProjectsResponse, Project, ApiResponse } from '@/types/api'

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Authentication System Upgrade',
    description: 'Modernize authentication with OAuth 2.0 and improve security measures',
    color: '#0366d6',
    status: 'in_progress',
    priority: 'high',
    startDate: '2023-12-01',
    dueDate: '2024-01-31',
    completionPercentage: 78,
    teamMembers: ['sarah_dev', 'alex_devops', 'john_doe'],
    budget: 45000,
    spentBudget: 32000,
    tags: ['security', 'authentication', 'backend']
  },
  {
    id: '2',
    name: 'Dashboard Redesign',
    description: 'Complete UI/UX overhaul of the main dashboard with improved performance',
    color: '#28a745',
    status: 'in_progress',
    priority: 'high',
    startDate: '2024-01-05',
    dueDate: '2024-02-14',
    completionPercentage: 64,
    teamMembers: ['mike_designer', 'sarah_dev', 'john_doe'],
    budget: 38000,
    spentBudget: 22000,
    tags: ['ui/ux', 'frontend', 'performance']
  },
  {
    id: '3',
    name: 'API Documentation Update',
    description: 'Comprehensive update of API documentation with interactive examples',
    color: '#6f42c1',
    status: 'delayed',
    priority: 'medium',
    startDate: '2024-01-10',
    dueDate: '2024-01-25',
    completionPercentage: 33,
    teamMembers: ['john_doe', 'sarah_dev'],
    budget: 15000,
    spentBudget: 8000,
    tags: ['documentation', 'api', 'developer-experience']
  },
  {
    id: '4',
    name: 'AI-Powered Documentation System',
    description: 'Implement AI features for automatic document analysis and issue generation',
    color: '#fd7e14',
    status: 'planning',
    priority: 'high',
    startDate: '2024-01-15',
    dueDate: '2024-02-28',
    completionPercentage: 15,
    teamMembers: ['sarah_dev', 'alex_devops', 'john_doe', 'project_manager'],
    budget: 62000,
    spentBudget: 8000,
    tags: ['ai', 'automation', 'nlp', 'innovation']
  },
  {
    id: '5',
    name: 'Mobile App Optimization',
    description: 'Performance optimization and feature enhancements for mobile application',
    color: '#e91e63',
    status: 'completed',
    priority: 'medium',
    startDate: '2023-11-15',
    dueDate: '2024-01-15',
    completionPercentage: 100,
    teamMembers: ['sarah_dev', 'mike_designer'],
    budget: 28000,
    spentBudget: 26500,
    tags: ['mobile', 'performance', 'optimization']
  },
  {
    id: '6',
    name: 'Team Collaboration Platform',
    description: 'Enhanced team collaboration features with real-time updates and notifications',
    color: '#9c27b0',
    status: 'planning',
    priority: 'medium',
    startDate: '2024-02-01',
    dueDate: '2024-03-15',
    completionPercentage: 5,
    teamMembers: ['sarah_dev', 'mike_designer', 'alex_devops'],
    budget: 42000,
    spentBudget: 2000,
    tags: ['collaboration', 'real-time', 'notifications']
  }
]

let projectIdCounter = mockProjects.length + 1

export class ProjectFixtures {
  private projects: Project[] = [...mockProjects]

  async getProjects(): Promise<ProjectsResponse> {
    await this.delay()
    
    return {
      data: this.projects,
      success: true,
      message: 'Projects retrieved successfully'
    }
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    await this.delay()
    
    const project = this.projects.find(p => p.id === id)
    
    if (!project) {
      throw new Error(`Project with id ${id} not found`)
    }

    return {
      data: project,
      success: true,
      message: 'Project retrieved successfully'
    }
  }

  async getProjectsByStatus(status: string): Promise<ProjectsResponse> {
    await this.delay()
    
    const filteredProjects = this.projects.filter(project => project.status === status)

    return {
      data: filteredProjects,
      success: true,
      message: `Projects with status '${status}' retrieved successfully`
    }
  }

  async getProjectsByTeamMember(memberId: string): Promise<ProjectsResponse> {
    await this.delay()
    
    const filteredProjects = this.projects.filter(project => 
      project.teamMembers && project.teamMembers.includes(memberId)
    )

    return {
      data: filteredProjects,
      success: true,
      message: `Projects for team member '${memberId}' retrieved successfully`
    }
  }

  async createProject(data: Omit<Project, 'id'>): Promise<ApiResponse<Project>> {
    await this.delay()
    
    const newProject: Project = {
      id: (projectIdCounter++).toString(),
      ...data
    }

    this.projects.push(newProject)

    return {
      data: newProject,
      success: true,
      message: 'Project created successfully'
    }
  }

  async updateProject(id: string, data: Partial<Project>): Promise<ApiResponse<Project>> {
    await this.delay()
    
    const projectIndex = this.projects.findIndex(p => p.id === id)
    
    if (projectIndex === -1) {
      throw new Error(`Project with id ${id} not found`)
    }

    const updatedProject = { ...this.projects[projectIndex], ...data }
    this.projects[projectIndex] = updatedProject

    return {
      data: updatedProject,
      success: true,
      message: 'Project updated successfully'
    }
  }

  async deleteProject(id: string): Promise<void> {
    await this.delay()
    
    const projectIndex = this.projects.findIndex(p => p.id === id)
    
    if (projectIndex === -1) {
      throw new Error(`Project with id ${id} not found`)
    }

    this.projects.splice(projectIndex, 1)
  }

  private async delay(ms: number = 200): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const projectFixtures = new ProjectFixtures()

// Export additional project-related data
export const mockProjectMetrics = {
  totalBudget: 230000,
  spentBudget: 98500,
  budgetUtilization: 42.8,
  averageProjectDuration: 68, // days
  onTimeDeliveryRate: 83,
  clientSatisfactionAverage: 4.5,
  activeProjects: 3,
  completedProjects: 12,
  delayedProjects: 1
}

export const mockProjectRisks = [
  {
    projectId: '2',
    risk: 'Timeline pressure due to additional client requirements',
    probability: 'high',
    impact: 'medium',
    mitigation: 'Negotiate scope reduction or timeline extension',
    owner: 'project_manager'
  },
  {
    projectId: '3',
    risk: 'Resource availability - key team member on leave',
    probability: 'medium',
    impact: 'high',
    mitigation: 'Cross-train backup team member',
    owner: 'project_manager'
  },
  {
    projectId: '4',
    risk: 'Technical complexity of AI implementation',
    probability: 'medium',
    impact: 'high',
    mitigation: 'Engage external AI consultant',
    owner: 'sarah_dev'
  }
]

export default {
  mockProjects,
  mockProjectMetrics,
  mockProjectRisks
}