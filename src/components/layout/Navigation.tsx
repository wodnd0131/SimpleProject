import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home,
  FileText,
  Calendar,
  Users,
  Plus,
  Bell,
  FileEdit
} from 'lucide-react';

interface NavigationProps {
  className?: string;
}

export const Navigation = ({ className }: NavigationProps) => {
  const location = useLocation();

  const navigationItems = [
    {
      name: '대시보드',
      href: '/dashboard',
      icon: Home,
      description: '프로젝트 개요 및 통계'
    },
    {
      name: '이슈',
      href: '/issues',
      icon: FileText,
      description: '이슈 추적 및 관리'
    },
    {
      name: '문서',
      href: '/docs',
      icon: FileEdit,
      description: '문서 작성 및 관리'
    },
    {
      name: '회의',
      href: '/meetings',
      icon: Calendar,
      description: '회의록 및 기록'
    },
    {
      name: '팀',
      href: '/team',
      icon: Users,
      description: '팀 업무량 및 배정'
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
      
      <Link to="/docs/new">
        <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700">
          <FileEdit className="w-4 h-4 mr-1" />
          새 문서
        </Button>
      </Link>
    </nav>
  );
};