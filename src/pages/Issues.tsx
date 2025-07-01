
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IssueList } from '@/components/IssueList';
import { mockIssues } from '@/data/mockIssues';
import { Search, Plus } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Issues</h1>
          <Link to="/issues/new">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              New issue
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="open" className="w-full">
          <TabsList className="grid grid-cols-2 w-fit">
            <TabsTrigger value="open" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {filteredOpenIssues.length} Open
            </TabsTrigger>
            <TabsTrigger value="closed" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              {filteredClosedIssues.length} Closed
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="open" className="mt-4">
            <IssueList issues={filteredOpenIssues} />
          </TabsContent>
          
          <TabsContent value="closed" className="mt-4">
            <IssueList issues={filteredClosedIssues} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Issues;
