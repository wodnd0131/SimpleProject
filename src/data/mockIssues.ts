
import { Issue } from '../types/issue';

export const mockIssues: Issue[] = [
  {
    id: 1,
    number: 1,
    title: "페이지 로딩 속도 개선이 필요합니다",
    body: "현재 메인 페이지의 로딩 속도가 너무 느립니다. 이미지 최적화와 코드 스플리팅을 통해 성능을 개선해야 합니다.\n\n## 현재 상황\n- 첫 페이지 로드: 3.2초\n- 이미지 용량: 2MB+\n\n## 개선 방안\n1. 이미지 압축 및 WebP 포맷 사용\n2. 지연 로딩 구현\n3. 코드 스플리팅 적용",
    state: 'open',
    author: {
      username: 'developer1',
      avatar: '/placeholder.svg'
    },
    assignees: [
      {
        username: 'frontend-dev',
        avatar: '/placeholder.svg'
      }
    ],
    labels: [
      { name: 'bug', color: '#d73a49' },
      { name: 'performance', color: '#0075ca' }
    ],
    comments: [
      {
        id: 1,
        body: "이 문제는 정말 중요하네요. 우선순위를 높여서 처리해야겠습니다.",
        author: {
          username: 'project-manager',
          avatar: '/placeholder.svg'
        },
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
      }
    ],
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    number: 2,
    title: "다크 모드 지원 추가",
    body: "사용자 경험 향상을 위해 다크 모드를 지원해야 합니다.\n\n## 요구사항\n- 시스템 설정에 따른 자동 모드 전환\n- 수동 토글 기능\n- 모든 컴포넌트에서 다크 모드 지원",
    state: 'open',
    author: {
      username: 'ux-designer',
      avatar: '/placeholder.svg'
    },
    assignees: [],
    labels: [
      { name: 'enhancement', color: '#a2eeef' },
      { name: 'design', color: '#f9d0c4' }
    ],
    comments: [],
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    number: 3,
    title: "로그인 폼 유효성 검사 오류",
    body: "로그인 폼에서 이메일 형식 검증이 제대로 작동하지 않습니다.",
    state: 'closed',
    author: {
      username: 'tester1',
      avatar: '/placeholder.svg'
    },
    assignees: [
      {
        username: 'backend-dev',
        avatar: '/placeholder.svg'
      }
    ],
    labels: [
      { name: 'bug', color: '#d73a49' },
      { name: 'auth', color: '#0e8a16' }
    ],
    comments: [
      {
        id: 2,
        body: "수정 완료되었습니다. 정규식 패턴을 업데이트했습니다.",
        author: {
          username: 'backend-dev',
          avatar: '/placeholder.svg'
        },
        createdAt: '2024-01-13T16:45:00Z',
        updatedAt: '2024-01-13T16:45:00Z'
      }
    ],
    createdAt: '2024-01-13T11:15:00Z',
    updatedAt: '2024-01-13T16:45:00Z'
  },
  {
    id: 101,
    number: 101,
    title: "Implement OAuth 2.0 authentication flow",
    body: "Update user authentication flow with OAuth 2.0 as discussed in Sprint Planning Meeting.\n\n## Requirements\n- Research OAuth providers (Google, GitHub, Auth0)\n- Implement OAuth 2.0 flow\n- Update existing authentication system\n- Ensure backward compatibility\n\n## Acceptance Criteria\n- [ ] OAuth provider comparison completed\n- [ ] OAuth 2.0 flow implemented\n- [ ] Unit tests written\n- [ ] Documentation updated\n\nGenerated from: Sprint Planning Meeting - Q1 2024",
    state: 'open',
    author: {
      username: 'ai-assistant',
      avatar: '/placeholder.svg'
    },
    assignees: [
      {
        username: 'sarah_dev',
        avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4'
      }
    ],
    labels: [
      { name: 'enhancement', color: '#a2eeef' },
      { name: 'auth', color: '#0e8a16' },
      { name: 'high priority', color: '#d73a49' }
    ],
    comments: [],
    createdAt: '2024-01-01T11:35:00Z',
    updatedAt: '2024-01-01T11:35:00Z'
  },
  {
    id: 102,
    number: 102,
    title: "Review and approve new UI components",
    body: "Review the new UI component library created by the design team and approve for integration.\n\n## Tasks\n- Review component specifications\n- Test accessibility compliance\n- Validate design consistency\n- Approve for development integration\n\n## Components to Review\n- Button variants\n- Form components\n- Navigation elements\n- Card layouts\n\nGenerated from: Sprint Planning Meeting - Q1 2024",
    state: 'in_progress',
    author: {
      username: 'ai-assistant',
      avatar: '/placeholder.svg'
    },
    assignees: [
      {
        username: 'mike_designer',
        avatar: 'https://avatars.githubusercontent.com/u/2345678?v=4'
      }
    ],
    labels: [
      { name: 'design', color: '#f9d0c4' },
      { name: 'review', color: '#fbca04' }
    ],
    comments: [],
    createdAt: '2024-01-01T11:35:00Z',
    updatedAt: '2024-01-08T09:00:00Z'
  },
  {
    id: 103,
    number: 103,
    title: "Set up CI/CD pipeline for testing environment",
    body: "Set up automated CI/CD pipeline to improve development workflow and testing processes.\n\n## Scope\n- Configure build automation\n- Set up testing environment\n- Implement deployment pipeline\n- Add monitoring and alerts\n\n## Technologies\n- GitHub Actions or Jenkins\n- Docker containers\n- Testing frameworks\n- Monitoring tools\n\nGenerated from: Sprint Planning Meeting - Q1 2024",
    state: 'open',
    author: {
      username: 'ai-assistant',
      avatar: '/placeholder.svg'
    },
    assignees: [
      {
        username: 'alex_devops',
        avatar: 'https://avatars.githubusercontent.com/u/3456789?v=4'
      }
    ],
    labels: [
      { name: 'infrastructure', color: '#0075ca' },
      { name: 'devops', color: '#1d76db' }
    ],
    comments: [],
    createdAt: '2024-01-01T11:35:00Z',
    updatedAt: '2024-01-01T11:35:00Z'
  },
  {
    id: 104,
    number: 104,
    title: "Create widget base class and interface",
    body: "Develop the foundation for the dashboard widget system as specified in the technical documentation.\n\n## Requirements\n- Create base widget interface\n- Implement common widget functionality\n- Define widget lifecycle methods\n- Add configuration support\n\n## Technical Details\n- TypeScript interfaces\n- React component patterns\n- Configuration schema\n- Event handling system\n\nGenerated from: Dashboard Redesign - Technical Specification",
    state: 'open',
    author: {
      username: 'ai-assistant',
      avatar: '/placeholder.svg'
    },
    assignees: [
      {
        username: 'sarah_dev',
        avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4'
      }
    ],
    labels: [
      { name: 'enhancement', color: '#a2eeef' },
      { name: 'architecture', color: '#5319e7' }
    ],
    comments: [],
    createdAt: '2024-01-05T16:35:00Z',
    updatedAt: '2024-01-05T16:35:00Z'
  },
  {
    id: 105,
    number: 105,
    title: "Implement WebSocket data service",
    body: "Create WebSocket service for real-time data updates in the dashboard.\n\n## Features\n- Real-time data connections\n- Automatic reconnection\n- Error handling\n- Data caching\n\n## Implementation\n- WebSocket client setup\n- Message handling\n- State synchronization\n- Performance optimization\n\nGenerated from: Dashboard Redesign - Technical Specification",
    state: 'open',
    author: {
      username: 'ai-assistant',
      avatar: '/placeholder.svg'
    },
    assignees: [
      {
        username: 'sarah_dev',
        avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4'
      }
    ],
    labels: [
      { name: 'enhancement', color: '#a2eeef' },
      { name: 'performance', color: '#0075ca' }
    ],
    comments: [],
    createdAt: '2024-01-05T16:35:00Z',
    updatedAt: '2024-01-05T16:35:00Z'
  },
  {
    id: 106,
    number: 106,
    title: "Design widget configuration UI",
    body: "Create user interface for configuring dashboard widgets.\n\n## UI Requirements\n- Drag-and-drop interface\n- Widget property panels\n- Preview functionality\n- Save/load configurations\n\n## Design Considerations\n- User experience\n- Accessibility\n- Mobile responsiveness\n- Visual consistency\n\nGenerated from: Dashboard Redesign - Technical Specification",
    state: 'open',
    author: {
      username: 'ai-assistant',
      avatar: '/placeholder.svg'
    },
    assignees: [
      {
        username: 'mike_designer',
        avatar: 'https://avatars.githubusercontent.com/u/2345678?v=4'
      }
    ],
    labels: [
      { name: 'design', color: '#f9d0c4' },
      { name: 'ui/ux', color: '#c5def5' }
    ],
    comments: [],
    createdAt: '2024-01-05T16:35:00Z',
    updatedAt: '2024-01-05T16:35:00Z'
  },
  {
    id: 107,
    number: 107,
    title: "Research OAuth providers and create comparison matrix",
    body: "Evaluate different OAuth providers to make an informed decision for authentication implementation.\n\n## Providers to Research\n- Google OAuth\n- GitHub OAuth\n- Auth0\n- Microsoft Azure AD\n\n## Comparison Criteria\n- Security features\n- Integration complexity\n- Cost considerations\n- Documentation quality\n- Community support\n\nGenerated from: Weekly Team Standup - Week 2",
    state: 'in_progress',
    author: {
      username: 'ai-assistant',
      avatar: '/placeholder.svg'
    },
    assignees: [
      {
        username: 'sarah_dev',
        avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4'
      }
    ],
    labels: [
      { name: 'research', color: '#fbca04' },
      { name: 'auth', color: '#0e8a16' }
    ],
    comments: [],
    createdAt: '2024-01-08T10:35:00Z',
    updatedAt: '2024-01-09T14:00:00Z'
  },
  {
    id: 108,
    number: 108,
    title: "Update server capacity monitoring alerts",
    body: "Improve server monitoring system to better handle increased load testing requirements.\n\n## Current Issues\n- Monitoring alerts are too sensitive\n- False positive notifications\n- Insufficient capacity metrics\n\n## Improvements Needed\n- Refine alert thresholds\n- Add capacity planning metrics\n- Implement predictive monitoring\n- Set up automated scaling triggers\n\nGenerated from: Weekly Team Standup - Week 2",
    state: 'in_progress',
    author: {
      username: 'ai-assistant',
      avatar: '/placeholder.svg'
    },
    assignees: [
      {
        username: 'alex_devops',
        avatar: 'https://avatars.githubusercontent.com/u/3456789?v=4'
      }
    ],
    labels: [
      { name: 'infrastructure', color: '#0075ca' },
      { name: 'monitoring', color: '#1d76db' }
    ],
    comments: [],
    createdAt: '2024-01-08T10:35:00Z',
    updatedAt: '2024-01-10T11:30:00Z'
  }
];
