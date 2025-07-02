# API 서비스 아키텍처 설정

## 🎉 **구현 완료**

React 프로젝트에 React Query 통합을 포함한 포괄적인 API 서비스 아키텍처가 구현되었습니다. 구현된 내용은 다음과 같습니다:

## ✅ **추가된 기능들**

### 1. **API 서비스 클래스** (`src/services/api/`)
- `BaseService.ts` - 공통 HTTP 메서드 및 에러 처리
- `IssueService.ts` - 완전한 이슈 CRUD 작업
- `UserService.ts` - 사용자 관리
- `LabelService.ts` - 라벨 관리
- `MilestoneService.ts` - 마일스톤 관리
- `ProjectService.ts` - 프로젝트 관리

### 2. **React Query 통합** (`src/hooks/`)
- `useIssues.ts` - 이슈 데이터 페칭 및 뮤테이션
- `useUsers.ts` - 사용자 데이터 작업
- `useLabels.ts` - 라벨 작업
- `useMilestones.ts` - 마일스톤 작업
- `useProjects.ts` - 프로젝트 작업

### 3. **픽스처 시스템** (`src/fixtures/`)
- API 응답 구조와 일치하는 모킹 데이터
- 실제 API와 픽스처 간 환경 토글
- 현실적인 지연 및 상태 관리
- 완전한 CRUD 작업 시뮬레이션

### 4. **환경 설정**
- API 설정이 포함된 `.env` 파일
- 픽스처 vs 실제 API 토글 시스템
- 자동 서비스 선택

### 5. **업데이트된 컴포넌트**
- `Issues.tsx` - 로딩 상태, 에러 처리, 실시간 데이터
- `IssueDetail.tsx` - 댓글, 상태 변경, 낙관적 업데이트
- `NewIssue.tsx` - API 통합을 포함한 폼 제출

## 🚀 **현재 설정**

### 환경 변수 (`.env`)
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_USE_FIXTURES=true
NODE_ENV=development
```

### Axios 인스턴스
- `src/utill/axiosInstance.ts`에 위치
- 인증 및 에러 처리를 위한 인터셉터 포함
- 에러 시 자동 토스트 알림
- 개발 환경에서 요청/응답 로깅

## 🔧 **사용 방법**

### 픽스처와 실제 API 간 전환

**1. 픽스처 사용 (개발 환경):**
```env
VITE_USE_FIXTURES=true
```
- `src/fixtures/`의 모킹 데이터 사용
- 네트워크 지연 시뮬레이션
- 개발 및 테스트에 완벽

**2. 실제 API 사용 (프로덕션):**
```env
VITE_USE_FIXTURES=false
VITE_API_BASE_URL=http://localhost:8080/api
```
- Spring Boot 백엔드에 연결
- 실제 네트워크 요청
- 프로덕션 준비 완료

### 컴포넌트에서의 사용 예시

```tsx
import { useIssues, useCreateIssueMutation } from '@/hooks'

function MyComponent() {
  // 로딩/에러 상태를 포함한 데이터 페칭
  const { data, isLoading, error } = useIssues({ state: 'open' })
  
  // 낙관적 업데이트를 포함한 뮤테이션
  const createIssue = useCreateIssueMutation()
  
  const handleCreate = async (formData) => {
    try {
      const result = await createIssue.mutateAsync(formData)
      // 성공! 토스트 알림 자동 표시
      navigate(`/issues/${result.data.number}`)
    } catch (error) {
      // 에러! 토스트 알림 자동 표시
    }
  }
  
  if (isLoading) return <LoadingSkeleton />
  if (error) return <ErrorMessage error={error} />
  
  return <IssuesList issues={data?.data} />
}
```

## 📡 **API 엔드포인트 구조**

서비스 레이어는 RESTful 규칙을 따릅니다:

```
GET    /api/issues              # 이슈 목록
POST   /api/issues              # 이슈 생성
GET    /api/issues/{id}         # 이슈 조회
PUT    /api/issues/{id}         # 이슈 업데이트
DELETE /api/issues/{id}         # 이슈 삭제

GET    /api/issues/{id}/comments # 댓글 조회
POST   /api/issues/{id}/comments # 댓글 추가

GET    /api/users               # 사용자 목록
GET    /api/users/{id}          # 사용자 조회
GET    /api/users/me            # 현재 사용자

GET    /api/labels              # 라벨 목록
POST   /api/labels              # 라벨 생성

GET    /api/milestones          # 마일스톤 목록
GET    /api/projects            # 프로젝트 목록
```

## 🎨 **포함된 기능들**

### React Query 기능
- ✅ 자동 캐싱 및 백그라운드 업데이트
- ✅ 즉각적인 피드백을 위한 낙관적 업데이트
- ✅ 로딩 및 에러 상태
- ✅ 쿼리 무효화 및 리페칭
- ✅ 요청 중복 제거
- ✅ 오프라인 지원

### 에러 처리
- ✅ 자동 토스트 알림
- ✅ HTTP 상태 코드 처리
- ✅ 네트워크 에러 복구
- ✅ 일관된 에러 인터페이스

### 로딩 상태
- ✅ 스켈레톤 로더
- ✅ 버튼 로딩 상태
- ✅ 폼 제출 피드백
- ✅ 백그라운드 새로고침 표시기

### 데이터 관리
- ✅ 생성, 읽기, 업데이트, 삭제 작업
- ✅ 검색 및 필터링
- ✅ 페이지네이션 지원
- ✅ 실시간 업데이트

## 🔄 **모킹 데이터에서 마이그레이션**

컴포넌트들이 새로운 API 레이어를 사용하도록 업데이트되었습니다:

**이전:**
```tsx
import { mockIssues } from '@/data/mockIssues'
const issues = mockIssues.filter(issue => issue.state === 'open')
```

**이후:**
```tsx
import { useIssues } from '@/hooks'
const { data, isLoading } = useIssues({ state: 'open' })
const issues = data?.data || []
```

## 🌟 **다음 단계**

1. **개발 서버 시작:**
   ```bash
   npm run dev
   ```

2. **React Query DevTools 확인:**
   - 브라우저에서 React Query 아이콘 찾기
   - 쿼리, 뮤테이션, 캐시 모니터링

3. **픽스처 모드 테스트:**
   - 이슈 생성, 편집, 삭제
   - 댓글 추가
   - 로딩 상태 및 토스트 확인

4. **실제 API에 연결:**
   - `VITE_USE_FIXTURES=false` 설정
   - `VITE_API_BASE_URL`을 백엔드로 업데이트
   - 동일한 기능, 실제 데이터!

## 🎯 **주요 이점**

- **개발 속도**: 픽스처로 즉시 코딩 시작
- **타입 안전성**: 전체적인 완전한 TypeScript 지원
- **에러 복원력**: 포괄적인 에러 처리
- **사용자 경험**: 로딩 상태 및 낙관적 업데이트
- **확장성**: 새로운 엔드포인트 및 기능 추가 용이
- **유지보수성**: 일관된 패턴과 깔끔한 아키텍처

## 📚 **문서**

- **API 서비스**: `src/services/README.md`
- **컴포넌트**: `src/components/README.md`
- **환경 설정**: `.env.example`

React 애플리케이션이 이제 모킹 데이터와 실제 백엔드 통합 간을 원활하게 전환하는 견고한 API 레이어와 함께 프로덕션 준비 완료되었습니다! 🚀