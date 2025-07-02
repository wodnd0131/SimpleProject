import type { LabelsResponse, Label, ApiResponse } from '@/types/api'

const mockLabels: Label[] = [
  {
    id: '1',
    name: 'bug',
    color: '#d73a49',
    description: 'Something is not working'
  },
  {
    id: '2',
    name: 'enhancement',
    color: '#a2eeef',
    description: 'New feature or request'
  },
  {
    id: '3',
    name: 'documentation',
    color: '#0075ca',
    description: 'Improvements or additions to documentation'
  },
  {
    id: '4',
    name: 'good first issue',
    color: '#7057ff',
    description: 'Good for newcomers'
  },
  {
    id: '5',
    name: 'help wanted',
    color: '#008672',
    description: 'Extra attention is needed'
  },
  {
    id: '6',
    name: 'performance',
    color: '#0075ca',
    description: 'Performance related issues'
  },
  {
    id: '7',
    name: 'design',
    color: '#f9d0c4',
    description: 'Design related tasks'
  },
  {
    id: '8',
    name: 'auth',
    color: '#0e8a16',
    description: 'Authentication related'
  }
]

let labelIdCounter = mockLabels.length + 1

export class LabelFixtures {
  private labels: Label[] = [...mockLabels]

  async getLabels(): Promise<LabelsResponse> {
    await this.delay()
    
    return {
      data: this.labels,
      success: true,
      message: 'Labels retrieved successfully'
    }
  }

  async getLabel(id: string): Promise<ApiResponse<Label>> {
    await this.delay()
    
    const label = this.labels.find(l => l.id === id)
    
    if (!label) {
      throw new Error(`Label with id ${id} not found`)
    }

    return {
      data: label,
      success: true,
      message: 'Label retrieved successfully'
    }
  }

  async createLabel(data: Omit<Label, 'id'>): Promise<ApiResponse<Label>> {
    await this.delay()
    
    const newLabel: Label = {
      id: (labelIdCounter++).toString(),
      ...data
    }

    this.labels.push(newLabel)

    return {
      data: newLabel,
      success: true,
      message: 'Label created successfully'
    }
  }

  async updateLabel(id: string, data: Partial<Label>): Promise<ApiResponse<Label>> {
    await this.delay()
    
    const labelIndex = this.labels.findIndex(l => l.id === id)
    
    if (labelIndex === -1) {
      throw new Error(`Label with id ${id} not found`)
    }

    const updatedLabel = { ...this.labels[labelIndex], ...data }
    this.labels[labelIndex] = updatedLabel

    return {
      data: updatedLabel,
      success: true,
      message: 'Label updated successfully'
    }
  }

  async deleteLabel(id: string): Promise<void> {
    await this.delay()
    
    const labelIndex = this.labels.findIndex(l => l.id === id)
    
    if (labelIndex === -1) {
      throw new Error(`Label with id ${id} not found`)
    }

    this.labels.splice(labelIndex, 1)
  }

  private async delay(ms: number = 200): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const labelFixtures = new LabelFixtures()