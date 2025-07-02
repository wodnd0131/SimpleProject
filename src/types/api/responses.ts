import { Issue, Comment } from '../issue'

export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  message?: string
  success: boolean
}

export interface IssueResponse extends ApiResponse<Issue> {}

export interface IssuesResponse extends PaginatedResponse<Issue> {}

export interface CommentResponse extends ApiResponse<Comment> {}

export interface CommentsResponse extends ApiResponse<Comment[]> {}

export interface CreateIssueRequest {
  title: string
  body: string
  assigneeIds?: string[]
  labelIds?: string[]
  milestoneId?: string
  projectId?: string
}

export interface UpdateIssueRequest {
  title?: string
  body?: string
  state?: 'open' | 'closed'
  assigneeIds?: string[]
  labelIds?: string[]
  milestoneId?: string
  projectId?: string
}

export interface CreateCommentRequest {
  body: string
}

export interface UpdateCommentRequest {
  body: string
}

export interface User {
  id: string
  username: string
  email?: string
  avatar: string
  displayName?: string
}

export interface UsersResponse extends ApiResponse<User[]> {}

export interface Label {
  id: string
  name: string
  color: string
  description?: string
}

export interface LabelsResponse extends ApiResponse<Label[]> {}

export interface Milestone {
  id: string
  name: string
  description?: string
  dueDate?: string
  state: 'open' | 'closed'
  issueCount: number
  closedIssueCount: number
}

export interface MilestonesResponse extends ApiResponse<Milestone[]> {}

export interface Project {
  id: string
  name: string
  description?: string
  color?: string
}

export interface ProjectsResponse extends ApiResponse<Project[]> {}

export interface SearchIssuesRequest {
  q?: string
  state?: 'open' | 'closed' | 'all'
  labels?: string[]
  assignees?: string[]
  milestone?: string
  sort?: 'created' | 'updated' | 'comments'
  direction?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface ApiError {
  message: string
  code?: string
  details?: Record<string, any>
}