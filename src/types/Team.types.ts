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
  dueSoon: number;
  inProgress: number;
  completed: number;
  completionRate: number;
}

export interface Reminder {
  id: number;
  type: 'issue_due' | 'meeting_upcoming' | 'action_item' | 'overdue';
  title: string;
  description: string;
  relatedEntityId: number;
  relatedEntityType: 'issue' | 'meeting' | 'action_item';
  assigneeId: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'sent' | 'acknowledged' | 'dismissed';
  createdAt: string;
  sentAt?: string;
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