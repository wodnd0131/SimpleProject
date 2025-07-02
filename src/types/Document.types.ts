export interface Document {
  id: number;
  title: string;
  content: string;
  type: 'meeting-notes' | 'project-update' | 'technical-spec' | 'general';
  createdBy: {
    id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  tags: string[];
  generatedIssues?: number[];
  generatedReminders?: number[];
  status: 'draft' | 'published' | 'archived';
  aiAnalysis?: {
    processed: boolean;
    extractedActionItems: number;
    generatedIssues: number;
    generatedReminders: number;
    processedAt: string;
    summary: string;
  };
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
}

export interface CreateDocumentRequest {
  title: string;
  content: string;
  type: Document['type'];
  tags?: string[];
}

export interface UpdateDocumentRequest {
  title?: string;
  content?: string;
  type?: Document['type'];
  tags?: string[];
  status?: Document['status'];
}

export interface WorkTimeRecord {
  id: number;
  userId: string;
  projectId: string;
  issueId?: number;
  description: string;
  hoursSpent: number;
  date: string;
  category: 'development' | 'design' | 'testing' | 'documentation' | 'infrastructure' | 'meeting';
  billable: boolean;
}