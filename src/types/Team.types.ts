export interface TeamMember {
  id: string;
  username: string;
  avatar: string;
  email: string;
  role: 'admin' | 'manager' | 'developer' | 'designer' | 'qa';
  department?: string;
  workloadCapacity: number;
  currentWorkload: number;
  status: 'active' | 'busy' | 'away' | 'offline';
  timezone: string;
  skills?: string[];
  preferences: {
    reminderFrequency: 'immediate' | 'daily' | 'weekly';
    emailNotifications: boolean;
    slackNotifications: boolean;
  };
  joinedAt: string;
}

export interface WorkloadSummary {
  memberId: string;
  totalAssigned: number;
  overdue: number;
  dueSoon?: number;
  inProgress: number;
  completed: number;
  completionRate: number;
  weeklyHours: number;
  efficiency: number;
}

export interface Reminder {
  id: number;
  type: 'code_review' | 'meeting' | 'planning' | 'documentation' | 'review' | 'bug' | 'social';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  dueDate: string;
  assignedTo: TeamMember;
}

export interface CreateReminderRequest {
  type: Reminder['type'];
  title: string;
  description: string;
  relatedEntityId: number;
  relatedEntityType: Reminder['relatedEntityType'];
  assigneeId: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface UpcomingDeadline {
  id: number;
  title: string;
  type: 'development' | 'design' | 'infrastructure' | 'security' | 'meeting' | 'testing' | 'planning';
  status: 'pending' | 'in_progress' | 'overdue';
  assignee: TeamMember;
  dueDate: string;
  daysRemaining: number;
  createdAt: string;
}