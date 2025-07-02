import type { TeamMember, WorkloadSummary, Reminder } from '@/types/Team.types'

export const mockTeamMembers: TeamMember[] = [
  {
    id: "sarah_dev",
    username: "sarah_dev",
    avatar: "https://avatars.githubusercontent.com/u/1234567?v=4",
    email: "sarah@company.com",
    role: "developer",
    department: "Engineering",
    workloadCapacity: 40,
    currentWorkload: 35,
    status: "active",
    timezone: "America/New_York",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    preferences: {
      reminderFrequency: "daily",
      emailNotifications: true,
      slackNotifications: true
    },
    joinedAt: "2023-03-15T00:00:00Z"
  },
  {
    id: "mike_designer",
    username: "mike_designer",
    avatar: "https://avatars.githubusercontent.com/u/2345678?v=4",
    email: "mike@company.com",
    role: "designer",
    department: "Design",
    workloadCapacity: 35,
    currentWorkload: 28,
    status: "active",
    timezone: "America/Los_Angeles",
    skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping"],
    preferences: {
      reminderFrequency: "daily",
      emailNotifications: true,
      slackNotifications: false
    },
    joinedAt: "2023-05-20T00:00:00Z"
  },
  {
    id: "alex_devops",
    username: "alex_devops",
    avatar: "https://avatars.githubusercontent.com/u/3456789?v=4",
    email: "alex@company.com",
    role: "developer",
    department: "Infrastructure",
    workloadCapacity: 40,
    currentWorkload: 42,
    status: "busy",
    timezone: "Europe/London",
    skills: ["DevOps", "AWS", "Kubernetes", "Docker", "CI/CD"],
    preferences: {
      reminderFrequency: "weekly",
      emailNotifications: false,
      slackNotifications: true
    },
    joinedAt: "2023-01-10T00:00:00Z"
  },
  {
    id: "john_doe",
    username: "john_doe",
    avatar: "https://avatars.githubusercontent.com/u/4567890?v=4",
    email: "john@company.com",
    role: "qa",
    department: "Quality Assurance",
    workloadCapacity: 35,
    currentWorkload: 20,
    status: "active",
    timezone: "Asia/Tokyo",
    skills: ["QA Testing", "Selenium", "Jest", "API Testing", "Performance Testing"],
    preferences: {
      reminderFrequency: "immediate",
      emailNotifications: true,
      slackNotifications: true
    },
    joinedAt: "2023-07-01T00:00:00Z"
  },
  {
    id: "project_manager",
    username: "project_manager",
    avatar: "https://avatars.githubusercontent.com/u/5678901?v=4",
    email: "pm@company.com",
    role: "manager",
    department: "Project Management",
    workloadCapacity: 30,
    currentWorkload: 25,
    status: "active",
    timezone: "America/Chicago",
    skills: ["Agile", "Scrum", "JIRA", "Risk Management", "Stakeholder Management"],
    preferences: {
      reminderFrequency: "daily",
      emailNotifications: true,
      slackNotifications: true
    },
    joinedAt: "2022-11-15T00:00:00Z"
  },
  {
    id: "emma_admin",
    username: "emma_admin",
    avatar: "https://avatars.githubusercontent.com/u/6789012?v=4",
    email: "emma@company.com",
    role: "admin",
    department: "Administration",
    workloadCapacity: 30,
    currentWorkload: 15,
    status: "away",
    timezone: "Australia/Sydney",
    skills: ["System Administration", "User Management", "Compliance", "Documentation"],
    preferences: {
      reminderFrequency: "weekly",
      emailNotifications: true,
      slackNotifications: false
    },
    joinedAt: "2023-02-28T00:00:00Z"
  }
]

export const mockWorkloadSummary: WorkloadSummary[] = [
  {
    memberId: "sarah_dev",
    totalAssigned: 12,
    overdue: 1,
    dueSoon: 3,
    inProgress: 5,
    completed: 28,
    completionRate: 87.5
  },
  {
    memberId: "mike_designer",
    totalAssigned: 8,
    overdue: 0,
    dueSoon: 2,
    inProgress: 4,
    completed: 22,
    completionRate: 91.7
  },
  {
    memberId: "alex_devops",
    totalAssigned: 15,
    overdue: 3,
    dueSoon: 4,
    inProgress: 6,
    completed: 18,
    completionRate: 75.0
  },
  {
    memberId: "john_doe",
    totalAssigned: 6,
    overdue: 0,
    dueSoon: 1,
    inProgress: 3,
    completed: 15,
    completionRate: 93.8
  },
  {
    memberId: "project_manager",
    totalAssigned: 10,
    overdue: 0,
    dueSoon: 2,
    inProgress: 4,
    completed: 32,
    completionRate: 94.1
  },
  {
    memberId: "emma_admin",
    totalAssigned: 4,
    overdue: 0,
    dueSoon: 1,
    inProgress: 2,
    completed: 12,
    completionRate: 92.3
  }
]

export const mockReminders: Reminder[] = [
  {
    id: 1,
    type: "issue_due",
    title: "Issue Due Tomorrow",
    description: "Authentication system upgrade is due tomorrow. Please ensure all testing is completed.",
    relatedEntityId: 15,
    relatedEntityType: "issue",
    assigneeId: "sarah_dev",
    dueDate: "2024-01-15T00:00:00Z",
    priority: "high",
    status: "pending",
    createdAt: "2024-01-14T09:00:00Z"
  },
  {
    id: 2,
    type: "meeting_upcoming",
    title: "Sprint Review Meeting",
    description: "Sprint review meeting scheduled for today at 2 PM. Please prepare your updates.",
    relatedEntityId: 4,
    relatedEntityType: "meeting",
    assigneeId: "mike_designer",
    dueDate: "2024-01-12T14:00:00Z",
    priority: "medium",
    status: "sent",
    createdAt: "2024-01-12T08:00:00Z",
    sentAt: "2024-01-12T08:30:00Z"
  },
  {
    id: 3,
    type: "overdue",
    title: "Overdue Task",
    description: "CI/CD pipeline setup is overdue. Please provide status update.",
    relatedEntityId: 3,
    relatedEntityType: "action_item",
    assigneeId: "alex_devops",
    dueDate: "2024-01-20T00:00:00Z",
    priority: "high",
    status: "acknowledged",
    createdAt: "2024-01-21T10:00:00Z",
    sentAt: "2024-01-21T10:00:00Z"
  },
  {
    id: 4,
    type: "action_item",
    title: "Action Item Reminder",
    description: "Complete API documentation review by end of week.",
    relatedEntityId: 4,
    relatedEntityType: "action_item",
    assigneeId: "john_doe",
    dueDate: "2024-01-18T00:00:00Z",
    priority: "medium",
    status: "pending",
    createdAt: "2024-01-16T09:00:00Z"
  },
  {
    id: 5,
    type: "issue_due",
    title: "Code Review Required",
    description: "New authentication flow needs code review before deployment.",
    relatedEntityId: 22,
    relatedEntityType: "issue",
    assigneeId: "project_manager",
    dueDate: "2024-01-16T00:00:00Z",
    priority: "high",
    status: "pending",
    createdAt: "2024-01-15T11:00:00Z"
  },
  {
    id: 6,
    type: "meeting_upcoming",
    title: "Client Demo Preparation",
    description: "Client demo is scheduled for next week. Please prepare demo materials.",
    relatedEntityId: 5,
    relatedEntityType: "meeting",
    assigneeId: "emma_admin",
    dueDate: "2024-01-22T10:00:00Z",
    priority: "medium",
    status: "dismissed",
    createdAt: "2024-01-19T14:00:00Z",
    sentAt: "2024-01-19T14:00:00Z"
  }
]

export default {
  mockTeamMembers,
  mockWorkloadSummary,
  mockReminders
}