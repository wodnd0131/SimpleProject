import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home,
  FileText,
  Calendar,
  Users,
  Plus,
  Bell
} from 'lucide-react';

interface NavigationProps {
  className?: string;
}

export const Navigation = ({ className }: NavigationProps) => {
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      description: 'Project overview and stats'
    },
    {
      name: 'Issues',
      href: '/issues',
      icon: FileText,
      description: 'Track and manage issues'
    },
    {
      name: 'Meetings',
      href: '/meetings',
      icon: Calendar,
      description: 'Meeting minutes and records'
    },
    {
      name: 'Team',
      href: '/team',
      icon: Users,
      description: 'Team workload and assignments'
    }
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className={cn('flex items-center space-x-1', className)}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        
        return (
          <Link key={item.name} to={item.href}>
            <Button
              variant={active ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                'h-8 px-3',
                active && 'bg-primary text-primary-foreground'
              )}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.name}
            </Button>
          </Link>
        );
      })}
      
      <div className="mx-2 h-4 w-px bg-border" />
      
      <Link to="/issues/new">
        <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-1" />
          New Issue
        </Button>
      </Link>
    </nav>
  );
};