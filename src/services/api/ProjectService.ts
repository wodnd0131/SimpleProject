import { BaseService } from './BaseService'
import type { ProjectsResponse, Project, ApiResponse } from '@/types/api'

class ProjectService extends BaseService {
  constructor() {
    super('/projects')
  }

  async getProjects(): Promise<ProjectsResponse> {
    return this.get<ProjectsResponse>('')
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    return this.get<ApiResponse<Project>>(`/${id}`)
  }

  async createProject(data: Omit<Project, 'id'>): Promise<ApiResponse<Project>> {
    return this.post<ApiResponse<Project>>('', data)
  }

  async updateProject(id: string, data: Partial<Project>): Promise<ApiResponse<Project>> {
    return this.put<ApiResponse<Project>>(`/${id}`, data)
  }

  async deleteProject(id: string): Promise<void> {
    return this.delete<void>(`/${id}`)
  }
}

export const projectService = new ProjectService()
export default projectService