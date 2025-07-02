export interface DashboardStats {
  totalIssues: number;
  openIssues: number;
  closedIssues: number;
  overdueTasks: number;
  upcomingDeadlines: number;
  totalMeetings: number;
  pendingActionItems: number;
  completedThisWeek: number;
  teamMembers: number;
  activeProjects: number;
}

export interface RecentActivity {
  id: number;
  type: 'issue_created' | 'issue_closed' | 'meeting_created' | 'action_item_completed' | 'user_assigned' | 'document_created' | 'ai_analysis_completed' | 'team_member_added' | 'workload_updated' | 'project_milestone';
  title: string;
  description: string;
  actor: {
    username: string;
    avatar: string;
  };
  relatedEntity?: {
    id: number;
    type: 'issue' | 'meeting' | 'action_item' | 'document' | 'team_member' | 'project';
    title: string;
  };
  createdAt: string;
}

export interface ProjectProgress {
  projectId: number;
  projectName: string;
  totalIssues: number;
  completedIssues: number;
  progressPercentage: number;
  dueDate?: string;
  status: 'on_track' | 'at_risk' | 'delayed' | 'completed';
}

export interface UpcomingDeadline {
  id: number;
  title: string;
  type: 'issue' | 'meeting' | 'action_item';
  assignee: {
    username: string;
    avatar: string;
  };
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  daysRemaining: number;
  status: 'pending' | 'in_progress' | 'overdue';
}