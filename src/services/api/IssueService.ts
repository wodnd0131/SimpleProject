import { BaseService } from './BaseService'
import type {
  IssueResponse,
  IssuesResponse,
  CommentsResponse,
  CommentResponse,
  CreateIssueRequest,
  UpdateIssueRequest,
  CreateCommentRequest,
  UpdateCommentRequest,
  SearchIssuesRequest,
} from '@/types/api'

class IssueService extends BaseService {
  constructor() {
    super('/issues')
  }

  async getIssues(params?: SearchIssuesRequest): Promise<IssuesResponse> {
    const query = params ? this.buildQuery(params) : {}
    return this.get<IssuesResponse>('', query)
  }

  async getIssue(id: number): Promise<IssueResponse> {
    return this.get<IssueResponse>(`/${id}`)
  }

  async createIssue(data: CreateIssueRequest): Promise<IssueResponse> {
    return this.post<IssueResponse>('', data)
  }

  async updateIssue(id: number, data: UpdateIssueRequest): Promise<IssueResponse> {
    return this.put<IssueResponse>(`/${id}`, data)
  }

  async deleteIssue(id: number): Promise<void> {
    return this.delete<void>(`/${id}`)
  }

  async closeIssue(id: number): Promise<IssueResponse> {
    return this.patch<IssueResponse>(`/${id}`, { state: 'closed' })
  }

  async reopenIssue(id: number): Promise<IssueResponse> {
    return this.patch<IssueResponse>(`/${id}`, { state: 'open' })
  }

  async getComments(issueId: number): Promise<CommentsResponse> {
    return this.get<CommentsResponse>(`/${issueId}/comments`)
  }

  async addComment(issueId: number, data: CreateCommentRequest): Promise<CommentResponse> {
    return this.post<CommentResponse>(`/${issueId}/comments`, data)
  }

  async updateComment(
    issueId: number,
    commentId: number,
    data: UpdateCommentRequest
  ): Promise<CommentResponse> {
    return this.put<CommentResponse>(`/${issueId}/comments/${commentId}`, data)
  }

  async deleteComment(issueId: number, commentId: number): Promise<void> {
    return this.delete<void>(`/${issueId}/comments/${commentId}`)
  }

  async searchIssues(query: string, filters?: Omit<SearchIssuesRequest, 'q'>): Promise<IssuesResponse> {
    const params: SearchIssuesRequest = { q: query, ...filters }
    return this.getIssues(params)
  }

  async assignUser(issueId: number, userId: string): Promise<IssueResponse> {
    return this.post<IssueResponse>(`/${issueId}/assignees`, { userId })
  }

  async unassignUser(issueId: number, userId: string): Promise<IssueResponse> {
    return this.delete<IssueResponse>(`/${issueId}/assignees/${userId}`)
  }

  async addLabel(issueId: number, labelId: string): Promise<IssueResponse> {
    return this.post<IssueResponse>(`/${issueId}/labels`, { labelId })
  }

  async removeLabel(issueId: number, labelId: string): Promise<IssueResponse> {
    return this.delete<IssueResponse>(`/${issueId}/labels/${labelId}`)
  }
}

export const issueService = new IssueService()
export default issueService