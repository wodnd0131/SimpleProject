export interface MeetingMinutes {
  id: number;
  title: string;
  content: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: Array<{
    username: string;
    avatar: string;
    role?: string;
  }>;
  agenda: string[];
  actionItems: ActionItem[];
  decisions: string[];
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  createdBy: {
    username: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
}

export interface ActionItem {
  id: number;
  description: string;
  assignee?: {
    username: string;
    avatar: string;
  };
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  linkedIssueId?: number;
  createdAt: string;
}

export interface CreateMeetingMinutesRequest {
  title: string;
  content: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: string[];
  agenda: string[];
  status: 'draft' | 'published';
}

export interface UpdateMeetingMinutesRequest extends Partial<CreateMeetingMinutesRequest> {
  actionItems?: Omit<ActionItem, 'id' | 'createdAt'>[];
  decisions?: string[];
}