import type { UsersResponse, User, ApiResponse } from '@/types/api'

const mockUsers: User[] = [
  {
    id: '1',
    username: 'developer1',
    email: 'developer1@example.com',
    avatar: '/placeholder.svg',
    displayName: 'Developer One'
  },
  {
    id: '2',
    username: 'ux-designer',
    email: 'ux@example.com',
    avatar: '/placeholder.svg',
    displayName: 'UX Designer'
  },
  {
    id: '3',
    username: 'project-manager',
    email: 'pm@example.com',
    avatar: '/placeholder.svg',
    displayName: 'Project Manager'
  },
  {
    id: '4',
    username: 'frontend-dev',
    email: 'frontend@example.com',
    avatar: '/placeholder.svg',
    displayName: 'Frontend Developer'
  },
  {
    id: '5',
    username: 'backend-dev',
    email: 'backend@example.com',
    avatar: '/placeholder.svg',
    displayName: 'Backend Developer'
  },
  {
    id: '6',
    username: 'tester1',
    email: 'tester@example.com',
    avatar: '/placeholder.svg',
    displayName: 'QA Tester'
  }
]

export class UserFixtures {
  private users: User[] = [...mockUsers]

  async getUsers(): Promise<UsersResponse> {
    await this.delay()
    
    return {
      data: this.users,
      success: true,
      message: 'Users retrieved successfully'
    }
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    await this.delay()
    
    const user = this.users.find(u => u.id === id)
    
    if (!user) {
      throw new Error(`User with id ${id} not found`)
    }

    return {
      data: user,
      success: true,
      message: 'User retrieved successfully'
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    await this.delay()
    
    return {
      data: this.users[0], // Return first user as current user
      success: true,
      message: 'Current user retrieved successfully'
    }
  }

  async searchUsers(query: string): Promise<UsersResponse> {
    await this.delay()
    
    const filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      (user.displayName && user.displayName.toLowerCase().includes(query.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(query.toLowerCase()))
    )

    return {
      data: filteredUsers,
      success: true,
      message: 'Users search completed successfully'
    }
  }

  async updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    await this.delay()
    
    const userIndex = this.users.findIndex(u => u.id === id)
    
    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`)
    }

    const updatedUser = { ...this.users[userIndex], ...data }
    this.users[userIndex] = updatedUser

    return {
      data: updatedUser,
      success: true,
      message: 'User updated successfully'
    }
  }

  private async delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const userFixtures = new UserFixtures()