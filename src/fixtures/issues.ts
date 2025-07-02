import { mockIssues } from '@/data/mockIssues'
import type { 
  IssuesResponse, 
  IssueResponse, 
  CommentsResponse, 
  CommentResponse,
  CreateIssueRequest,
  UpdateIssueRequest,
  CreateCommentRequest,
  SearchIssuesRequest
} from '@/types/api'
import { Issue, Comment } from '@/types/issue'

let issueIdCounter = Math.max(...mockIssues.map(issue => issue.id)) + 1
let commentIdCounter = 100

export class IssueFixtures {
  private issues: Issue[] = [...mockIssues]

  async getIssues(params?: SearchIssuesRequest): Promise<IssuesResponse> {
    await this.delay()
    
    let filteredIssues = [...this.issues]

    if (params?.q) {
      const query = params.q.toLowerCase()
      filteredIssues = filteredIssues.filter(issue =>
        issue.title.toLowerCase().includes(query) ||
        issue.body.toLowerCase().includes(query)
      )
    }

    if (params?.state && params.state !== 'all') {
      filteredIssues = filteredIssues.filter(issue => issue.state === params.state)
    }

    if (params?.labels && params.labels.length > 0) {
      filteredIssues = filteredIssues.filter(issue =>
        issue.labels.some(label => params.labels!.includes(label.name))
      )
    }

    if (params?.assignees && params.assignees.length > 0) {
      filteredIssues = filteredIssues.filter(issue =>
        issue.assignees.some(assignee => params.assignees!.includes(assignee.username))
      )
    }

    const page = params?.page || 1
    const limit = params?.limit || 20
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedIssues = filteredIssues.slice(startIndex, endIndex)

    return {
      data: paginatedIssues,
      pagination: {
        page,
        limit,
        total: filteredIssues.length,
        totalPages: Math.ceil(filteredIssues.length / limit)
      },
      success: true,
      message: 'Issues retrieved successfully'
    }
  }

  async getIssue(id: number): Promise<IssueResponse> {
    await this.delay()
    
    const issue = this.issues.find(i => i.number === id)
    
    if (!issue) {
      throw new Error(`Issue #${id} not found`)
    }

    return {
      data: issue,
      success: true,
      message: 'Issue retrieved successfully'
    }
  }

  async createIssue(data: CreateIssueRequest): Promise<IssueResponse> {
    await this.delay()
    
    const newIssue: Issue = {
      id: ++issueIdCounter,
      number: issueIdCounter,
      title: data.title,
      body: data.body,
      state: 'open',
      author: {
        username: 'current-user',
        avatar: '/placeholder.svg'
      },
      assignees: [],
      labels: [],
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.issues.unshift(newIssue)

    return {
      data: newIssue,
      success: true,
      message: 'Issue created successfully'
    }
  }

  async updateIssue(id: number, data: UpdateIssueRequest): Promise<IssueResponse> {
    await this.delay()
    
    const issueIndex = this.issues.findIndex(i => i.number === id)
    
    if (issueIndex === -1) {
      throw new Error(`Issue #${id} not found`)
    }

    const updatedIssue = {
      ...this.issues[issueIndex],
      ...data,
      updatedAt: new Date().toISOString()
    }

    this.issues[issueIndex] = updatedIssue

    return {
      data: updatedIssue,
      success: true,
      message: 'Issue updated successfully'
    }
  }

  async deleteIssue(id: number): Promise<void> {
    await this.delay()
    
    const issueIndex = this.issues.findIndex(i => i.number === id)
    
    if (issueIndex === -1) {
      throw new Error(`Issue #${id} not found`)
    }

    this.issues.splice(issueIndex, 1)
  }

  async getComments(issueId: number): Promise<CommentsResponse> {
    await this.delay()
    
    const issue = this.issues.find(i => i.number === issueId)
    
    if (!issue) {
      throw new Error(`Issue #${issueId} not found`)
    }

    return {
      data: issue.comments,
      success: true,
      message: 'Comments retrieved successfully'
    }
  }

  async addComment(issueId: number, data: CreateCommentRequest): Promise<CommentResponse> {
    await this.delay()
    
    const issueIndex = this.issues.findIndex(i => i.number === issueId)
    
    if (issueIndex === -1) {
      throw new Error(`Issue #${issueId} not found`)
    }

    const newComment: Comment = {
      id: ++commentIdCounter,
      body: data.body,
      author: {
        username: 'current-user',
        avatar: '/placeholder.svg'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.issues[issueIndex].comments.push(newComment)
    this.issues[issueIndex].updatedAt = new Date().toISOString()

    return {
      data: newComment,
      success: true,
      message: 'Comment added successfully'
    }
  }

  async updateComment(issueId: number, commentId: number, data: { body: string }): Promise<CommentResponse> {
    await this.delay()
    
    const issueIndex = this.issues.findIndex(i => i.number === issueId)
    
    if (issueIndex === -1) {
      throw new Error(`Issue #${issueId} not found`)
    }

    const commentIndex = this.issues[issueIndex].comments.findIndex(c => c.id === commentId)
    
    if (commentIndex === -1) {
      throw new Error(`Comment #${commentId} not found`)
    }

    const updatedComment = {
      ...this.issues[issueIndex].comments[commentIndex],
      body: data.body,
      updatedAt: new Date().toISOString()
    }

    this.issues[issueIndex].comments[commentIndex] = updatedComment

    return {
      data: updatedComment,
      success: true,
      message: 'Comment updated successfully'
    }
  }

  async deleteComment(issueId: number, commentId: number): Promise<void> {
    await this.delay()
    
    const issueIndex = this.issues.findIndex(i => i.number === issueId)
    
    if (issueIndex === -1) {
      throw new Error(`Issue #${issueId} not found`)
    }

    const commentIndex = this.issues[issueIndex].comments.findIndex(c => c.id === commentId)
    
    if (commentIndex === -1) {
      throw new Error(`Comment #${commentId} not found`)
    }

    this.issues[issueIndex].comments.splice(commentIndex, 1)
  }

  private async delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const issueFixtures = new IssueFixtures()