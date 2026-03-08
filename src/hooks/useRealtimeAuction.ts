import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Bid = Tables<'bids'>;
type Auction = Tables<'auctions'>;

export function useRealtimeAuction(auctionId: string | undefined) {
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    if (!auctionId) return;
    
    const fetchData = async () => {
      setLoading(true);
      const [auctionRes, bidsRes] = await Promise.all([
        supabase.from('auctions').select('*').eq('id', auctionId).single(),
        supabase.from('bids').select('*').eq('auction_id', auctionId).order('amount', { ascending: false }),
      ]);
      
      if (auctionRes.data) setAuction(auctionRes.data);
      if (bidsRes.data) setBids(bidsRes.data);
      setLoading(false);
    };

    fetchData();
  }, [auctionId]);

  // Subscribe to realtime updates
  useEffect(() => {
    if (!auctionId) return;

    const channel = supabase
      .channel(`auction-${auctionId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bids', filter: `auction_id=eq.${auctionId}` },
        (payload) => {
          const newBid = payload.new as Bid;
          setBids(prev => [newBid, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'auctions', filter: `id=eq.${auctionId}` },
        (payload) => {
          setAuction(payload.new as Auction);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [auctionId]);

  const placeBid = useCallback(async (amount: number, userId: string, userName: string) => {
    const { error } = await supabase.from('bids').insert({
      auction_id: auctionId!,
      amount,
      user_id: userId,
      user_name: userName,
    });

    if (error) throw error;

    // Update auction current bid and count
    await supabase
      .from('auctions')
      .update({ 
        current_bid: amount, 
        bid_count: (auction?.bid_count ?? 0) + 1 
      })
      .eq('id', auctionId!);
  }, [auctionId, auction]);

  return { auction, bids, loading, placeBid };
}
