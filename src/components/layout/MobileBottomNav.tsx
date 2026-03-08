import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Gavel, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';

const tabs = [
  { label: 'Home', icon: Home, path: '/dashboard' },
  { label: 'Search', icon: Search, path: '/search' },
  { label: 'Auctions', icon: Gavel, path: '/auctions' },
  { label: 'Cart', icon: ShoppingCart, path: '/cart' },
  { label: 'Profile', icon: User, path: '/profile' },
];

export function MobileBottomNav() {
  const location = useLocation();
  const { cart } = useUser();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || (tab.path === '/dashboard' && location.pathname === '/');
          return (
            <Link
              key={tab.label}
              to={tab.path}
              className={cn(
                'relative flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <tab.icon className={cn('h-5 w-5', isActive && 'text-primary')} />
              <span className="font-medium">{tab.label}</span>
              {tab.label === 'Cart' && cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                  {cart.length}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
