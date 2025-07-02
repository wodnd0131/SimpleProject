# 컴포넌트 디자인 시스템

이 디렉토리는 TypeScript, Tailwind CSS, Class Variance Authority (CVA)를 사용하여 확장 가능한 React 애플리케이션을 위해 구축된 포괄적인 디자인 시스템을 포함합니다.

## 아키텍처

```
src/components/
├── common/           # 재사용 가능한 비즈니스 컴포넌트
├── layout/           # 레이아웃 컴포넌트
└── ui/              # 기본 shadcn/ui 컴포넌트
```

## 디자인 토큰

`src/lib/design-tokens.ts`에 위치하며, 애플리케이션 전반에 걸쳐 일관된 간격, 색상, 타이포그래피 및 기타 디자인 값을 제공합니다.

### 사용법
```typescript
import { designTokens } from '@/lib/design-tokens'

// 토큰 접근
const spacing = designTokens.spacing.lg
const issueOpenColor = designTokens.issue.states.open.color
```

## 공통 컴포넌트

### StatusBadge
일관된 스타일링과 표시기로 이슈 상태를 표시합니다.

```tsx
import { StatusBadge } from '@/components/common'

<StatusBadge status="open" size="md" />
<StatusBadge status="closed" size="sm" showIndicator={false} />
```

**변형들:**
- `status`: 'open' | 'closed' | 'draft'
- `size`: 'sm' | 'md' | 'lg'

### UserAvatar
폴백 지원을 갖춘 유연한 아바타 컴포넌트입니다.

```tsx
import { UserAvatar } from '@/components/common'

<UserAvatar src={user.avatar} alt={user.name} size="md" />
<UserAvatar fallback="JD" size="lg" />
```

**변형들:**
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

### IssueCard
구성 가능한 기능을 갖춘 완전한 이슈 표시 컴포넌트입니다.

```tsx
import { IssueCard } from '@/components/common'

<IssueCard 
  issue={issue} 
  variant="default"
  showLabels={true}
  showAssignees={true}
  showCommentCount={true}
/>
```

**변형들:**
- `variant`: 'default' | 'compact' | 'detailed'
- `interactive`: true | false

### LabelBadge
커스텀 색상과 인터랙티브 기능을 갖춘 이슈 라벨을 표시합니다.

```tsx
import { LabelBadge } from '@/components/common'

<LabelBadge 
  label={{ name: 'bug', color: '#d73a49' }}
  size="md"
  removable
  onRemove={() => handleRemove()}
/>
```

### CommentCard
작성자 정보와 타임스탬프를 포함한 표준화된 댓글 표시입니다.

```tsx
import { CommentCard } from '@/components/common'

<CommentCard
  author={comment.author}
  createdAt={comment.createdAt}
  body={comment.body}
  variant="highlighted"
/>
```

### SearchInput
아이콘과 일관된 스타일링을 갖춘 향상된 검색 입력입니다.

```tsx
import { SearchInput } from '@/components/common'

<SearchInput
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="이슈 검색..."
  size="md"
/>
```

### IssueTabs
이슈 필터링을 위해 특별히 설계된 탭 컴포넌트입니다.

```tsx
import { IssueTabs } from '@/components/common'

<IssueTabs
  openCount={openIssues.length}
  closedCount={closedIssues.length}
  openContent={<IssueList issues={openIssues} />}
  closedContent={<IssueList issues={closedIssues} />}
/>
```

## 레이아웃 컴포넌트

### PageLayout
일관된 간격과 반응형 디자인을 갖춘 메인 페이지 래퍼입니다.

```tsx
import { PageLayout } from '@/components/layout'

<PageLayout spacing="comfortable" maxWidth="lg">
  {children}
</PageLayout>
```

**변형들:**
- `spacing`: 'comfortable' | 'compact' | 'none'
- `maxWidth`: 'sm' | 'md' | 'lg' | 'xl' | 'full'

### PageHeader
제목, 부제목, 액션을 포함한 표준화된 페이지 헤더입니다.

```tsx
import { PageHeader } from '@/components/layout'

<PageHeader
  title="이슈"
  subtitle="프로젝트 이슈를 관리하세요"
  titleSize="lg"
  actions={<Button>새 이슈</Button>}
/>
```

## Class Variance Authority (CVA)

모든 컴포넌트는 타입 안전한 변형 관리를 위해 CVA를 사용합니다:

```typescript
const componentVariants = cva(
  'base-classes',
  {
    variants: {
      size: {
        sm: 'small-classes',
        md: 'medium-classes',
        lg: 'large-classes',
      },
      variant: {
        default: 'default-classes',
        special: 'special-classes',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)
```

## TypeScript 통합

모든 컴포넌트는 적절한 TypeScript 인터페이스를 포함합니다:

```typescript
interface ComponentProps extends VariantProps<typeof componentVariants> {
  className?: string
  children?: ReactNode
  // 컴포넌트별 props
}
```

## 모범 사례

1. **디자인 토큰 사용** - 일관된 간격과 색상을 위해
2. **CVA 변형 활용** - 컴포넌트 유연성을 위해
3. **네이밍 컨벤션 준수** - 컴포넌트는 PascalCase, 함수는 camelCase
4. **적절한 TypeScript 타입 포함** - 모든 props에 대해
5. **복합 컴포넌트 사용** - 복잡한 UI 패턴을 위해
6. **접근성 유지** - 적절한 ARIA 속성과 함께

## 마이그레이션 가이드

기존 컴포넌트를 마이그레이션할 때:

1. 하드코딩된 Tailwind 클래스를 디자인 토큰으로 교체
2. 중복된 코드 대신 새로운 재사용 가능한 컴포넌트 사용
3. 컴포넌트 변형을 위해 CVA 변형 적용
4. 새로운 컴포넌트 구조를 사용하도록 import 업데이트
5. TypeScript 준수 확인

## 예시

실제 사용 예시를 위해 `src/pages/`의 리팩토링된 페이지들을 참조하세요:
- `Issues.tsx` - 검색과 필터링이 있는 목록 페이지
- `IssueDetail.tsx` - 댓글과 메타데이터가 있는 상세 페이지
- `NewIssue.tsx` - 복잡한 상호작용이 있는 폼 페이지