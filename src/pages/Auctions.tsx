import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auctions, formatCurrency, formatCurrencyFull } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Gavel, Clock, Users, MapPin, ArrowRight, Eye, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  live: 'bg-accent text-accent-foreground',
  upcoming: 'bg-info text-info-foreground',
  ended: 'bg-muted text-muted-foreground',
};

function AuctionCard({ auction }: { auction: typeof auctions[0] }) {
  const isLive = auction.status === 'live';
  const endDate = new Date(auction.endTime);
  const now = new Date();
  const hoursLeft = Math.max(0, Math.floor((endDate.getTime() - now.getTime()) / 3600000));

  return (
    <Link to={`/auctions/${auction.id}`}>
      <Card className="overflow-hidden border-border/50 hover:shadow-industrial transition-all group cursor-pointer">
        <div className="relative aspect-[16/9] bg-muted">
          <img src={auction.images[0]} alt={auction.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          <Badge className={cn('absolute top-3 left-3 text-[10px]', statusColors[auction.status])}>
            {auction.status === 'live' && <span className="animate-pulse mr-1">●</span>}
            {auction.status.toUpperCase()}
          </Badge>
          {isLive && (
            <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground text-[10px]">
              <Clock className="h-3 w-3 mr-1" /> {hoursLeft}h left
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground">{auction.category}</p>
          <h3 className="font-semibold text-sm mt-1 line-clamp-2 group-hover:text-primary transition-colors">{auction.title}</h3>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{auction.location}</span>
            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{auction.bidCount} bids</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-[10px] text-muted-foreground">Current Bid</p>
              <p className="font-bold text-lg">{formatCurrency(auction.currentBid)}</p>
            </div>
            <Button size="sm" className={cn('text-xs h-8', isLive ? 'gradient-accent text-accent-foreground' : '')}>
              {isLive ? 'Bid Now' : auction.status === 'upcoming' ? 'Notify Me' : 'View'}
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Auctions() {
  const liveAuctions = auctions.filter(a => a.status === 'live');
  const upcomingAuctions = auctions.filter(a => a.status === 'upcoming');

  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Auctions</h1>
            <p className="text-sm text-muted-foreground">{liveAuctions.length} live · {upcomingAuctions.length} upcoming</p>
          </div>
          <Button asChild className="gradient-warning text-warning-foreground">
            <Link to="/create-auction"><Gavel className="mr-2 h-4 w-4" /> Create Auction</Link>
          </Button>
        </div>

        <Tabs defaultValue="live">
          <TabsList>
            <TabsTrigger value="live">Live ({liveAuctions.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingAuctions.length})</TabsTrigger>
            <TabsTrigger value="my-bids">My Bids</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          </TabsList>

          <TabsContent value="live">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {liveAuctions.map(a => <AuctionCard key={a.id} auction={a} />)}
            </div>
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {upcomingAuctions.map(a => <AuctionCard key={a.id} auction={a} />)}
            </div>
          </TabsContent>

          <TabsContent value="my-bids">
            <div className="text-center py-20">
              <Gavel className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No active bids yet. Start bidding on live auctions!</p>
            </div>
          </TabsContent>

          <TabsContent value="watchlist">
            <div className="text-center py-20">
              <Eye className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Your watchlist is empty. Add auctions to track them.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
