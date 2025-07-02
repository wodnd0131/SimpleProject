# API Service Architecture

This directory contains a comprehensive API service layer with React Query integration, providing a scalable and robust data fetching solution.

## Architecture Overview

```
src/services/
├── api/                    # Domain-specific API services
│   ├── BaseService.ts     # Base service class with common functionality
│   ├── IssueService.ts    # Issues CRUD operations
│   ├── UserService.ts     # User management
│   ├── LabelService.ts    # Labels management
│   ├── MilestoneService.ts # Milestones management
│   ├── ProjectService.ts  # Projects management
│   └── index.ts          # Service exports
├── ApiServiceProxy.ts     # Environment-aware service proxy
└── ToastService.ts       # Toast notification service
```

## Key Features

### 🔄 **Fixture Toggle System**
Switch between real API and mock data using environment variables:
```env
VITE_USE_FIXTURES=true   # Use mock data
VITE_USE_FIXTURES=false  # Use real API
```

### 🚀 **React Query Integration**
- Automatic caching and synchronization
- Optimistic updates
- Loading and error states
- Background refetching
- Query invalidation

### 🎯 **Type-Safe API Layer**
- Full TypeScript support
- Consistent response interfaces
- Runtime error handling
- Axios interceptors for auth and errors

## Usage Examples

### Basic Data Fetching
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

### Mutations with Optimistic Updates
```tsx
import { useCreateIssueMutation } from '@/hooks'

function CreateIssueForm() {
  const createIssue = useCreateIssueMutation()
  
  const handleSubmit = async (data: CreateIssueRequest) => {
    try {
      const response = await createIssue.mutateAsync(data)
      // Success handling (toast shown automatically)
      navigate(`/issues/${response.data.number}`)
    } catch (error) {
      // Error handling (toast shown automatically)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <Button disabled={createIssue.isPending}>
        {createIssue.isPending ? 'Creating...' : 'Create Issue'}
      </Button>
    </form>
  )
}
```

### Advanced Query Configuration
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

## API Services

### IssueService
Complete CRUD operations for issues:
```typescript
// Get all issues with filtering
const issues = await issueService.getIssues({
  q: 'search term',
  state: 'open',
  labels: ['bug', 'enhancement'],
  assignees: ['user1', 'user2']
})

// Get single issue
const issue = await issueService.getIssue(123)

// Create new issue
const newIssue = await issueService.createIssue({
  title: 'Bug report',
  body: 'Description...',
  labelIds: ['1', '2'],
  assigneeIds: ['user1']
})

// Update issue
const updated = await issueService.updateIssue(123, {
  title: 'Updated title',
  state: 'closed'
})

// Comments
const comments = await issueService.getComments(123)
const comment = await issueService.addComment(123, { body: 'Comment text' })
```

### UserService
User management operations:
```typescript
const users = await userService.getUsers()
const user = await userService.getUser('user-id')
const currentUser = await userService.getCurrentUser()
const searchResults = await userService.searchUsers('john')
```

### LabelService
Label management:
```typescript
const labels = await labelService.getLabels()
const label = await labelService.createLabel({
  name: 'priority-high',
  color: '#ff0000',
  description: 'High priority issues'
})
```

## React Query Hooks

### Issues Hooks
```typescript
// Data fetching
useIssues(params?: SearchIssuesRequest)
useIssue(id: number)
useIssueComments(issueId: number)

// Mutations
useCreateIssueMutation()
useUpdateIssueMutation()
useCloseIssueMutation()
useReopenIssueMutation()
useDeleteIssueMutation()

// Comments
useAddCommentMutation()
useUpdateCommentMutation()
useDeleteCommentMutation()
useOptimisticAddComment() // With optimistic updates
```

### Users Hooks
```typescript
useUsers()
useUser(id: string)
useCurrentUser()
useSearchUsers(query?: string)
useUpdateUserMutation()
useUpdateCurrentUserMutation()
```

### Labels Hooks
```typescript
useLabels()
useLabel(id: string)
useCreateLabelMutation()
useUpdateLabelMutation()
useDeleteLabelMutation()
```

## Environment Configuration

### Required Environment Variables
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_USE_FIXTURES=true

# Development settings
NODE_ENV=development
```

### Service Proxy
The `ApiServiceProxy` automatically switches between real API and fixtures:
```typescript
import apiService from '@/services/ApiServiceProxy'

// Always returns the correct service based on environment
const issues = await apiService.issues.getIssues()
const users = await apiService.users.getUsers()

// Check current mode
console.log(apiService.isUsingFixtures()) // true/false
console.log(apiService.getEnvironmentInfo())
```

## Error Handling

### Automatic Error Handling
- Axios interceptors handle HTTP errors
- Toast notifications for user feedback
- Consistent error interfaces
- Retry logic for failed requests

### Manual Error Handling
```typescript
const { data, error, isError } = useIssues()

if (isError) {
  return <ErrorBoundary error={error} />
}
```

### Mutation Error Handling
```typescript
const mutation = useCreateIssueMutation()

// Automatic handling (recommended)
await mutation.mutateAsync(data) // Throws on error

// Manual handling
mutation.mutate(data, {
  onError: (error) => {
    console.error('Custom error handling:', error)
  }
})
```

## Loading States

### Query Loading States
```typescript
const { data, isLoading, isFetching, isError } = useIssues()

// isLoading: Initial loading (no cached data)
// isFetching: Any network request (including background updates)
// isError: Query failed
```

### Mutation Loading States
```typescript
const mutation = useCreateIssueMutation()

// mutation.isPending: Mutation in progress
// mutation.isError: Mutation failed
// mutation.isSuccess: Mutation succeeded
```

## Fixtures System

Located in `src/fixtures/`, the fixture system provides:
- Realistic mock data
- Simulated network delays
- Full CRUD operations
- Stateful data management
- Error simulation

### Adding New Fixtures
1. Create fixture class extending base patterns
2. Implement all service methods
3. Add to `ApiServiceProxy`
4. Export from fixtures index

## Best Practices

### 1. Use Appropriate Hooks
```typescript
// ✅ Good: Use specific hooks for specific data
const { data: issues } = useIssues()
const { data: issue } = useIssue(id)

// ❌ Avoid: Generic API calls in components
const issues = await fetch('/api/issues')
```

### 2. Handle Loading States
```typescript
// ✅ Good: Proper loading handling
if (isLoading) return <Skeleton />
if (isError) return <ErrorMessage />
return <DataComponent data={data} />

// ❌ Avoid: No loading states
return <DataComponent data={data} /> // May render with undefined data
```

### 3. Use Optimistic Updates
```typescript
// ✅ Good: For instant feedback
const optimisticMutation = useOptimisticAddComment()

// ✅ Good: For reliable operations
const safeMutation = useAddCommentMutation()
```

### 4. Invalidate Related Queries
```typescript
// Mutations automatically invalidate related queries
const createIssue = useCreateIssueMutation() // Invalidates issue lists
const updateIssue = useUpdateIssueMutation() // Invalidates specific issue
```

## Migration from Mock Data

To migrate from direct mock data usage:

1. **Replace direct imports**:
   ```typescript
   // ❌ Before
   import { mockIssues } from '@/data/mockIssues'
   
   // ✅ After
   import { useIssues } from '@/hooks'
   const { data } = useIssues()
   const issues = data?.data || []
   ```

2. **Add loading states**:
   ```typescript
   // ✅ After
   const { data, isLoading } = useIssues()
   if (isLoading) return <LoadingSpinner />
   ```

3. **Use mutations for data changes**:
   ```typescript
   // ❌ Before
   const handleCreate = (data) => {
     // Direct state manipulation
   }
   
   // ✅ After
   const createMutation = useCreateIssueMutation()
   const handleCreate = (data) => {
     createMutation.mutate(data)
   }
   ```

This architecture provides a production-ready foundation that scales from development to production with minimal configuration changes.