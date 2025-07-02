import { BaseService } from './BaseService'
import type { LabelsResponse, Label, ApiResponse } from '@/types/api'

class LabelService extends BaseService {
  constructor() {
    super('/labels')
  }

  async getLabels(): Promise<LabelsResponse> {
    return this.get<LabelsResponse>('')
  }

  async getLabel(id: string): Promise<ApiResponse<Label>> {
    return this.get<ApiResponse<Label>>(`/${id}`)
  }

  async createLabel(data: Omit<Label, 'id'>): Promise<ApiResponse<Label>> {
    return this.post<ApiResponse<Label>>('', data)
  }

  async updateLabel(id: string, data: Partial<Label>): Promise<ApiResponse<Label>> {
    return this.put<ApiResponse<Label>>(`/${id}`, data)
  }

  async deleteLabel(id: string): Promise<void> {
    return this.delete<void>(`/${id}`)
  }
}

export const labelService = new LabelService()
export default labelService