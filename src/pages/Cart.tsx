import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/contexts/UserContext';
import { formatCurrencyFull } from '@/data/mockData';
import { Trash2, Plus, Minus, ShoppingCart, Send, ClipboardList, Tag } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Cart() {
  const { cart, setCart, removeFromCart } = useUser();
  const [coupon, setCoupon] = useState('');
  const [rfqNotes, setRfqNotes] = useState<Record<string, string>>({});

  const updateQty = (id: string, delta: number) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Cart & RFQ</h1>

        <Tabs defaultValue="cart">
          <TabsList>
            <TabsTrigger value="cart"><ShoppingCart className="h-4 w-4 mr-1" /> Cart ({cart.length})</TabsTrigger>
            <TabsTrigger value="rfq"><ClipboardList className="h-4 w-4 mr-1" /> RFQ Builder</TabsTrigger>
          </TabsList>

          <TabsContent value="cart">
            <div className="grid md:grid-cols-3 gap-6 mt-4">
              <div className="md:col-span-2 space-y-3">
                {cart.length > 0 ? cart.map(item => (
                  <Card key={item.id} className="border-border/50">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-md bg-muted overflow-hidden shrink-0">
                        {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{formatCurrencyFull(item.price)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQty(item.id, -1)}><Minus className="h-3 w-3" /></Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQty(item.id, 1)}><Plus className="h-3 w-3" /></Button>
                      </div>
                      <p className="font-bold text-sm w-24 text-right">{formatCurrencyFull(item.price * item.quantity)}</p>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                )) : (
                  <div className="text-center py-20">
                    <ShoppingCart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <Card className="border-border/50 h-fit sticky top-20">
                  <CardHeader className="pb-2"><CardTitle className="text-base">Order Summary</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input placeholder="Coupon code" value={coupon} onChange={e => setCoupon(e.target.value)} className="text-xs" />
                      <Button variant="outline" size="sm" className="text-xs shrink-0"><Tag className="mr-1 h-3 w-3" /> Apply</Button>
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatCurrencyFull(subtotal)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span>{formatCurrencyFull(tax)}</span></div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{formatCurrencyFull(total)}</span></div>
                    </div>
                    <Button className="w-full gradient-accent text-accent-foreground" onClick={() => toast.success('Order placed!')}>
                      Place Order
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="rfq">
            <div className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">Select items from your cart and add notes to create a Request for Quote.</p>
              {cart.length > 0 ? (
                <>
                  {cart.map(item => (
                    <Card key={item.id} className="border-border/50">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-muted overflow-hidden shrink-0">
                            {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <Textarea placeholder="Add notes for supplier (specs, delivery requirements, etc.)" value={rfqNotes[item.id] || ''} onChange={e => setRfqNotes({ ...rfqNotes, [item.id]: e.target.value })} rows={2} className="text-xs" />
                      </CardContent>
                    </Card>
                  ))}
                  <Button className="w-full gradient-primary text-primary-foreground" onClick={() => toast.success('RFQ sent to suppliers!')}>
                    <Send className="mr-2 h-4 w-4" /> Send RFQ to Suppliers
                  </Button>
                </>
              ) : (
                <div className="text-center py-20">
                  <ClipboardList className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Add items to your cart first to create an RFQ.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
