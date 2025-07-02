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
    id: 4,
    title: "AI Implementation Strategy - Technical Deep Dive",
    content: `
## Meeting Overview
Technical deep dive into implementing AI-powered features for our project management system.

## Key Discussions
1. **Document Analysis AI**: Architecture for extracting action items from meeting notes
2. **Natural Language Processing**: Implementing NLP pipelines for content analysis
3. **Integration Strategy**: How to connect AI outputs with existing issue tracking
4. **Performance Considerations**: Ensuring AI processing doesn't impact user experience

## Technical Decisions
- Use serverless functions for AI processing to handle variable workloads
- Implement queue system for batch processing of documents
- Create feedback loop for AI accuracy improvement
- Set up monitoring for AI service performance

## Implementation Phases
### Phase 1: Core AI Pipeline (2 weeks)
- Set up document processing queue
- Implement basic text extraction
- Create action item identification logic

### Phase 2: Advanced Features (3 weeks)
- Add sentiment analysis for meeting tone
- Implement participant engagement metrics
- Create automated follow-up suggestions

### Phase 3: Integration & Optimization (2 weeks)
- Connect with existing issue system
- Optimize processing performance
- Add user feedback mechanisms

## Risk Assessment
- **High**: AI accuracy concerns - need extensive testing
- **Medium**: Performance impact on system - requires monitoring
- **Low**: User adoption - feature is optional and additive

## Next Steps
- Begin Phase 1 development immediately
- Set up AI service infrastructure
- Create test dataset for accuracy validation
    `,
    date: "2024-01-15",
    startTime: "14:00",
    endTime: "16:00",
    participants: [
      {
        username: "sarah_dev",
        avatar: "https://avatars.githubusercontent.com/u/1234567?v=4",
        role: "Lead Developer"
      },
      {
        username: "alex_devops",
        avatar: "https://avatars.githubusercontent.com/u/3456789?v=4",
        role: "DevOps Engineer"
      },
      {
        username: "john_doe",
        avatar: "https://avatars.githubusercontent.com/u/4567890?v=4",
        role: "Technical Analyst"
      },
      {
        username: "project_manager",
        avatar: "https://avatars.githubusercontent.com/u/5678901?v=4",
        role: "Technical Project Manager"
      }
    ],
    agenda: [
      "AI architecture review",
      "Technology stack decisions",
      "Implementation timeline planning",
      "Risk assessment and mitigation",
      "Resource allocation discussion"
    ],
    actionItems: [
      {
        id: 10,
        description: "Set up AI processing infrastructure and serverless functions",
        assignee: {
          username: "alex_devops",
          avatar: "https://avatars.githubusercontent.com/u/3456789?v=4"
        },
        dueDate: "2024-01-22T00:00:00Z",
        priority: "high",
        status: "pending",
        createdAt: "2024-01-15T16:00:00Z"
      },
      {
        id: 11,
        description: "Create document processing queue system",
        assignee: {
          username: "sarah_dev",
          avatar: "https://avatars.githubusercontent.com/u/1234567?v=4"
        },
        dueDate: "2024-01-25T00:00:00Z",
        priority: "high",
        status: "pending",
        createdAt: "2024-01-15T16:00:00Z"
      },
      {
        id: 12,
        description: "Research and evaluate NLP libraries for text analysis",
        assignee: {
          username: "john_doe",
          avatar: "https://avatars.githubusercontent.com/u/4567890?v=4"
        },
        dueDate: "2024-01-20T00:00:00Z",
        priority: "medium",
        status: "pending",
        createdAt: "2024-01-15T16:00:00Z"
      }
    ],
    decisions: [
      "Proceed with serverless architecture for AI processing",
      "Implement queue-based system for document processing",
      "Create 3-phase implementation plan over 7 weeks",
      "Establish performance monitoring from day one"
    ],
    attachments: [
      {
        name: "AI_Architecture_Diagram.pdf",
        url: "/attachments/ai-architecture.pdf",
        type: "application/pdf"
      },
      {
        name: "Technology_Comparison_Matrix.xlsx",
        url: "/attachments/tech-comparison.xlsx",
        type: "application/excel"
      }
    ],
    createdBy: {
      username: "project_manager",
      avatar: "https://avatars.githubusercontent.com/u/5678901?v=4"
    },
    createdAt: "2024-01-15T16:30:00Z",
    updatedAt: "2024-01-15T16:30:00Z",
    status: "published"
  },
  {
    id: 5,
    title: "Team Performance Review - Q1 2024",
    content: `
## Team Performance Summary

### Overall Team Metrics
- **Sprint Completion Rate**: 94% (up from 87% last quarter)
- **Bug Resolution Time**: Average 2.3 days (improved from 3.1 days)
- **Client Satisfaction Score**: 4.6/5.0 (up from 4.2/5.0)
- **Team Velocity**: 45 story points per sprint (target: 40)

### Individual Performance Highlights

#### Sarah Dev (Lead Developer)
- **Completed Tasks**: 28 (target: 25)
- **Code Review Quality**: 9.2/10
- **Mentoring Impact**: Successfully onboarded 2 junior developers
- **Innovation**: Led implementation of new authentication system

#### Mike Designer (Senior Designer)
- **Completed Tasks**: 22 (target: 20)
- **Design System Adoption**: 100% across all new features
- **User Testing Sessions**: Conducted 8 sessions with valuable insights
- **Cross-team Collaboration**: Excellent collaboration with development team

#### Alex DevOps (DevOps Engineer)
- **Infrastructure Uptime**: 99.97% (exceeds 99.9% SLA)
- **Deployment Success Rate**: 100% (0 failed deployments)
- **Performance Optimizations**: Reduced build time by 35%
- **Security Compliance**: Implemented 12 security improvements

#### John Doe (QA Specialist)
- **Test Coverage**: Increased from 78% to 92%
- **Bug Detection Rate**: Found 89% of bugs before production
- **Process Improvements**: Introduced automated regression testing
- **Documentation**: Created comprehensive testing guidelines

### Areas for Improvement
1. **Communication**: Need more frequent progress updates
2. **Time Estimation**: Some tasks consistently underestimated
3. **Knowledge Sharing**: Implement regular tech talks
4. **Tool Utilization**: Better adoption of project management tools

### Action Items for Next Quarter
- Implement daily standups for better communication
- Conduct estimation training workshops
- Start monthly technical presentation series
- Provide advanced training on project management tools
    `,
    date: "2024-01-18",
    startTime: "10:00",
    endTime: "12:00",
    participants: [
      {
        username: "project_manager",
        avatar: "https://avatars.githubusercontent.com/u/5678901?v=4",
        role: "Project Manager"
      },
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
        role: "QA Specialist"
      },
      {
        username: "emma_admin",
        avatar: "https://avatars.githubusercontent.com/u/6789012?v=4",
        role: "HR Representative"
      }
    ],
    agenda: [
      "Q1 performance metrics review",
      "Individual performance discussions",
      "Team achievement recognition",
      "Areas for improvement identification",
      "Q2 goals and objectives setting",
      "Training and development planning"
    ],
    actionItems: [
      {
        id: 13,
        description: "Implement daily standup meetings starting next sprint",
        assignee: {
          username: "project_manager",
          avatar: "https://avatars.githubusercontent.com/u/5678901?v=4"
        },
        dueDate: "2024-01-22T00:00:00Z",
        priority: "high",
        status: "pending",
        createdAt: "2024-01-18T12:00:00Z"
      },
      {
        id: 14,
        description: "Schedule estimation training workshop for development team",
        assignee: {
          username: "sarah_dev",
          avatar: "https://avatars.githubusercontent.com/u/1234567?v=4"
        },
        dueDate: "2024-01-25T00:00:00Z",
        priority: "medium",
        status: "pending",
        createdAt: "2024-01-18T12:00:00Z"
      },
      {
        id: 15,
        description: "Create monthly tech talk schedule and assign speakers",
        assignee: {
          username: "emma_admin",
          avatar: "https://avatars.githubusercontent.com/u/6789012?v=4"
        },
        dueDate: "2024-01-30T00:00:00Z",
        priority: "medium",
        status: "pending",
        createdAt: "2024-01-18T12:00:00Z"
      }
    ],
    decisions: [
      "Team exceeded Q1 performance targets",
      "Implement daily standups to improve communication",
      "Invest in team training and development programs",
      "Recognize outstanding individual contributions"
    ],
    attachments: [
      {
        name: "Q1_Performance_Metrics.pdf",
        url: "/attachments/q1-performance.pdf",
        type: "application/pdf"
      },
      {
        name: "Team_Achievement_Awards.pdf",
        url: "/attachments/team-awards.pdf",
        type: "application/pdf"
      }
    ],
    createdBy: {
      username: "project_manager",
      avatar: "https://avatars.githubusercontent.com/u/5678901?v=4"
    },
    createdAt: "2024-01-18T12:30:00Z",
    updatedAt: "2024-01-18T12:30:00Z",
    status: "published"
  },
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