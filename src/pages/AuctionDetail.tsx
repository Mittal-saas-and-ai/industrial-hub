import { useParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { auctions, formatCurrencyFull, formatCurrency } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Gavel, Clock, Users, MapPin, Shield, TrendingUp, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function AuctionDetail() {
  const { id } = useParams();
  const auction = auctions.find(a => a.id === id);
  const [timeLeft, setTimeLeft] = useState('');
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    if (!auction) return;
    const timer = setInterval(() => {
      const end = new Date(auction.endTime).getTime();
      const now = Date.now();
      const diff = end - now;
      if (diff <= 0) { setTimeLeft('Ended'); clearInterval(timer); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, [auction]);

  if (!auction) {
    return <AppLayout><div className="flex items-center justify-center min-h-[60vh]"><p className="text-muted-foreground">Auction not found</p></div></AppLayout>;
  }

  const isLive = auction.status === 'live';
  const nextBid = auction.currentBid + auction.bidIncrement;
  const quickIncrements = [1, 2, 3].map(x => auction.currentBid + auction.bidIncrement * x);

  const placeBid = (amount: number) => {
    toast.success(`Bid of ${formatCurrencyFull(amount)} placed successfully!`);
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-5 gap-6">
          {/* Left: Image + Details */}
          <div className="md:col-span-3 space-y-4">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted">
              <img src={auction.images[0]} alt={auction.title} className="w-full h-full object-cover" />
              <Badge className={cn('absolute top-3 left-3', isLive ? 'bg-accent text-accent-foreground' : 'bg-info text-info-foreground')}>
                {isLive && <span className="animate-pulse mr-1">●</span>} {auction.status.toUpperCase()}
              </Badge>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">{auction.category}</p>
              <h1 className="text-2xl font-bold mt-1">{auction.title}</h1>
              <p className="text-sm text-muted-foreground mt-2">{auction.description}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{auction.location}</span>
              <span className="flex items-center gap-1"><User className="h-4 w-4" />{auction.sellerName}</span>
              <Badge variant="secondary" className="capitalize">{auction.condition}</Badge>
              {auction.certifications.map(c => (
                <Badge key={c} variant="outline" className="text-xs gap-1"><Shield className="h-3 w-3" />{c}</Badge>
              ))}
            </div>

            {/* Bid History */}
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Bid History ({auction.bidCount})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {auction.bids.length > 0 ? auction.bids.map((bid, i) => (
                  <div key={bid.id} className={cn('flex items-center justify-between p-2 rounded-lg text-sm', i === 0 && 'bg-accent/10')}>
                    <div className="flex items-center gap-2">
                      {i === 0 && <TrendingUp className="h-4 w-4 text-accent" />}
                      <span className="font-medium">{bid.userName}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{formatCurrency(bid.amount)}</span>
                      <p className="text-[10px] text-muted-foreground">{new Date(bid.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                )) : <p className="text-sm text-muted-foreground">No bids yet. Be the first!</p>}
              </CardContent>
            </Card>
          </div>

          {/* Right: Bidding Panel */}
          <div className="md:col-span-2">
            <Card className="sticky top-20 border-border/50">
              <CardContent className="p-6 space-y-4">
                {isLive && (
                  <div className="text-center p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <Clock className="h-5 w-5 text-destructive mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Time Remaining</p>
                    <p className="text-xl font-bold font-mono">{timeLeft}</p>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Current Bid</p>
                  <p className="text-3xl font-bold">{formatCurrency(auction.currentBid)}</p>
                  <div className="flex items-center justify-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" /> {auction.bidCount} bids
                  </div>
                </div>

                <Separator />

                {isLive && (
                  <>
                    <div>
                      <label className="text-xs font-medium mb-2 block">Quick Bid</label>
                      <div className="grid grid-cols-3 gap-2">
                        {quickIncrements.map(amt => (
                          <Button key={amt} variant="outline" size="sm" className="text-xs" onClick={() => placeBid(amt)}>
                            {formatCurrency(amt)}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium mb-2 block">Custom Bid (min: {formatCurrency(nextBid)})</label>
                      <div className="flex gap-2">
                        <Input type="number" placeholder={nextBid.toString()} value={bidAmount} onChange={e => setBidAmount(e.target.value)} className="text-sm" />
                        <Button className="gradient-accent text-accent-foreground shrink-0" onClick={() => { const amt = parseInt(bidAmount) || nextBid; if (amt >= nextBid) placeBid(amt); else toast.error(`Minimum bid: ${formatCurrency(nextBid)}`); }}>
                          <Gavel className="mr-2 h-4 w-4" /> Bid
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Starting Bid</span><span>{formatCurrency(auction.startingBid)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Bid Increment</span><span>{formatCurrency(auction.bidIncrement)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Reserve Price</span><span>{auction.currentBid >= auction.reservePrice ? '✅ Met' : 'Not met'}</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
