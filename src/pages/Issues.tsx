
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PageLayout, PageHeader } from '@/components/layout';
import { SearchInput, IssueTabs, IssueCard } from '@/components/common';
import { useIssues } from '@/hooks';
import { Plus, RefreshCw } from 'lucide-react';
import type { SearchIssuesRequest } from '@/types/api';

const Issues = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState<'open' | 'closed'>('open');
  
  const searchParams = useMemo<SearchIssuesRequest>(() => ({
    q: searchQuery || undefined,
    state: 'all',
    page: 1,
    limit: 50,
  }), [searchQuery]);

  const { 
    data: issuesResponse, 
    isLoading, 
    isError, 
    error, 
    refetch,
    isFetching
  } = useIssues(searchParams);

  const issues = issuesResponse?.data || [];
  
  const { openIssues, closedIssues } = useMemo(() => {
    const open = issues.filter(issue => issue.state === 'open');
    const closed = issues.filter(issue => issue.state === 'closed');
    return { openIssues: open, closedIssues: closed };
  }, [issues]);

  const LoadingSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <div className="flex items-start gap-3">
            <Skeleton className="w-4 h-4 rounded-full mt-1" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const IssueListComponent = ({ issues }: { issues: typeof issues }) => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (isError) {
      return (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">
            Failed to load issues: {error?.message}
          </p>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      );
    }

    if (issues.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <p>No issues found</p>
          {searchQuery && (
            <p className="text-sm mt-2">
              Try adjusting your search terms
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    );
  };

  return (
    <PageLayout>
      <PageHeader
        title="Issues"
        subtitle={issuesResponse?.pagination ? 
          `${issuesResponse.pagination.total} total issues` : 
          undefined
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isFetching ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Link to="/issues/new">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                New issue
              </Button>
            </Link>
          </div>
        }
      />

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search issues..."
        disabled={isLoading}
      />

      <IssueTabs
        openCount={openIssues.length}
        closedCount={closedIssues.length}
        defaultValue={currentTab}
        onValueChange={(value) => setCurrentTab(value as 'open' | 'closed')}
        openContent={<IssueListComponent issues={openIssues} />}
        closedContent={<IssueListComponent issues={closedIssues} />}
      />
    </PageLayout>
  );
};

export default Issues;
