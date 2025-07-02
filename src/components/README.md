# Component Design System

This directory contains a comprehensive design system built for scalable React applications using TypeScript, Tailwind CSS, and Class Variance Authority (CVA).

## Architecture

```
src/components/
├── common/           # Reusable business components
├── layout/           # Layout components
└── ui/              # Base shadcn/ui components
```

## Design Tokens

Located in `src/lib/design-tokens.ts`, these provide consistent spacing, colors, typography, and other design values across the application.

### Usage
```typescript
import { designTokens } from '@/lib/design-tokens'

// Access tokens
const spacing = designTokens.spacing.lg
const issueOpenColor = designTokens.issue.states.open.color
```

## Common Components

### StatusBadge
Displays issue status with consistent styling and indicators.

```tsx
import { StatusBadge } from '@/components/common'

<StatusBadge status="open" size="md" />
<StatusBadge status="closed" size="sm" showIndicator={false} />
```

**Variants:**
- `status`: 'open' | 'closed' | 'draft'
- `size`: 'sm' | 'md' | 'lg'

### UserAvatar
Flexible avatar component with fallback support.

```tsx
import { UserAvatar } from '@/components/common'

<UserAvatar src={user.avatar} alt={user.name} size="md" />
<UserAvatar fallback="JD" size="lg" />
```

**Variants:**
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

### IssueCard
Complete issue display component with configurable features.

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

**Variants:**
- `variant`: 'default' | 'compact' | 'detailed'
- `interactive`: true | false

### LabelBadge
Displays issue labels with custom colors and interactive features.

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
Standardized comment display with author info and timestamps.

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
Enhanced search input with icon and consistent styling.

```tsx
import { SearchInput } from '@/components/common'

<SearchInput
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search issues..."
  size="md"
/>
```

### IssueTabs
Tab component specifically designed for issue filtering.

```tsx
import { IssueTabs } from '@/components/common'

<IssueTabs
  openCount={openIssues.length}
  closedCount={closedIssues.length}
  openContent={<IssueList issues={openIssues} />}
  closedContent={<IssueList issues={closedIssues} />}
/>
```

## Layout Components

### PageLayout
Main page wrapper with consistent spacing and responsive design.

```tsx
import { PageLayout } from '@/components/layout'

<PageLayout spacing="comfortable" maxWidth="lg">
  {children}
</PageLayout>
```

**Variants:**
- `spacing`: 'comfortable' | 'compact' | 'none'
- `maxWidth`: 'sm' | 'md' | 'lg' | 'xl' | 'full'

### PageHeader
Standardized page header with title, subtitle, and actions.

```tsx
import { PageHeader } from '@/components/layout'

<PageHeader
  title="Issues"
  subtitle="Manage your project issues"
  titleSize="lg"
  actions={<Button>New Issue</Button>}
/>
```

## Class Variance Authority (CVA)

All components use CVA for type-safe variant management:

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

## TypeScript Integration

All components include proper TypeScript interfaces:

```typescript
interface ComponentProps extends VariantProps<typeof componentVariants> {
  className?: string
  children?: ReactNode
  // Component-specific props
}
```

## Best Practices

1. **Use design tokens** for consistent spacing and colors
2. **Leverage CVA variants** for component flexibility
3. **Follow naming conventions**: PascalCase for components, camelCase for functions
4. **Include proper TypeScript types** for all props
5. **Use compound components** for complex UI patterns
6. **Maintain accessibility** with proper ARIA attributes

## Migration Guide

When migrating existing components:

1. Replace hardcoded Tailwind classes with design tokens
2. Use new reusable components instead of duplicated code
3. Apply CVA variants for component variations
4. Update imports to use the new component structure
5. Ensure TypeScript compliance

## Examples

See the refactored pages in `src/pages/` for real-world usage examples:
- `Issues.tsx` - List page with search and filtering
- `IssueDetail.tsx` - Detail page with comments and metadata
- `NewIssue.tsx` - Form page with complex interactions