
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PageLayout, PageHeader } from '@/components/layout';
import { SearchInput, IssueTabs, IssueCard } from '@/components/common';
import { mockIssues } from '@/data/mockIssues';
import { Plus } from 'lucide-react';

const Issues = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const openIssues = mockIssues.filter(issue => issue.state === 'open');
  const closedIssues = mockIssues.filter(issue => issue.state === 'closed');
  
  const filteredOpenIssues = openIssues.filter(issue =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.body.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredClosedIssues = closedIssues.filter(issue =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const IssueListComponent = ({ issues }: { issues: typeof mockIssues }) => {
    if (issues.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <p>No issues found</p>
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
        actions={
          <Link to="/issues/new">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              New issue
            </Button>
          </Link>
        }
      />

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search issues..."
      />

      <IssueTabs
        openCount={filteredOpenIssues.length}
        closedCount={filteredClosedIssues.length}
        openContent={<IssueListComponent issues={filteredOpenIssues} />}
        closedContent={<IssueListComponent issues={filteredClosedIssues} />}
      />
    </PageLayout>
  );
};

export default Issues;
