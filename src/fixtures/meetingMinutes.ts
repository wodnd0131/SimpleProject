import type { MeetingMinutes, ActionItem } from '@/types/MeetingMinutes.types'

export const mockActionItems: ActionItem[] = [
  {
    id: 1,
    description: "Update user authentication flow with OAuth 2.0",
    assignee: {
      username: "sarah_dev",
      avatar: "https://avatars.githubusercontent.com/u/1234567?v=4"
    },
    dueDate: "2024-01-15T00:00:00Z",
    priority: "high",
    status: "in_progress",
    createdAt: "2024-01-01T10:00:00Z"
  },
  {
    id: 2,
    description: "Review and approve new UI components",
    assignee: {
      username: "mike_designer",
      avatar: "https://avatars.githubusercontent.com/u/2345678?v=4"
    },
    dueDate: "2024-01-12T00:00:00Z",
    priority: "medium",
    status: "pending",
    createdAt: "2024-01-01T10:00:00Z"
  },
  {
    id: 3,
    description: "Set up CI/CD pipeline for testing environment",
    assignee: {
      username: "alex_devops",
      avatar: "https://avatars.githubusercontent.com/u/3456789?v=4"
    },
    dueDate: "2024-01-20T00:00:00Z",
    priority: "high",
    status: "pending",
    createdAt: "2024-01-01T10:00:00Z"
  },
  {
    id: 4,
    description: "Create documentation for API endpoints",
    assignee: {
      username: "john_doe",
      avatar: "https://avatars.githubusercontent.com/u/4567890?v=4"
    },
    dueDate: "2024-01-18T00:00:00Z",
    priority: "medium",
    status: "completed",
    linkedIssueId: 12,
    createdAt: "2024-01-01T10:00:00Z"
  }
]

export const mockMeetingMinutes: MeetingMinutes[] = [
  {
    id: 1,
    title: "Sprint Planning - Q1 2024",
    content: `
## Meeting Overview
This meeting focused on planning the Q1 2024 sprint, reviewing project priorities, and assigning key responsibilities to team members.

## Key Discussions
1. **Authentication System Upgrade**: Discussed the need to modernize our authentication system with OAuth 2.0 implementation
2. **UI Component Library**: Reviewed the new design system and component library created by the design team
3. **Infrastructure Improvements**: Planned the implementation of a more robust CI/CD pipeline
4. **Documentation**: Identified gaps in API documentation that need to be addressed

## Decisions Made
- Prioritize authentication system upgrade as P0 for Q1
- Allocate 2 weeks for UI component review and integration
- Begin CI/CD pipeline setup in parallel with development work
- Assign documentation tasks to be completed before next sprint

## Next Steps
- Authentication team to begin OAuth 2.0 research and implementation
- Design team to finalize component specifications
- DevOps team to start CI/CD pipeline architecture
- Technical writing team to begin API documentation update
    `,
    date: "2024-01-01",
    startTime: "09:00",
    endTime: "10:30",
    participants: [
      {
        username: "sarah_dev",
        avatar: "https://avatars.githubusercontent.com/u/1234567?v=4",
        role: "Lead Developer"
      },
      {
        username: "mike_designer",
        avatar: "https://avatars.githubusercontent.com/u/2345678?v=4",
        role: "Senior Designer"
      },
      {
        username: "alex_devops",
        avatar: "https://avatars.githubusercontent.com/u/3456789?v=4",
        role: "DevOps Engineer"
      },
      {
        username: "john_doe",
        avatar: "https://avatars.githubusercontent.com/u/4567890?v=4",
        role: "Technical Writer"
      },
      {
        username: "project_manager",
        avatar: "https://avatars.githubusercontent.com/u/5678901?v=4",
        role: "Project Manager"
      }
    ],
    agenda: [
      "Review Q4 2023 deliverables",
      "Discuss Q1 2024 priorities",
      "Resource allocation and team assignments",
      "Risk assessment and mitigation strategies",
      "Timeline and milestone planning"
    ],
    actionItems: mockActionItems,
    decisions: [
      "Authentication system upgrade is the top priority for Q1",
      "Allocate 40% of development resources to infrastructure improvements",
      "Weekly check-ins every Tuesday at 10 AM",
      "Code freeze 2 weeks before Q1 deadline"
    ],
    attachments: [
      {
        name: "Q1_Project_Timeline.pdf",
        url: "/attachments/q1-timeline.pdf",
        type: "application/pdf"
      },
      {
        name: "UI_Component_Specs.figma",
        url: "https://figma.com/file/components-spec",
        type: "application/figma"
      }
    ],
    createdBy: {
      username: "project_manager",
      avatar: "https://avatars.githubusercontent.com/u/5678901?v=4"
    },
    createdAt: "2024-01-01T11:00:00Z",
    updatedAt: "2024-01-01T11:30:00Z",
    status: "published"
  },
  {
    id: 2,
    title: "Weekly Standup - Week 2",
    content: `
## Team Updates

### Development Team
- Completed user registration flow
- Started OAuth 2.0 integration research
- Fixed 3 critical bugs in dashboard component

### Design Team  
- Finalized color palette for new component library
- Created wireframes for user settings page
- Reviewed accessibility compliance for all components

### DevOps Team
- Configured staging environment
- Set up monitoring dashboards
- Investigating deployment pipeline optimization

## Blockers & Challenges
- Need clarification on OAuth provider selection
- Waiting for API documentation from backend team
- Server capacity concerns for increased load testing

## Next Week Goals
- Complete OAuth provider evaluation
- Implement new button component variants
- Deploy updated monitoring system
    `,
    date: "2024-01-08",
    startTime: "09:30",
    endTime: "10:00",
    participants: [
      {
        username: "sarah_dev",
        avatar: "https://avatars.githubusercontent.com/u/1234567?v=4",
        role: "Lead Developer"
      },
      {
        username: "mike_designer",
        avatar: "https://avatars.githubusercontent.com/u/2345678?v=4",
        role: "Senior Designer"
      },
      {
        username: "alex_devops",
        avatar: "https://avatars.githubusercontent.com/u/3456789?v=4",
        role: "DevOps Engineer"
      }
    ],
    agenda: [
      "Individual team member updates",
      "Blocker identification and resolution",
      "Week ahead planning",
      "Quick wins and achievements"
    ],
    actionItems: [
      {
        id: 5,
        description: "Research OAuth providers and create comparison matrix",
        assignee: {
          username: "sarah_dev",
          avatar: "https://avatars.githubusercontent.com/u/1234567?v=4"
        },
        dueDate: "2024-01-12T00:00:00Z",
        priority: "high",
        status: "pending",
        createdAt: "2024-01-08T10:00:00Z"
      },
      {
        id: 6,
        description: "Update server capacity monitoring alerts",
        assignee: {
          username: "alex_devops",
          avatar: "https://avatars.githubusercontent.com/u/3456789?v=4"
        },
        dueDate: "2024-01-10T00:00:00Z",
        priority: "medium",
        status: "in_progress",
        createdAt: "2024-01-08T10:00:00Z"
      }
    ],
    decisions: [
      "Continue with current sprint velocity",
      "Schedule OAuth provider review meeting for Thursday",
      "Prioritize server capacity investigation"
    ],
    createdBy: {
      username: "sarah_dev",
      avatar: "https://avatars.githubusercontent.com/u/1234567?v=4"
    },
    createdAt: "2024-01-08T10:30:00Z",
    updatedAt: "2024-01-08T10:30:00Z",
    status: "published"
  },
  {
    id: 3,
    title: "Client Feedback Review - Dashboard Redesign",
    content: `
## Client Feedback Summary

### Positive Feedback
- Modern and clean design aesthetic
- Improved navigation and user flow
- Better mobile responsiveness
- Loading performance improvements

### Areas for Improvement
- Dashboard widgets need more customization options
- Color contrast issues in dark mode
- Missing search functionality in data tables
- Export options are not intuitive

### Priority Changes Requested
1. **High Priority**: Add widget customization panel
2. **High Priority**: Fix dark mode contrast issues  
3. **Medium Priority**: Implement table search and filters
4. **Low Priority**: Improve export UI/UX

## Technical Impact Assessment
- Widget customization: ~2 weeks development
- Dark mode fixes: ~3 days development  
- Table search: ~1 week development
- Export improvements: ~3 days development

## Timeline Adjustment
Original delivery: January 31st
New estimated delivery: February 14th
    `,
    date: "2024-01-10",
    startTime: "14:00",
    endTime: "15:30",
    participants: [
      {
        username: "project_manager",
        avatar: "https://avatars.githubusercontent.com/u/5678901?v=4",
        role: "Project Manager"
      },
      {
        username: "mike_designer",
        avatar: "https://avatars.githubusercontent.com/u/2345678?v=4",
        role: "Senior Designer"
      },
      {
        username: "sarah_dev",
        avatar: "https://avatars.githubusercontent.com/u/1234567?v=4",
        role: "Lead Developer"
      },
      {
        username: "client_rep",
        avatar: "https://avatars.githubusercontent.com/u/6789012?v=4",
        role: "Client Representative"
      }
    ],
    agenda: [
      "Client feedback presentation",
      "Technical feasibility assessment",
      "Priority ranking and timeline impact",
      "Resource allocation discussion",
      "Next steps and communication plan"
    ],
    actionItems: [
      {
        id: 7,
        description: "Create widget customization mockups and user flow",
        assignee: {
          username: "mike_designer",
          avatar: "https://avatars.githubusercontent.com/u/2345678?v=4"
        },
        dueDate: "2024-01-15T00:00:00Z",
        priority: "high",
        status: "pending",
        createdAt: "2024-01-10T15:30:00Z"
      },
      {
        id: 8,
        description: "Audit and fix dark mode color contrast issues",
        assignee: {
          username: "mike_designer",
          avatar: "https://avatars.githubusercontent.com/u/2345678?v=4"
        },
        dueDate: "2024-01-13T00:00:00Z",
        priority: "high",
        status: "pending",
        createdAt: "2024-01-10T15:30:00Z"
      },
      {
        id: 9,
        description: "Implement table search and filter functionality",
        assignee: {
          username: "sarah_dev",
          avatar: "https://avatars.githubusercontent.com/u/1234567?v=4"
        },
        dueDate: "2024-01-22T00:00:00Z",
        priority: "medium",
        status: "pending",
        createdAt: "2024-01-10T15:30:00Z"
      }
    ],
    decisions: [
      "Extend project timeline by 2 weeks to accommodate feedback",
      "Prioritize widget customization and dark mode fixes",
      "Schedule weekly client check-ins until delivery",
      "Allocate additional designer resources for this project"
    ],
    attachments: [
      {
        name: "Client_Feedback_Report.pdf",
        url: "/attachments/client-feedback.pdf",
        type: "application/pdf"
      },
      {
        name: "Dashboard_Screenshots.zip",
        url: "/attachments/dashboard-screens.zip",
        type: "application/zip"
      }
    ],
    createdBy: {
      username: "project_manager",
      avatar: "https://avatars.githubusercontent.com/u/5678901?v=4"
    },
    createdAt: "2024-01-10T16:00:00Z",
    updatedAt: "2024-01-10T16:00:00Z",
    status: "published"
  }
]

export default mockMeetingMinutes