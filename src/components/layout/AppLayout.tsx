import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { ThemeToggle } from './ThemeToggle';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { notifications } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user } = useUser();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden md:block">
          <DesktopSidebar />
        </div>

        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur px-4 md:px-6">
            <SidebarTrigger className="hidden md:flex" />

            <div className="flex items-center gap-2 md:hidden">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-primary">
                  <span className="text-[10px] font-bold text-primary-foreground">IC</span>
                </div>
                <span className="text-sm font-bold">InduCycle Hub</span>
              </Link>
            </div>

            <div className="flex-1" />

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/dashboard">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[9px] flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </Link>
            </Button>

            <div className="hidden md:flex">
              <ThemeToggle />
            </div>

            {user && (
              <Link to="/profile" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
              </Link>
            )}
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto pb-20 md:pb-0">
            {children}
          </main>

          <MobileBottomNav />
        </div>
      </div>
    </SidebarProvider>
  );
}
