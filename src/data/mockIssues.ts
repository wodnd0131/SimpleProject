
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
  }
];
