import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { notifications, rentalBookings, auctions, orders, products, formatCurrency, sectors } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Truck, Gavel, Package, Bookmark, Search, ShoppingCart, Plus, ArrowRight, Clock, TrendingUp, AlertTriangle, CheckCircle, Bell, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

const statCards = [
  { title: 'Active Rentals', value: '3', icon: Truck, color: 'text-primary', bg: 'bg-primary/10' },
  { title: 'Pending Auctions', value: '2', icon: Gavel, color: 'text-warning', bg: 'bg-warning/10' },
  { title: 'Recent Orders', value: '₹4.2L', icon: Package, color: 'text-accent', bg: 'bg-accent/10' },
  { title: 'Saved Items', value: '12', icon: Bookmark, color: 'text-info', bg: 'bg-info/10' },
];

const quickActions = [
  { title: 'Search Consumables', icon: Search, path: '/search', gradient: 'gradient-primary' },
  { title: 'Browse Rentals', icon: Truck, path: '/search?type=rental', gradient: 'gradient-accent' },
  { title: 'Start Auction', icon: Plus, path: '/create-auction', gradient: 'gradient-warning' },
  { title: 'My Inventory', icon: Package, path: '/inventory', gradient: 'bg-secondary' },
];

const featuredDeals = [
  { title: 'Flash Rental: CAT 320 Excavator', desc: '20% off this week — ₹20,000/day', badge: 'HOT DEAL', link: '/product/prod-001' },
  { title: 'Bulk Order: Hydraulic Hose Kits', desc: 'Buy 10+ get 15% off — Starting ₹38,250', badge: 'BULK SAVE', link: '/product/prod-003' },
  { title: 'Auction: 5x JCB Backhoe Loaders', desc: 'Live now — Current bid ₹72L', badge: 'LIVE', link: '/auctions/auc-001' },
];

const notifIcons: Record<string, React.ComponentType<any>> = {
  bid: Gavel, order: Package, rental: Truck, alert: AlertTriangle, system: CheckCircle,
};

export default function Dashboard() {
  const { user } = useUser();

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">{user?.company.name} · {user?.company.city}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statCards.map((stat, i) => (
            <Card key={i} className="animate-fade-in border-border/50" style={{ animationDelay: `${i * 80}ms` }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={cn('rounded-lg p-2', stat.bg)}>
                    <stat.icon className={cn('h-4 w-4', stat.color)} />
                  </div>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Deals Banner */}
        <Card className="overflow-hidden border-border/50 gradient-primary">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary-foreground/10">
              {featuredDeals.map((deal, i) => (
                <Link key={i} to={deal.link} className="p-4 hover:bg-primary-foreground/5 transition-colors">
                  <Badge variant="secondary" className="mb-2 text-[10px] bg-primary-foreground/20 text-primary-foreground border-0">
                    {deal.badge}
                  </Badge>
                  <h3 className="font-semibold text-sm text-primary-foreground">{deal.title}</h3>
                  <p className="text-xs text-primary-foreground/70 mt-1">{deal.desc}</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, i) => (
              <Link key={i} to={action.path}>
                <Card className="hover:shadow-industrial transition-all border-border/50 cursor-pointer group">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                    <div className={cn('rounded-xl p-3', action.gradient)}>
                      <action.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-medium group-hover:text-primary transition-colors">{action.title}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-muted-foreground" /> Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.slice(0, 5).map((notif) => {
                const Icon = notifIcons[notif.type] || Bell;
                return (
                  <div key={notif.id} className={cn('flex items-start gap-3 p-2 rounded-lg transition-colors', !notif.read && 'bg-primary/5')}>
                    <div className="rounded-lg bg-muted p-1.5 mt-0.5">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{notif.title}</p>
                      <p className="text-[11px] text-muted-foreground line-clamp-1">{notif.message}</p>
                    </div>
                    {!notif.read && <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Sector Widgets */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" /> Your Sectors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user?.sectors.map((sectorId) => {
                const sector = sectors.find(s => s.id === sectorId);
                const sectorProducts = products.filter(p => p.sector.includes(sectorId));
                const sectorAuctions = auctions.filter(a => a.sector.includes(sectorId));
                return sector ? (
                  <div key={sectorId} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <span className="text-xl">{sector.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs font-medium">{sector.label}</p>
                      <p className="text-[11px] text-muted-foreground">{sectorProducts.length} products · {sectorAuctions.length} auctions</p>
                    </div>
                    <Link to={`/search?sector=${sectorId}`}>
                      <Button variant="ghost" size="sm" className="text-xs h-7">
                        Explore <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                ) : null;
              })}

              {/* Sustainability Widget */}
              <div className="mt-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="h-4 w-4 text-accent" />
                  <span className="text-xs font-semibold text-accent">Sustainability Impact</span>
                </div>
                <p className="text-[11px] text-muted-foreground">3 refurbished items rented this quarter — estimated 2.4 tonnes CO₂ saved</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
