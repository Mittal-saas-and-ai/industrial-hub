import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { products, formatCurrencyFull } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, Truck, MapPin, Shield, Package, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { format, differenceInDays, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const bundleSuggestions = [
  { title: 'Hydraulic Hose Kit', price: 45000, desc: 'Compatible replacement hoses' },
  { title: 'Engine Oil Filter Set', price: 8500, desc: 'Recommended maintenance' },
  { title: 'Biodegradable Lubricant 200L', price: 28000, desc: 'Eco-friendly option' },
];

export default function RentalBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>(addDays(new Date(), 3));
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 33));
  const [insurance, setInsurance] = useState(true);
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedBundles, setSelectedBundles] = useState<number[]>([]);
  const [agreed, setAgreed] = useState(false);

  if (!product || !product.rentalRate) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Product not available for rental</p>
        </div>
      </AppLayout>
    );
  }

  const rate = product.rentalRate;
  const days = startDate && endDate ? Math.max(differenceInDays(endDate, startDate), 1) : 30;
  const dailyTotal = days * rate.daily;
  const insuranceTotal = insurance ? days * rate.insurancePerDay : 0;
  const bundleTotal = selectedBundles.reduce((sum, i) => sum + bundleSuggestions[i].price, 0);
  const subtotal = dailyTotal + insuranceTotal + bundleTotal + rate.deposit;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const steps = ['Dates & Location', 'Pricing', 'Bundles', 'Checkout'];

  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-3xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={cn('flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shrink-0', i + 1 <= step ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                {i + 1}
              </div>
              <span className="text-xs hidden sm:inline truncate">{s}</span>
              {i < steps.length - 1 && <div className={cn('h-px flex-1', i + 1 < step ? 'bg-primary' : 'bg-border')} />}
            </div>
          ))}
        </div>

        <Card className="border-border/50 mb-4">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <img src={product.images[0]} alt="" className="w-16 h-12 rounded-md object-cover" />
              <div>
                <CardTitle className="text-base">{product.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{product.brand} · {product.model}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {step === 1 && (
          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Select Dates & Location</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium mb-1 block">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left text-xs">
                        <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                        {startDate ? format(startDate, 'PPP') : 'Pick date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} className="p-3 pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left text-xs">
                        <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                        {endDate ? format(endDate, 'PPP') : 'Pick date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} className="p-3 pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{days} days</span>
              </div>
              <Separator />
              <div>
                <label className="text-xs font-medium mb-2 block">Delivery Option</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['delivery', 'pickup'] as const).map(type => (
                    <Button key={type} variant={deliveryType === type ? 'default' : 'outline'} onClick={() => setDeliveryType(type)} className="text-xs capitalize">
                      {type === 'delivery' ? <Truck className="mr-2 h-3.5 w-3.5" /> : <MapPin className="mr-2 h-3.5 w-3.5" />}
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              <Button onClick={() => setStep(2)} className="w-full gradient-primary text-primary-foreground">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Pricing Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Daily rate × {days} days</span><span className="font-medium">{formatCurrencyFull(dailyTotal)}</span></div>
                <div className="flex justify-between"><span>Security Deposit</span><span className="font-medium">{formatCurrencyFull(rate.deposit)}</span></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-accent" />
                    <span>Insurance ({formatCurrencyFull(rate.insurancePerDay)}/day)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{formatCurrencyFull(insuranceTotal)}</span>
                    <Switch checked={insurance} onCheckedChange={setInsurance} />
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">{formatCurrencyFull(subtotal)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>GST (18%)</span><span>{formatCurrencyFull(tax)}</span></div>
                <Separator />
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span>{formatCurrencyFull(total)}</span></div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button onClick={() => setStep(3)} className="flex-1 gradient-primary text-primary-foreground">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Recommended Bundles</h3>
              <p className="text-xs text-muted-foreground">Add complementary items for your {product.title}</p>
              <div className="space-y-3">
                {bundleSuggestions.map((bundle, i) => (
                  <div key={i} className={cn('flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer', selectedBundles.includes(i) ? 'border-primary bg-primary/5' : 'border-border/50')} onClick={() => setSelectedBundles(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])}>
                    <Package className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{bundle.title}</p>
                      <p className="text-xs text-muted-foreground">{bundle.desc}</p>
                    </div>
                    <span className="text-sm font-bold">{formatCurrencyFull(bundle.price)}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button onClick={() => setStep(4)} className="flex-1 gradient-primary text-primary-foreground">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Confirm & Pay</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Equipment</span><span className="font-medium">{product.title}</span></div>
                <div className="flex justify-between"><span>Duration</span><span>{days} days</span></div>
                <div className="flex justify-between"><span>Delivery</span><span className="capitalize">{deliveryType}</span></div>
                <div className="flex justify-between"><span>Insurance</span><span>{insurance ? 'Yes' : 'No'}</span></div>
                {selectedBundles.length > 0 && <div className="flex justify-between"><span>Bundles</span><span>{selectedBundles.length} items</span></div>}
                <Separator />
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span>{formatCurrencyFull(total)}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} id="contract" />
                <label htmlFor="contract" className="text-xs text-muted-foreground">I agree to the rental terms and digital contract</label>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button disabled={!agreed} onClick={() => { toast.success('Rental booked successfully!'); setStep(5); }} className="flex-1 gradient-accent text-accent-foreground">
                  Confirm Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 5 && (
          <Card className="border-border/50">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Booking Confirmed!</h3>
              <p className="text-sm text-muted-foreground">Order ID: RENT-{Date.now().toString().slice(-6)}</p>
              <p className="text-xs text-muted-foreground">You'll receive a confirmation email with tracking details and telematics setup instructions.</p>
              <div className="flex gap-2 justify-center">
                <Button asChild variant="outline"><Link to="/orders">View Orders</Link></Button>
                <Button asChild className="gradient-primary text-primary-foreground"><Link to="/dashboard">Dashboard</Link></Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
