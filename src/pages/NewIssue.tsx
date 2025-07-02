
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageLayout, PageHeader } from '@/components/layout';
import { UserAvatar, LabelBadge } from '@/components/common';
import { ArrowLeft, X } from 'lucide-react';

const NewIssue = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState('');
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState('');
  const navigate = useNavigate();

  // Mock data
  const milestones = [
    { id: '1', name: 'v1.0.0', description: 'First major release' },
    { id: '2', name: 'v1.1.0', description: 'Minor feature updates' },
    { id: '3', name: 'v2.0.0', description: 'Major refactor' }
  ];

  const users = [
    { id: '1', username: 'john_doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
    { id: '2', username: 'jane_smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' },
    { id: '3', username: 'dev_team', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' }
  ];

  const labels = [
    { id: '1', name: 'bug', color: '#d73a49' },
    { id: '2', name: 'enhancement', color: '#a2eeef' },
    { id: '3', name: 'documentation', color: '#0075ca' },
    { id: '4', name: 'good first issue', color: '#7057ff' },
    { id: '5', name: 'help wanted', color: '#008672' }
  ];

  const projects = [
    { id: '1', name: 'Web Application' },
    { id: '2', name: 'Mobile App' },
    { id: '3', name: 'API Development' }
  ];

  const handleAssigneeToggle = (userId: string) => {
    setSelectedAssignees(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleLabelToggle = (labelId: string) => {
    setSelectedLabels(prev => 
      prev.includes(labelId) 
        ? prev.filter(id => id !== labelId)
        : [...prev, labelId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      console.log('Creating issue:', { 
        title, 
        body, 
        milestone: selectedMilestone,
        assignees: selectedAssignees,
        labels: selectedLabels,
        project: selectedProject
      });
      navigate('/issues');
    }
  };

  return (
    <PageLayout>
      <Link to="/issues">
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to issues
        </Button>
      </Link>
      
      <PageHeader 
        title="New issue" 
        titleSize="lg"
        size="md"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Create a new issue</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-card-foreground">Title</Label>
                    <Input
                      id="title"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="bg-input border-border text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body" className="text-card-foreground">Description</Label>
                    <Textarea
                      id="body"
                      placeholder="Leave a comment"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={10}
                      required
                      className="bg-input border-border text-foreground"
                    />
                    <p className="text-sm text-muted-foreground">
                      Describe the issue in detail. You can use Markdown formatting.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
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

          <div className="space-y-6">
            {/* Assignees */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-card-foreground">Assignees</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {users.map(user => (
                  <div key={user.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`assignee-${user.id}`}
                      checked={selectedAssignees.includes(user.id)}
                      onChange={() => handleAssigneeToggle(user.id)}
                      className="rounded border-border"
                    />
                    <UserAvatar 
                      src={user.avatar} 
                      alt={user.username} 
                      size="sm"
                    />
                    <label htmlFor={`assignee-${user.id}`} className="text-sm text-card-foreground cursor-pointer">
                      {user.username}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Labels */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-card-foreground">Labels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {selectedLabels.map(labelId => {
                    const label = labels.find(l => l.id === labelId);
                    return label ? (
                      <LabelBadge
                        key={label.id}
                        label={label}
                        size="sm"
                        removable
                        onRemove={() => handleLabelToggle(label.id)}
                      />
                    ) : null;
                  })}
                </div>
                <div className="space-y-1">
                  {labels.map(label => (
                    <div 
                      key={label.id} 
                      className="flex items-center gap-2 p-1 rounded hover:bg-accent cursor-pointer"
                      onClick={() => handleLabelToggle(label.id)}
                    >
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: label.color }}
                      ></div>
                      <span className="text-sm text-card-foreground">{label.name}</span>
                      {selectedLabels.includes(label.id) && (
                        <X className="w-3 h-3 ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Milestone */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-card-foreground">Milestone</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedMilestone} onValueChange={setSelectedMilestone}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Choose a milestone" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {milestones.map(milestone => (
                      <SelectItem key={milestone.id} value={milestone.id} className="text-popover-foreground">
                        <div>
                          <div className="font-medium">{milestone.name}</div>
                          <div className="text-xs text-muted-foreground">{milestone.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-card-foreground">Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id} className="text-popover-foreground">
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default NewIssue;
