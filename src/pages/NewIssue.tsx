
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { PageLayout, PageHeader } from '@/components/layout';
import { UserAvatar, LabelBadge } from '@/components/common';
import { useCreateIssueMutation, useUsers, useLabels, useMilestones, useProjects } from '@/hooks';
import { ArrowLeft, X, RefreshCw, ChevronDown, Check, ChevronsUpDown } from 'lucide-react';

const NewIssue = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState('');
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [assigneePopoverOpen, setAssigneePopoverOpen] = useState(false);
  const [labelPopoverOpen, setLabelPopoverOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const navigate = useNavigate();

  // API hooks
  const createIssueMutation = useCreateIssueMutation();
  const { data: usersResponse } = useUsers();
  const { data: labelsResponse } = useLabels();
  const { data: milestonesResponse } = useMilestones('open');
  const { data: projectsResponse } = useProjects();

  const users = usersResponse?.data || [];
  const labels = labelsResponse?.data || [];
  const milestones = milestonesResponse?.data || [];
  const projects = projectsResponse?.data || [];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      try {
        const issueData = {
          title: title.trim(),
          body: body.trim(),
          assigneeIds: selectedAssignees.length > 0 ? selectedAssignees : undefined,
          labelIds: selectedLabels.length > 0 ? selectedLabels : undefined,
          milestoneId: selectedMilestone || undefined,
          projectId: selectedProject || undefined,
          priority: selectedPriority || undefined,
        };

        const response = await createIssueMutation.mutateAsync(issueData);
        navigate(`/issues/${response.data.number}`);
      } catch (error) {
        // Error handling is done in the mutation
      }
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
                    <Button 
                      type="submit" 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={!title.trim() || !body.trim() || createIssueMutation.isPending}
                    >
                      {createIssueMutation.isPending ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Submit new issue'
                      )}
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
              <CardContent>
                <Popover open={assigneePopoverOpen} onOpenChange={setAssigneePopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={assigneePopoverOpen}
                      className="w-full justify-between bg-input border-border text-foreground"
                    >
                      {selectedAssignees.length === 0 ? (
                        "Select assignees..."
                      ) : (
                        `${selectedAssignees.length} selected`
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-popover border-border">
                    <Command>
                      <CommandInput placeholder="Search assignees..." className="text-foreground" />
                      <CommandList>
                        <CommandEmpty>No assignees found.</CommandEmpty>
                        <CommandGroup>
                          {users.map((user) => (
                            <CommandItem
                              key={user.id}
                              value={user.username}
                              onSelect={() => handleAssigneeToggle(user.id)}
                              className="text-popover-foreground"
                            >
                              <div className="flex items-center space-x-2 flex-1">
                                <Checkbox
                                  checked={selectedAssignees.includes(user.id)}
                                  onChange={() => {}}
                                />
                                <UserAvatar 
                                  src={user.avatar} 
                                  alt={user.username} 
                                  size="sm"
                                />
                                <div>
                                  <div className="font-medium">{user.username}</div>
                                  <div className="text-xs text-muted-foreground">{user.displayName}</div>
                                </div>
                              </div>
                              <Check
                                className={`ml-auto h-4 w-4 ${
                                  selectedAssignees.includes(user.id) ? "opacity-100" : "opacity-0"
                                }`}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {selectedAssignees.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedAssignees.map(userId => {
                      const user = users.find(u => u.id === userId);
                      return user ? (
                        <Badge key={user.id} variant="secondary" className="text-xs">
                          <UserAvatar 
                            src={user.avatar} 
                            alt={user.username} 
                            size="xs"
                            className="mr-1"
                          />
                          {user.username}
                          <X 
                            className="ml-1 h-3 w-3 cursor-pointer" 
                            onClick={() => handleAssigneeToggle(user.id)}
                          />
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Labels */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-card-foreground">Labels</CardTitle>
              </CardHeader>
              <CardContent>
                <Popover open={labelPopoverOpen} onOpenChange={setLabelPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={labelPopoverOpen}
                      className="w-full justify-between bg-input border-border text-foreground"
                    >
                      {selectedLabels.length === 0 ? (
                        "Select labels..."
                      ) : (
                        `${selectedLabels.length} selected`
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-popover border-border">
                    <Command>
                      <CommandInput placeholder="Search labels..." className="text-foreground" />
                      <CommandList>
                        <CommandEmpty>No labels found.</CommandEmpty>
                        <CommandGroup>
                          {labels.map((label) => (
                            <CommandItem
                              key={label.id}
                              value={label.name}
                              onSelect={() => handleLabelToggle(label.id)}
                              className="text-popover-foreground"
                            >
                              <div className="flex items-center space-x-2 flex-1">
                                <Checkbox
                                  checked={selectedLabels.includes(label.id)}
                                  onChange={() => {}}
                                />
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: label.color }}
                                ></div>
                                <div>
                                  <div className="font-medium">{label.name}</div>
                                  <div className="text-xs text-muted-foreground">{label.description}</div>
                                </div>
                              </div>
                              <Check
                                className={`ml-auto h-4 w-4 ${
                                  selectedLabels.includes(label.id) ? "opacity-100" : "opacity-0"
                                }`}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {selectedLabels.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
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
                )}
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

            {/* Priority */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-card-foreground">Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Choose priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="low" className="text-popover-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Low
                      </div>
                    </SelectItem>
                    <SelectItem value="medium" className="text-popover-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        Medium
                      </div>
                    </SelectItem>
                    <SelectItem value="high" className="text-popover-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        High
                      </div>
                    </SelectItem>
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
