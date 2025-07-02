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

// Performance metrics for each team member
export const mockPerformanceMetrics = [
  {
    memberId: "sarah_dev",
    quarter: "Q1 2024",
    tasksCompleted: 28,
    tasksTarget: 25,
    codeReviewQuality: 9.2,
    bugFixRate: 85,
    mentorshipHours: 12,
    innovationProjects: 2,
    clientFeedbackScore: 4.8,
    technicalSkillsGrowth: [
      { skill: "React", level: 9.5, improvement: 0.3 },
      { skill: "TypeScript", level: 9.2, improvement: 0.5 },
      { skill: "GraphQL", level: 8.5, improvement: 1.2 },
      { skill: "System Architecture", level: 8.8, improvement: 0.8 }
    ]
  },
  {
    memberId: "mike_designer",
    quarter: "Q1 2024",
    tasksCompleted: 22,
    tasksTarget: 20,
    designSystemAdoption: 100,
    userTestingSessions: 8,
    clientFeedbackScore: 4.7,
    crossTeamCollaboration: 9.1,
    innovationProjects: 1,
    technicalSkillsGrowth: [
      { skill: "UI/UX Design", level: 9.8, improvement: 0.2 },
      { skill: "Figma", level: 9.5, improvement: 0.4 },
      { skill: "User Research", level: 8.9, improvement: 0.6 },
      { skill: "Prototyping", level: 9.0, improvement: 0.3 }
    ]
  },
  {
    memberId: "alex_devops",
    quarter: "Q1 2024",
    tasksCompleted: 18,
    tasksTarget: 16,
    infrastructureUptime: 99.97,
    deploymentSuccessRate: 100,
    performanceOptimizations: 8,
    securityImprovements: 12,
    clientFeedbackScore: 4.6,
    technicalSkillsGrowth: [
      { skill: "DevOps", level: 9.3, improvement: 0.4 },
      { skill: "AWS", level: 9.0, improvement: 0.7 },
      { skill: "Kubernetes", level: 8.7, improvement: 0.9 },
      { skill: "Security", level: 8.4, improvement: 1.1 }
    ]
  },
  {
    memberId: "john_doe",
    quarter: "Q1 2024",
    tasksCompleted: 19,
    tasksTarget: 18,
    testCoverage: 92,
    bugDetectionRate: 89,
    processImprovements: 3,
    documentationQuality: 9.4,
    clientFeedbackScore: 4.5,
    technicalSkillsGrowth: [
      { skill: "QA Testing", level: 9.1, improvement: 0.3 },
      { skill: "Selenium", level: 8.8, improvement: 0.5 },
      { skill: "API Testing", level: 8.6, improvement: 0.8 },
      { skill: "Test Automation", level: 8.9, improvement: 0.7 }
    ]
  },
  {
    memberId: "project_manager",
    quarter: "Q1 2024",
    tasksCompleted: 24,
    tasksTarget: 22,
    teamVelocity: 45,
    clientSatisfaction: 4.6,
    stakeholderEngagement: 9.3,
    riskManagement: 8.8,
    budgetAccuracy: 98,
    technicalSkillsGrowth: [
      { skill: "Agile", level: 9.5, improvement: 0.2 },
      { skill: "Stakeholder Management", level: 9.2, improvement: 0.4 },
      { skill: "Risk Management", level: 8.8, improvement: 0.6 },
      { skill: "Technical Leadership", level: 8.5, improvement: 0.8 }
    ]
  },
  {
    memberId: "emma_admin",
    quarter: "Q1 2024",
    tasksCompleted: 16,
    tasksTarget: 15,
    systemAdministration: 9.6,
    userManagement: 9.8,
    complianceScore: 100,
    processOptimizations: 5,
    clientFeedbackScore: 4.4,
    technicalSkillsGrowth: [
      { skill: "System Administration", level: 9.6, improvement: 0.3 },
      { skill: "Compliance", level: 9.8, improvement: 0.2 },
      { skill: "Process Optimization", level: 8.7, improvement: 0.5 },
      { skill: "Documentation", level: 9.1, improvement: 0.4 }
    ]
  }
]

// Team collaboration metrics
export const mockTeamCollaboration = {
  overallTeamSynergy: 8.9,
  crossFunctionalProjects: 12,
  knowledgeSharingSessions: 8,
  mentoringRelationships: [
    { mentor: "sarah_dev", mentee: "john_doe", focus: "Technical Development" },
    { mentor: "mike_designer", mentee: "alex_devops", focus: "UI/UX Principles" },
    { mentor: "project_manager", mentee: "emma_admin", focus: "Project Management" }
  ],
  teamEvents: [
    { type: "Team Building", date: "2024-01-10", participants: 6 },
    { type: "Technical Workshop", date: "2024-01-15", participants: 4 },
    { type: "Retrospective", date: "2024-01-20", participants: 6 }
  ]
}

// Expanded workload details
export const mockDetailedWorkload = [
  {
    memberId: "sarah_dev",
    currentSprint: {
      plannedHours: 40,
      loggedHours: 38,
      overtime: 2,
      efficiency: 95
    },
    upcomingWeek: {
      scheduledTasks: 8,
      estimatedHours: 42,
      availableHours: 40,
      overloadRisk: "medium"
    },
    monthlyTrend: {
      averageHours: 39,
      peakHours: 45,
      minimumHours: 35,
      burnoutRisk: "low"
    }
  },
  {
    memberId: "mike_designer",
    currentSprint: {
      plannedHours: 35,
      loggedHours: 33,
      overtime: 0,
      efficiency: 94
    },
    upcomingWeek: {
      scheduledTasks: 6,
      estimatedHours: 36,
      availableHours: 35,
      overloadRisk: "low"
    },
    monthlyTrend: {
      averageHours: 34,
      peakHours: 38,
      minimumHours: 30,
      burnoutRisk: "very_low"
    }
  },
  {
    memberId: "alex_devops",
    currentSprint: {
      plannedHours: 40,
      loggedHours: 44,
      overtime: 4,
      efficiency: 90
    },
    upcomingWeek: {
      scheduledTasks: 10,
      estimatedHours: 48,
      availableHours: 40,
      overloadRisk: "high"
    },
    monthlyTrend: {
      averageHours: 42,
      peakHours: 50,
      minimumHours: 38,
      burnoutRisk: "medium"
    }
  },
  {
    memberId: "john_doe",
    currentSprint: {
      plannedHours: 35,
      loggedHours: 32,
      overtime: 0,
      efficiency: 91
    },
    upcomingWeek: {
      scheduledTasks: 5,
      estimatedHours: 28,
      availableHours: 35,
      overloadRisk: "none"
    },
    monthlyTrend: {
      averageHours: 31,
      peakHours: 36,
      minimumHours: 28,
      burnoutRisk: "very_low"
    }
  },
  {
    memberId: "project_manager",
    currentSprint: {
      plannedHours: 30,
      loggedHours: 32,
      overtime: 2,
      efficiency: 93
    },
    upcomingWeek: {
      scheduledTasks: 12,
      estimatedHours: 35,
      availableHours: 30,
      overloadRisk: "medium"
    },
    monthlyTrend: {
      averageHours: 31,
      peakHours: 38,
      minimumHours: 28,
      burnoutRisk: "low"
    }
  },
  {
    memberId: "emma_admin",
    currentSprint: {
      plannedHours: 30,
      loggedHours: 25,
      overtime: 0,
      efficiency: 83
    },
    upcomingWeek: {
      scheduledTasks: 4,
      estimatedHours: 22,
      availableHours: 30,
      overloadRisk: "none"
    },
    monthlyTrend: {
      averageHours: 26,
      peakHours: 32,
      minimumHours: 22,
      burnoutRisk: "very_low"
    }
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
  mockReminders,
  mockPerformanceMetrics,
  mockTeamCollaboration,
  mockDetailedWorkload
}