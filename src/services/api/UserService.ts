import { BaseService } from './BaseService'
import type { UsersResponse, User, ApiResponse } from '@/types/api'

class UserService extends BaseService {
  constructor() {
    super('/users')
  }

  async getUsers(): Promise<UsersResponse> {
    return this.get<UsersResponse>('')
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.get<ApiResponse<User>>(`/${id}`)
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.get<ApiResponse<User>>('/me')
  }

  async searchUsers(query: string): Promise<UsersResponse> {
    return this.get<UsersResponse>('', { q: query })
  }

  async updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    return this.put<ApiResponse<User>>(`/${id}`, data)
  }

  async updateCurrentUser(data: Partial<User>): Promise<ApiResponse<User>> {
    return this.put<ApiResponse<User>>('/me', data)
  }
}

export const userService = new UserService()
export default userService