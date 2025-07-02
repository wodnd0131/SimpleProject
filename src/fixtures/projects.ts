import type { ProjectsResponse, Project, ApiResponse } from '@/types/api'

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Web Application',
    description: 'Main web application development',
    color: '#0366d6'
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'Mobile application development',
    color: '#28a745'
  },
  {
    id: '3',
    name: 'API Development',
    description: 'Backend API development and improvements',
    color: '#6f42c1'
  },
  {
    id: '4',
    name: 'Documentation',
    description: 'Project documentation and guides',
    color: '#fd7e14'
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