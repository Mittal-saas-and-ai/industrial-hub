import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { orders, rentalBookings, formatCurrencyFull, formatCurrency } from '@/data/mockData';
import { Package, Truck, Clock, CheckCircle, FileText, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusBadge: Record<string, { variant: any; icon: any }> = {
  pending: { variant: 'secondary', icon: Clock },
  active: { variant: 'default', icon: Truck },
  completed: { variant: 'outline', icon: CheckCircle },
};

export default function Orders() {
  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Orders & Rentals</h1>

        <Tabs defaultValue="active-rentals">
          <TabsList className="flex-wrap">
            <TabsTrigger value="active-rentals">Active Rentals</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="active-rentals">
            <div className="space-y-4 mt-4">
              {rentalBookings.filter(r => r.status === 'active').map(rental => (
                <Card key={rental.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-sm">{rental.productTitle}</h3>
                        <p className="text-xs text-muted-foreground">ID: {rental.id}</p>
                      </div>
                      <Badge className="bg-accent text-accent-foreground text-[10px]"><Truck className="h-3 w-3 mr-1" /> Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div><span className="text-muted-foreground block">Period</span><span className="font-medium">{rental.startDate} — {rental.endDate}</span></div>
                      <div><span className="text-muted-foreground block">Daily Rate</span><span className="font-medium">{formatCurrencyFull(rental.dailyRate)}</span></div>
                      <div><span className="text-muted-foreground block">Total</span><span className="font-bold">{formatCurrencyFull(rental.total)}</span></div>
                      <div><span className="text-muted-foreground block">Location</span><span className="font-medium flex items-center gap-1"><MapPin className="h-3 w-3" />{rental.location}</span></div>
                    </div>
                    {rental.trackingId && (
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">Tracking: {rental.trackingId}</Badge>
                        <Button variant="ghost" size="sm" className="text-xs h-6">Track GPS</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="space-y-4 mt-4">
              {orders.filter(o => o.status === 'pending').map(order => (
                <Card key={order.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-sm">Order #{order.id}</h3>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <Badge variant="secondary" className="text-[10px]"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>
                    </div>
                    <div className="space-y-2">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between text-xs">
                          <span>{item.title} × {item.quantity}</span>
                          <span className="font-medium">{formatCurrencyFull(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-3 pt-2 border-t border-border/50 text-sm font-bold">
                      <span>Total</span>
                      <span>{formatCurrencyFull(order.total)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4 mt-4">
              {[...orders.filter(o => o.status === 'completed'), ...rentalBookings.filter(r => r.status === 'completed')].map((item: any) => (
                <Card key={item.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-sm">{item.productTitle || `Order #${item.id}`}</h3>
                        <p className="text-xs text-muted-foreground">{item.date || item.startDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>
                        <span className="font-bold text-sm">{formatCurrencyFull(item.total)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invoices">
            <div className="space-y-4 mt-4">
              {[...orders, ...rentalBookings].map((item: any) => (
                <Card key={item.id} className="border-border/50">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Invoice — {item.productTitle || `Order #${item.id}`}</p>
                        <p className="text-xs text-muted-foreground">{formatCurrencyFull(item.total)}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">Download PDF</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
