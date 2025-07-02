import type { 
  DashboardStats, 
  RecentActivity, 
  ProjectProgress, 
  UpcomingDeadline 
} from '@/types/Dashboard.types'

export const mockDashboardStats: DashboardStats = {
  totalIssues: 108,
  openIssues: 45,
  closedIssues: 63,
  overdueTasks: 8,
  upcomingDeadlines: 12,
  totalMeetings: 28,
  pendingActionItems: 23,
  completedThisWeek: 15,
  teamMembers: 6,
  activeProjects: 4
}

export const mockRecentActivity: RecentActivity[] = [
  {
    id: 1,
    type: "document_created",
    title: "Document created",
    description: "Created document: Sprint Planning Meeting - Q1 2024",
    actor: {
      username: "project_manager",
      avatar: "https://avatars.githubusercontent.com/u/5678901?v=4"
    },
    relatedEntity: {
      id: 1,
      type: "document",
      title: "Sprint Planning Meeting - Q1 2024"
    },
    createdAt: "2024-01-12T16:30:00Z"
  },
  {
    id: 2,
    type: "ai_analysis_completed",
    title: "AI analysis completed",
    description: "Automatically extracted 4 action items and created 3 issues from document",
    actor: {
      username: "ai-assistant",
      avatar: "/placeholder.svg"
    },
    relatedEntity: {
      id: 1,
      type: "document",
      title: "Sprint Planning Meeting - Q1 2024"
    },
    createdAt: "2024-01-12T16:35:00Z"
  },
  {
    id: 3,
    type: "issue_created",
    title: "Issue auto-generated",
    description: "Created issue: Implement OAuth 2.0 authentication flow",
    actor: {
      username: "ai-assistant",
      avatar: "/placeholder.svg"
    },
    relatedEntity: {
      id: 101,
      type: "issue",
      title: "Implement OAuth 2.0 authentication flow"
    },
    createdAt: "2024-01-12T16:35:00Z"
  },
  {
    id: 4,
    type: "issue_created",
    title: "New issue created",
    description: "Created issue: Fix login form validation",
    actor: {
      username: "sarah_dev",
      avatar: "https://avatars.githubusercontent.com/u/1234567?v=4"
    },
    relatedEntity: {
      id: 23,
      type: "issue",
      title: "Fix login form validation"
    },
    createdAt: "2024-01-12T14:30:00Z"
  },
  {
    id: 5,
    type: "issue_closed",
    title: "Issue resolved",
    description: "Closed issue: Update user profile page",
    actor: {
      username: "mike_designer",
      avatar: "https://avatars.githubusercontent.com/u/2345678?v=4"
    },
    relatedEntity: {
      id: 18,
      type: "issue",
      title: "Update user profile page"
    },
    createdAt: "2024-01-12T13:15:00Z"
  },
  {
    id: 6,
    type: "meeting_created",
    title: "Meeting scheduled",
    description: "Scheduled: Weekly standup meeting",
    actor: {
      username: "project_manager",
      avatar: "https://avatars.githubusercontent.com/u/5678901?v=4"
    },
    relatedEntity: {
      id: 4,
      type: "meeting",
      title: "Weekly standup meeting"
    },
    createdAt: "2024-01-12T11:45:00Z"
  },
  {
    id: 7,
    type: "action_item_completed",
    title: "Action item completed",
    description: "Completed: Set up monitoring dashboards",
    actor: {
      username: "alex_devops",
      avatar: "https://avatars.githubusercontent.com/u/3456789?v=4"
    },
    relatedEntity: {
      id: 6,
      type: "action_item",
      title: "Set up monitoring dashboards"
    },
    createdAt: "2024-01-12T10:20:00Z"
  },
  {
    id: 8,
    type: "user_assigned",
    title: "Task assigned",
    description: "Assigned john_doe to: Review API documentation",
    actor: {
      username: "project_manager",
      avatar: "https://avatars.githubusercontent.com/u/5678901?v=4"
    },
    relatedEntity: {
      id: 19,
      type: "issue",
      title: "Review API documentation"
    },
    createdAt: "2024-01-12T09:30:00Z"
  },
  {
    id: 9,
    type: "issue_created",
    title: "Bug report filed",
    description: "Created issue: Dashboard loading performance issue",
    actor: {
      username: "john_doe",
      avatar: "https://avatars.githubusercontent.com/u/4567890?v=4"
    },
    relatedEntity: {
      id: 24,
      type: "issue",
      title: "Dashboard loading performance issue"
    },
    createdAt: "2024-01-11T16:45:00Z"
  },
  {
    id: 10,
    type: "meeting_created",
    title: "Client meeting scheduled",
    description: "Scheduled: Client feedback review session",
    actor: {
      username: "emma_admin",
      avatar: "https://avatars.githubusercontent.com/u/6789012?v=4"
    },
    relatedEntity: {
      id: 5,
      type: "meeting",
      title: "Client feedback review session"
    },
    createdAt: "2024-01-11T15:20:00Z"
  },
  {
    id: 11,
    type: "issue_closed",
    title: "Feature completed",
    description: "Closed issue: Implement dark mode toggle",
    actor: {
      username: "sarah_dev",
      avatar: "https://avatars.githubusercontent.com/u/1234567?v=4"
    },
    relatedEntity: {
      id: 16,
      type: "issue",
      title: "Implement dark mode toggle"
    },
    createdAt: "2024-01-11T14:10:00Z"
  },
  {
    id: 12,
    type: "team_member_added",
    title: "New team member",
    description: "john_doe joined the Quality Assurance team",
    actor: {
      username: "emma_admin",
      avatar: "https://avatars.githubusercontent.com/u/6789012?v=4"
    },
    relatedEntity: {
      id: 4,
      type: "team_member",
      title: "john_doe"
    },
    createdAt: "2024-01-11T12:00:00Z"
  },
  {
    id: 13,
    type: "workload_updated",
    title: "Workload rebalanced",
    description: "Workload updated for alex_devops - capacity at 105%",
    actor: {
      username: "project_manager",
      avatar: "https://avatars.githubusercontent.com/u/5678901?v=4"
    },
    relatedEntity: {
      id: 3,
      type: "team_member",
      title: "alex_devops"
    },
    createdAt: "2024-01-11T10:30:00Z"
  },
  {
    id: 14,
    type: "project_milestone",
    title: "Milestone reached",
    description: "Authentication System Upgrade reached 80% completion",
    actor: {
      username: "sarah_dev",
      avatar: "https://avatars.githubusercontent.com/u/1234567?v=4"
    },
    relatedEntity: {
      id: 1,
      type: "project",
      title: "Authentication System Upgrade"
    },
    createdAt: "2024-01-11T09:15:00Z"
  }
]

export const mockProjectProgress: ProjectProgress[] = [
  {
    projectId: 4,
    projectName: "AI-Powered Documentation System",
    totalIssues: 8,
    completedIssues: 3,
    progressPercentage: 37.5,
    dueDate: "2024-02-28T00:00:00Z",
    status: "on_track"
  },
  {
    projectId: 1,
    projectName: "Authentication System Upgrade",
    totalIssues: 18,
    completedIssues: 14,
    progressPercentage: 78,
    dueDate: "2024-01-31T00:00:00Z",
    status: "on_track"
  },
  {
    projectId: 2,
    projectName: "Dashboard Redesign",
    totalIssues: 25,
    completedIssues: 16,
    progressPercentage: 64,
    dueDate: "2024-02-14T00:00:00Z",
    status: "at_risk"
  },
  {
    projectId: 3,
    projectName: "API Documentation Update",
    totalIssues: 12,
    completedIssues: 4,
    progressPercentage: 33.3,
    dueDate: "2024-01-25T00:00:00Z",
    status: "delayed"
  },
  {
    projectId: 5,
    projectName: "Mobile App Optimization",
    totalIssues: 12,
    completedIssues: 12,
    progressPercentage: 100,
    dueDate: "2024-01-15T00:00:00Z",
    status: "completed"
  }
]

export const mockUpcomingDeadlines: UpcomingDeadline[] = [
  {
    id: 1,
    title: "Complete OAuth 2.0 integration",
    type: "issue",
    assignee: {
      username: "sarah_dev",
      avatar: "https://avatars.githubusercontent.com/u/1234567?v=4"
    },
    dueDate: "2024-01-15T00:00:00Z",
    priority: "high",
    daysRemaining: 3,
    status: "in_progress"
  },
  {
    id: 2,
    title: "Fix dark mode contrast issues",
    type: "action_item",
    assignee: {
      username: "mike_designer",
      avatar: "https://avatars.githubusercontent.com/u/2345678?v=4"
    },
    dueDate: "2024-01-13T00:00:00Z",
    priority: "high",
    daysRemaining: 1,
    status: "pending"
  },
  {
    id: 3,
    title: "Sprint Review Meeting",
    type: "meeting",
    assignee: {
      username: "project_manager",
      avatar: "https://avatars.githubusercontent.com/u/5678901?v=4"
    },
    dueDate: "2024-01-16T14:00:00Z",
    priority: "medium",
    daysRemaining: 4,
    status: "pending"
  },
  {
    id: 4,
    title: "Update server monitoring alerts",
    type: "action_item",
    assignee: {
      username: "alex_devops",
      avatar: "https://avatars.githubusercontent.com/u/3456789?v=4"
    },
    dueDate: "2024-01-10T00:00:00Z",
    priority: "medium",
    daysRemaining: -2,
    status: "overdue"
  },
  {
    id: 5,
    title: "Review API documentation",
    type: "issue",
    assignee: {
      username: "john_doe",
      avatar: "https://avatars.githubusercontent.com/u/4567890?v=4"
    },
    dueDate: "2024-01-18T00:00:00Z",
    priority: "medium",
    daysRemaining: 6,
    status: "pending"
  },
  {
    id: 6,
    title: "Prepare client demo materials",
    type: "action_item",
    assignee: {
      username: "emma_admin",
      avatar: "https://avatars.githubusercontent.com/u/6789012?v=4"
    },
    dueDate: "2024-01-22T00:00:00Z",
    priority: "low",
    daysRemaining: 10,
    status: "pending"
  },
  {
    id: 7,
    title: "Database performance optimization",
    type: "issue",
    assignee: {
      username: "alex_devops",
      avatar: "https://avatars.githubusercontent.com/u/3456789?v=4"
    },
    dueDate: "2024-01-20T00:00:00Z",
    priority: "high",
    daysRemaining: 8,
    status: "in_progress"
  },
  {
    id: 8,
    title: "User acceptance testing session",
    type: "meeting",
    assignee: {
      username: "john_doe",
      avatar: "https://avatars.githubusercontent.com/u/4567890?v=4"
    },
    dueDate: "2024-01-19T10:00:00Z",
    priority: "medium",
    daysRemaining: 7,
    status: "pending"
  }
]

export default {
  mockDashboardStats,
  mockRecentActivity,
  mockProjectProgress,
  mockUpcomingDeadlines
}