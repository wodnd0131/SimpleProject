
export interface Issue {
  id: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  author: {
    username: string;
    avatar: string;
  };
  assignees: Array<{
    username: string;
    avatar: string;
  }>;
  labels: Array<{
    name: string;
    color: string;
  }>;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  number: number;
}

export interface Comment {
  id: number;
  body: string;
  author: {
    username: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}
