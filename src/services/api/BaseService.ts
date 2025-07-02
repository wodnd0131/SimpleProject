import { AxiosResponse } from 'axios'
import axiosInstance from '@/lib/axios'
import type { ApiResponse, PaginatedResponse, ApiError } from '@/types/api'

export class BaseService {
  protected baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  protected async get<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(
        `${this.baseURL}${endpoint}`,
        { params }
      )
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  protected async post<T>(
    endpoint: string,
    data?: any,
    config?: any
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(
        `${this.baseURL}${endpoint}`,
        data,
        config
      )
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  protected async put<T>(
    endpoint: string,
    data?: any,
    config?: any
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.put(
        `${this.baseURL}${endpoint}`,
        data,
        config
      )
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  protected async patch<T>(
    endpoint: string,
    data?: any,
    config?: any
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.patch(
        `${this.baseURL}${endpoint}`,
        data,
        config
      )
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  protected async delete<T>(
    endpoint: string,
    config?: any
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.delete(
        `${this.baseURL}${endpoint}`,
        config
      )
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  private handleError(error: any): ApiError {
    if (error.response?.data) {
      return {
        message: error.response.data.message || error.message,
        code: error.response.data.code,
        details: error.response.data.details,
      }
    }
    
    return {
      message: error.message || 'An unexpected error occurred',
    }
  }

  protected buildQuery(params: Record<string, any>): Record<string, any> {
    const query: Record<string, any> = {}
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          query[key] = value.join(',')
        } else {
          query[key] = value
        }
      }
    })
    
    return query
  }
}