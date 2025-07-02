import type { Document, DocumentTemplate } from '@/types/Document.types'

export const mockDocumentTemplates: DocumentTemplate[] = [
  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Template for meeting minutes and action items',
    content: `# Meeting Notes - [Meeting Name]

**Date:** [Date]
**Time:** [Start Time] - [End Time]
**Participants:** [List of participants]

## Agenda
1. [Agenda item 1]
2. [Agenda item 2]
3. [Agenda item 3]

## Discussion Points
### [Topic 1]
- [Key discussion points]
- [Decisions made]

### [Topic 2]
- [Key discussion points]
- [Decisions made]

## Action Items
- [ ] [Action item 1] - Assigned to: [Name] - Due: [Date]
- [ ] [Action item 2] - Assigned to: [Name] - Due: [Date]

## Next Steps
- [Next step 1]
- [Next step 2]

## Next Meeting
**Date:** [Next meeting date]
**Agenda:** [Preliminary agenda items]
`
  },
  {
    id: 'project-update',
    name: 'Project Update',
    description: 'Template for project status updates and progress reports',
    content: `# Project Update - [Project Name]

**Date:** [Date]
**Reporting Period:** [Start Date] - [End Date]
**Project Manager:** [Name]

## Executive Summary
[Brief overview of project status and key achievements]

## Progress This Period
### Completed Tasks
- [Task 1] - [Completion date]
- [Task 2] - [Completion date]

### In Progress
- [Task 1] - [Current status] - [Expected completion]
- [Task 2] - [Current status] - [Expected completion]

### Upcoming Tasks
- [Task 1] - [Planned start date]
- [Task 2] - [Planned start date]

## Metrics & KPIs
- **Completion Rate:** [X]%
- **Budget Utilization:** [X]%
- **Timeline Status:** [On track/At risk/Delayed]

## Risks & Issues
### Current Risks
- [Risk 1] - [Mitigation strategy]
- [Risk 2] - [Mitigation strategy]

### Issues Resolved
- [Issue 1] - [Resolution]
- [Issue 2] - [Resolution]

## Resource Updates
- [Resource allocation changes]
- [Team member updates]
- [Budget adjustments]

## Next Period Goals
1. [Goal 1]
2. [Goal 2]
3. [Goal 3]
`
  },
  {
    id: 'technical-spec',
    name: 'Technical Specification',
    description: 'Template for technical specifications and design documents',
    content: `# Technical Specification - [Feature Name]

**Date:** [Date]
**Author:** [Author Name]
**Version:** [Version Number]

## Overview
[Brief description of the feature or system being specified]

## Requirements
### Functional Requirements
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

### Non-Functional Requirements
- **Performance:** [Performance requirements]
- **Security:** [Security requirements]
- **Scalability:** [Scalability requirements]

## System Architecture
### Components
- [Component 1] - [Description]
- [Component 2] - [Description]

### Data Flow
[Describe how data flows through the system]

## API Design
### Endpoints
\`\`\`
GET /api/[endpoint]
POST /api/[endpoint]
PUT /api/[endpoint]
DELETE /api/[endpoint]
\`\`\`

### Data Models
\`\`\`json
{
  "field1": "type",
  "field2": "type"
}
\`\`\`

## Implementation Plan
### Phase 1
- [Task 1]
- [Task 2]

### Phase 2
- [Task 1]
- [Task 2]

## Testing Strategy
- Unit tests
- Integration tests
- Performance tests

## Risks & Considerations
- [Risk 1]
- [Risk 2]
`
  }
]

export const mockDocuments: Document[] = [
  {
    id: 1,
    title: "Sprint Planning Meeting - Q1 2024",
    content: `# Sprint Planning Meeting - Q1 2024

**Date:** January 1, 2024
**Time:** 09:00 - 10:30
**Participants:** Sarah Dev, Mike Designer, Alex DevOps, John Doe, Project Manager

## Agenda
1. Review Q4 2023 deliverables
2. Discuss Q1 2024 priorities
3. Resource allocation and team assignments
4. Risk assessment and mitigation strategies
5. Timeline and milestone planning

## Discussion Points
### Authentication System Upgrade
- Current system is outdated and security concerns have been raised
- Need to implement OAuth 2.0 for better security and user experience
- Estimated timeline: 3-4 weeks with current resources
- **Decision:** This is our top priority for Q1

### UI Component Library
- Design team has created comprehensive component library
- Need to review and integrate into existing codebase
- Some components may need accessibility improvements
- **Decision:** Allocate 2 weeks for review and integration

### Infrastructure Improvements
- CI/CD pipeline needs optimization
- Server monitoring needs enhancement
- Database performance optimization required
- **Decision:** Start CI/CD work in parallel with development

## Action Items
- [ ] Update user authentication flow with OAuth 2.0 - Assigned to: Sarah Dev - Due: January 15, 2024
- [ ] Review and approve new UI components - Assigned to: Mike Designer - Due: January 12, 2024
- [ ] Set up CI/CD pipeline for testing environment - Assigned to: Alex DevOps - Due: January 20, 2024
- [ ] Create documentation for API endpoints - Assigned to: John Doe - Due: January 18, 2024

## Next Steps
- Authentication team to begin OAuth 2.0 research and implementation
- Design team to finalize component specifications
- DevOps team to start CI/CD pipeline architecture
- Technical writing team to begin API documentation update

## Next Meeting
**Date:** January 8, 2024
**Agenda:** Progress updates and blocker discussions
`,
    type: 'meeting-notes',
    createdBy: {
      id: 'project_manager',
      username: 'project_manager',
      avatar: 'https://avatars.githubusercontent.com/u/5678901?v=4'
    },
    createdAt: '2024-01-01T11:00:00Z',
    updatedAt: '2024-01-01T11:30:00Z',
    tags: ['meeting', 'sprint-planning', 'q1-2024'],
    generatedIssues: [101, 102, 103],
    generatedReminders: [1, 2, 3, 4],
    status: 'published',
    aiAnalysis: {
      processed: true,
      extractedActionItems: 4,
      generatedIssues: 3,
      generatedReminders: 4,
      processedAt: '2024-01-01T11:35:00Z',
      summary: 'Sprint planning meeting focused on Q1 priorities with emphasis on authentication system upgrade. Generated 4 action items and 3 high-priority issues.'
    }
  },
  {
    id: 2,
    title: "Dashboard Redesign - Technical Specification",
    content: `# Dashboard Redesign - Technical Specification

**Date:** January 5, 2024
**Author:** Sarah Dev & Mike Designer
**Version:** 1.2

## Overview
This specification outlines the technical requirements and implementation plan for the dashboard redesign project. The goal is to create a more intuitive, performant, and customizable dashboard experience.

## Requirements
### Functional Requirements
1. Widget-based dashboard layout with drag-and-drop customization
2. Real-time data updates with WebSocket connections
3. Advanced filtering and search capabilities
4. Export functionality for charts and data tables
5. Responsive design for mobile and tablet devices
6. Dark mode support with proper contrast ratios

### Non-Functional Requirements
- **Performance:** Page load time under 2 seconds
- **Security:** Role-based access control for dashboard widgets
- **Scalability:** Support for 1000+ concurrent users

## System Architecture
### Components
- Dashboard Container - Main layout component
- Widget System - Modular widget architecture
- Data Layer - Real-time data management
- Export Service - Data export functionality

### Data Flow
User interactions trigger state changes which update widget components through a centralized state management system. Real-time updates are received via WebSocket connections.

## Implementation Plan
### Phase 1: Core Dashboard Framework
- Set up new dashboard component structure
- Implement widget system architecture
- Create basic layout and grid system

### Phase 2: Widget Development
- Develop chart widgets (bar, line, pie)
- Create data table widgets with search/filter
- Implement KPI metric widgets

### Phase 3: Customization Features
- Add drag-and-drop functionality
- Implement widget configuration panels
- Create save/load dashboard layouts

## Action Items Generated
- [ ] Create widget base class and interface - Due: January 12, 2024
- [ ] Implement WebSocket data service - Due: January 15, 2024
- [ ] Design widget configuration UI - Due: January 10, 2024
`,
    type: 'technical-spec',
    createdBy: {
      id: 'sarah_dev',
      username: 'sarah_dev',
      avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4'
    },
    createdAt: '2024-01-05T14:00:00Z',
    updatedAt: '2024-01-05T16:30:00Z',
    tags: ['technical-spec', 'dashboard', 'redesign'],
    generatedIssues: [104, 105, 106],
    generatedReminders: [5, 6],
    status: 'published',
    aiAnalysis: {
      processed: true,
      extractedActionItems: 3,
      generatedIssues: 3,
      generatedReminders: 2,
      processedAt: '2024-01-05T16:35:00Z',
      summary: 'Technical specification for dashboard redesign with focus on widget-based architecture. Identified 3 implementation phases and generated related development tasks.'
    }
  },
  {
    id: 3,
    title: "Weekly Team Standup - Week 2",
    content: `# Weekly Team Standup - Week 2

**Date:** January 8, 2024
**Time:** 09:30 - 10:00
**Participants:** Sarah Dev, Mike Designer, Alex DevOps

## Team Updates

### Sarah Dev (Development Team)
**Completed:**
- Finished user registration flow implementation
- Fixed 3 critical bugs in dashboard component
- Started research on OAuth 2.0 providers

**In Progress:**
- OAuth 2.0 integration implementation
- Code review for authentication module

**Blockers:**
- Need clarification on which OAuth provider to use (Google vs GitHub vs Auth0)
- Waiting for API documentation from backend team

**Next Week:**
- Complete OAuth provider evaluation
- Begin authentication flow implementation

### Mike Designer (Design Team)
**Completed:**
- Finalized color palette for new component library
- Created wireframes for user settings page
- Reviewed accessibility compliance for all components

**In Progress:**
- Dashboard widget customization mockups
- Mobile responsive design updates

**Blockers:**
- Need feedback on latest design iterations from stakeholders

**Next Week:**
- Implement new button component variants
- Create widget configuration UI designs

### Alex DevOps (Infrastructure Team)
**Completed:**
- Configured staging environment
- Set up monitoring dashboards
- Updated server security patches

**In Progress:**
- CI/CD pipeline optimization
- Database performance monitoring

**Blockers:**
- Server capacity concerns for increased load testing
- Need approval for additional cloud resources

**Next Week:**
- Deploy updated monitoring system
- Implement automated backup procedures

## Team Decisions
- Continue with current sprint velocity
- Schedule OAuth provider review meeting for Thursday
- Prioritize server capacity investigation

## Action Items
- [ ] Research OAuth providers and create comparison matrix - Sarah Dev - Due: January 12, 2024
- [ ] Update server capacity monitoring alerts - Alex DevOps - Due: January 10, 2024
- [ ] Schedule stakeholder feedback session - Mike Designer - Due: January 9, 2024
`,
    type: 'meeting-notes',
    createdBy: {
      id: 'sarah_dev',
      username: 'sarah_dev',
      avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4'
    },
    createdAt: '2024-01-08T10:30:00Z',
    updatedAt: '2024-01-08T10:30:00Z',
    tags: ['standup', 'weekly', 'team-update'],
    generatedIssues: [107, 108],
    generatedReminders: [7, 8, 9],
    status: 'published',
    aiAnalysis: {
      processed: true,
      extractedActionItems: 3,
      generatedIssues: 2,
      generatedReminders: 3,
      processedAt: '2024-01-08T10:35:00Z',
      summary: 'Weekly standup covering team progress and blockers. Identified 3 action items and 2 issues requiring immediate attention.'
    }
  }
]

export const mockWorkTimeRecords = [
  {
    id: 1,
    userId: 'sarah_dev',
    projectId: '1',
    issueId: 101,
    description: 'OAuth 2.0 research and implementation',
    hoursSpent: 6.5,
    date: '2024-01-08',
    category: 'development',
    billable: true
  },
  {
    id: 2,
    userId: 'mike_designer',
    projectId: '2',
    description: 'Dashboard widget mockups',
    hoursSpent: 4.0,
    date: '2024-01-08',
    category: 'design',
    billable: true
  },
  {
    id: 3,
    userId: 'alex_devops',
    projectId: '1',
    issueId: 103,
    description: 'CI/CD pipeline setup',
    hoursSpent: 5.5,
    date: '2024-01-08',
    category: 'infrastructure',
    billable: true
  },
  {
    id: 4,
    userId: 'john_doe',
    projectId: '1',
    issueId: 104,
    description: 'API documentation updates',
    hoursSpent: 3.0,
    date: '2024-01-08',
    category: 'documentation',
    billable: false
  }
]

export default {
  mockDocumentTemplates,
  mockDocuments,
  mockWorkTimeRecords
}