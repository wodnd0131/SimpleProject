
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

const NewIssue = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      // In a real app, this would make an API call to create the issue
      console.log('Creating issue:', { title, body });
      navigate('/issues');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/issues">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to issues
            </Button>
          </Link>
          
          <h1 className="text-2xl font-bold">New issue</h1>
        </div>

        <div className="max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Create a new issue</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body">Description</Label>
                  <Textarea
                    id="body"
                    placeholder="Leave a comment"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={10}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Describe the issue in detail. You can use Markdown formatting.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Submit new issue
                  </Button>
                  <Link to="/issues">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewIssue;
