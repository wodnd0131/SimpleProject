# API 서비스 아키텍처

이 디렉토리는 React Query 통합을 포함한 포괄적인 API 서비스 레이어를 포함하며, 확장 가능하고 견고한 데이터 페칭 솔루션을 제공합니다.

## 아키텍처 개요

```
src/services/
├── api/                    # 도메인별 API 서비스
│   ├── BaseService.ts     # 공통 기능을 갖춘 기본 서비스 클래스
│   ├── IssueService.ts    # 이슈 CRUD 작업
│   ├── UserService.ts     # 사용자 관리
│   ├── LabelService.ts    # 라벨 관리
│   ├── MilestoneService.ts # 마일스톤 관리
│   ├── ProjectService.ts  # 프로젝트 관리
│   └── index.ts          # 서비스 내보내기
├── ApiServiceProxy.ts     # 환경 인식 서비스 프록시
└── ToastService.ts       # 토스트 알림 서비스
```

## 주요 기능

### 🔄 **픽스처 토글 시스템**
환경 변수를 사용하여 실제 API와 모킹 데이터 간 전환:
```env
VITE_USE_FIXTURES=true   # 모킹 데이터 사용
VITE_USE_FIXTURES=false  # 실제 API 사용
```

### 🚀 **React Query 통합**
- 자동 캐싱 및 동기화
- 낙관적 업데이트
- 로딩 및 에러 상태
- 백그라운드 리페칭
- 쿼리 무효화

### 🎯 **타입 안전한 API 레이어**
- 완전한 TypeScript 지원
- 일관된 응답 인터페이스
- 런타임 에러 처리
- 인증 및 에러를 위한 Axios 인터셉터

## 사용 예시

### 기본 데이터 페칭
```tsx
import { useIssues, useIssue } from '@/hooks'

function IssuesPage() {
  const { data, isLoading, error } = useIssues({ state: 'open' })
  
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  
  return <IssuesList issues={data?.data} />
}

function IssueDetail({ id }: { id: number }) {
  const { data: issue } = useIssue(id)
  return <IssueCard issue={issue?.data} />
}
```

### 낙관적 업데이트가 포함된 뮤테이션
```tsx
import { useCreateIssueMutation } from '@/hooks'

function CreateIssueForm() {
  const createIssue = useCreateIssueMutation()
  
  const handleSubmit = async (data: CreateIssueRequest) => {
    try {
      const response = await createIssue.mutateAsync(data)
      // 성공 처리 (토스트 자동 표시)
      navigate(`/issues/${response.data.number}`)
    } catch (error) {
      // 에러 처리 (토스트 자동 표시)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <Button disabled={createIssue.isPending}>
        {createIssue.isPending ? '생성 중...' : '이슈 생성'}
      </Button>
    </form>
  )
}
```

### 고급 쿼리 설정
```tsx
import { useIssues } from '@/hooks'

function IssuesWithSearch() {
  const [search, setSearch] = useState('')
  
  const { data, refetch } = useIssues({
    q: search,
    state: 'all',
    page: 1,
    limit: 20
  })
  
  return (
    <div>
      <SearchInput 
        value={search}
        onChange={setSearch}
        onClear={() => refetch()}
      />
      <IssuesList issues={data?.data} />
    </div>
  )
}
```

## API 서비스

### IssueService
이슈에 대한 완전한 CRUD 작업:
```typescript
// 필터링과 함께 모든 이슈 가져오기
const issues = await issueService.getIssues({
  q: '검색어',
  state: 'open',
  labels: ['bug', 'enhancement'],
  assignees: ['user1', 'user2']
})

// 단일 이슈 가져오기
const issue = await issueService.getIssue(123)

// 새 이슈 생성
const newIssue = await issueService.createIssue({
  title: '버그 리포트',
  body: '설명...',
  labelIds: ['1', '2'],
  assigneeIds: ['user1']
})

// 이슈 업데이트
const updated = await issueService.updateIssue(123, {
  title: '업데이트된 제목',
  state: 'closed'
})

// 댓글
const comments = await issueService.getComments(123)
const comment = await issueService.addComment(123, { body: '댓글 텍스트' })
```

### UserService
사용자 관리 작업:
```typescript
const users = await userService.getUsers()
const user = await userService.getUser('user-id')
const currentUser = await userService.getCurrentUser()
const searchResults = await userService.searchUsers('john')
```

### LabelService
라벨 관리:
```typescript
const labels = await labelService.getLabels()
const label = await labelService.createLabel({
  name: 'priority-high',
  color: '#ff0000',
  description: '높은 우선순위 이슈'
})
```

## React Query 훅

### 이슈 훅
```typescript
// 데이터 페칭
useIssues(params?: SearchIssuesRequest)
useIssue(id: number)
useIssueComments(issueId: number)

// 뮤테이션
useCreateIssueMutation()
useUpdateIssueMutation()
useCloseIssueMutation()
useReopenIssueMutation()
useDeleteIssueMutation()

// 댓글
useAddCommentMutation()
useUpdateCommentMutation()
useDeleteCommentMutation()
useOptimisticAddComment() // 낙관적 업데이트 포함
```

### 사용자 훅
```typescript
useUsers()
useUser(id: string)
useCurrentUser()
useSearchUsers(query?: string)
useUpdateUserMutation()
useUpdateCurrentUserMutation()
```

### 라벨 훅
```typescript
useLabels()
useLabel(id: string)
useCreateLabelMutation()
useUpdateLabelMutation()
useDeleteLabelMutation()
```

## 환경 설정

### 필수 환경 변수
```env
# API 설정
VITE_API_BASE_URL=http://localhost:8080/api
VITE_USE_FIXTURES=true

# 개발 설정
NODE_ENV=development
```

### 서비스 프록시
`ApiServiceProxy`는 실제 API와 픽스처 간을 자동으로 전환합니다:
```typescript
import apiService from '@/services/ApiServiceProxy'

// 환경에 따라 항상 올바른 서비스를 반환
const issues = await apiService.issues.getIssues()
const users = await apiService.users.getUsers()

// 현재 모드 확인
console.log(apiService.isUsingFixtures()) // true/false
console.log(apiService.getEnvironmentInfo())
```

## 에러 처리

### 자동 에러 처리
- Axios 인터셉터가 HTTP 에러 처리
- 사용자 피드백을 위한 토스트 알림
- 일관된 에러 인터페이스
- 실패한 요청에 대한 재시도 로직

### 수동 에러 처리
```typescript
const { data, error, isError } = useIssues()

if (isError) {
  return <ErrorBoundary error={error} />
}
```

### 뮤테이션 에러 처리
```typescript
const mutation = useCreateIssueMutation()

// 자동 처리 (권장)
await mutation.mutateAsync(data) // 에러 시 예외 발생

// 수동 처리
mutation.mutate(data, {
  onError: (error) => {
    console.error('커스텀 에러 처리:', error)
  }
})
```

## 로딩 상태

### 쿼리 로딩 상태
```typescript
const { data, isLoading, isFetching, isError } = useIssues()

// isLoading: 초기 로딩 (캐시된 데이터 없음)
// isFetching: 모든 네트워크 요청 (백그라운드 업데이트 포함)
// isError: 쿼리 실패
```

### 뮤테이션 로딩 상태
```typescript
const mutation = useCreateIssueMutation()

// mutation.isPending: 뮤테이션 진행 중
// mutation.isError: 뮤테이션 실패
// mutation.isSuccess: 뮤테이션 성공
```

## 픽스처 시스템

`src/fixtures/`에 위치한 픽스처 시스템은 다음을 제공합니다:
- 현실적인 모킹 데이터
- 시뮬레이션된 네트워크 지연
- 완전한 CRUD 작업
- 상태유지 데이터 관리
- 에러 시뮬레이션

### 새 픽스처 추가
1. 기본 패턴을 확장하는 픽스처 클래스 생성
2. 모든 서비스 메서드 구현
3. `ApiServiceProxy`에 추가
4. 픽스처 인덱스에서 내보내기

## 모범 사례

### 1. 적절한 훅 사용
```typescript
// ✅ 좋음: 특정 데이터에 특정 훅 사용
const { data: issues } = useIssues()
const { data: issue } = useIssue(id)

// ❌ 피하기: 컴포넌트에서 일반적인 API 호출
const issues = await fetch('/api/issues')
```

### 2. 로딩 상태 처리
```typescript
// ✅ 좋음: 적절한 로딩 처리
if (isLoading) return <Skeleton />
if (isError) return <ErrorMessage />
return <DataComponent data={data} />

// ❌ 피하기: 로딩 상태 없음
return <DataComponent data={data} /> // undefined 데이터로 렌더링될 수 있음
```

### 3. 낙관적 업데이트 사용
```typescript
// ✅ 좋음: 즉각적인 피드백을 위해
const optimisticMutation = useOptimisticAddComment()

// ✅ 좋음: 신뢰할 수 있는 작업을 위해
const safeMutation = useAddCommentMutation()
```

### 4. 관련 쿼리 무효화
```typescript
// 뮤테이션이 자동으로 관련 쿼리를 무효화
const createIssue = useCreateIssueMutation() // 이슈 목록 무효화
const updateIssue = useUpdateIssueMutation() // 특정 이슈 무효화
```

## 모킹 데이터에서 마이그레이션

직접적인 모킹 데이터 사용에서 마이그레이션하려면:

1. **직접 임포트 교체**:
   ```typescript
   // ❌ 이전
   import { mockIssues } from '@/data/mockIssues'
   
   // ✅ 이후
   import { useIssues } from '@/hooks'
   const { data } = useIssues()
   const issues = data?.data || []
   ```

2. **로딩 상태 추가**:
   ```typescript
   // ✅ 이후
   const { data, isLoading } = useIssues()
   if (isLoading) return <LoadingSpinner />
   ```

3. **데이터 변경에 뮤테이션 사용**:
   ```typescript
   // ❌ 이전
   const handleCreate = (data) => {
     // 직접적인 상태 조작
   }
   
   // ✅ 이후
   const createMutation = useCreateIssueMutation()
   const handleCreate = (data) => {
     createMutation.mutate(data)
   }
   ```

이 아키텍처는 최소한의 설정 변경으로 개발에서 프로덕션까지 확장되는 프로덕션 준비 완료된 기반을 제공합니다.