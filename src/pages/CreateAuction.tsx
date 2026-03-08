import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/data/mockData';
import { ArrowRight, ArrowLeft, Upload, Eye, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function CreateAuction() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [reservePrice, setReservePrice] = useState('');
  const [bidIncrement, setBidIncrement] = useState('');
  const [duration, setDuration] = useState('7');

  const steps = ['Upload Images', 'Lot Details', 'Pricing Rules', 'Preview & Publish'];

  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Create Auction</h1>
        <p className="text-sm text-muted-foreground mb-6">List surplus equipment or materials for auction</p>

        <div className="flex items-center gap-2 mb-6">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={cn('flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shrink-0', i + 1 <= step ? 'gradient-warning text-warning-foreground' : 'bg-muted text-muted-foreground')}>{i + 1}</div>
              <span className="text-xs hidden sm:inline truncate">{s}</span>
              {i < steps.length - 1 && <div className={cn('h-px flex-1', i + 1 < step ? 'bg-warning' : 'bg-border')} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Upload Images & Documents</h3>
              <div className="border-2 border-dashed border-border rounded-lg p-10 text-center">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium">Drag & drop images here</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB · 360° views recommended</p>
                <Button variant="outline" className="mt-4 text-xs">Browse Files</Button>
              </div>
              <div>
                <Label className="text-xs">Supporting Documents</Label>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="text-xs">Inspection Report</Button>
                  <Button variant="outline" size="sm" className="text-xs">Service Records</Button>
                  <Button variant="outline" size="sm" className="text-xs">Certificates</Button>
                </div>
              </div>
              <Button onClick={() => setStep(2)} className="w-full gradient-warning text-warning-foreground">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Lot Details</h3>
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" placeholder="e.g., Fleet of 5 JCB Backhoe Loaders" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description *</Label>
                <Textarea id="desc" placeholder="Describe the lot, condition, history..." value={description} onChange={e => setDescription(e.target.value)} rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button onClick={() => setStep(3)} className="flex-1 gradient-warning text-warning-foreground">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Pricing & Duration</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Starting Bid (₹) *</Label>
                  <Input type="number" placeholder="5000000" value={startingBid} onChange={e => setStartingBid(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Reserve Price (₹)</Label>
                  <Input type="number" placeholder="8000000" value={reservePrice} onChange={e => setReservePrice(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bid Increment (₹) *</Label>
                  <Input type="number" placeholder="100000" value={bidIncrement} onChange={e => setBidIncrement(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Duration (days)</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="5">5 days</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button onClick={() => setStep(4)} className="flex-1 gradient-warning text-warning-foreground">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><Eye className="h-5 w-5" /> Preview</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 rounded bg-muted/50"><span className="text-muted-foreground">Title</span><span className="font-medium">{title || 'Not set'}</span></div>
                <div className="flex justify-between p-2 rounded bg-muted/50"><span className="text-muted-foreground">Category</span><span>{category || 'Not set'}</span></div>
                <div className="flex justify-between p-2 rounded bg-muted/50"><span className="text-muted-foreground">Starting Bid</span><span>₹{parseInt(startingBid || '0').toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between p-2 rounded bg-muted/50"><span className="text-muted-foreground">Reserve Price</span><span>₹{parseInt(reservePrice || '0').toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between p-2 rounded bg-muted/50"><span className="text-muted-foreground">Duration</span><span>{duration} days</span></div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button onClick={() => { toast.success('Auction published!'); navigate('/auctions'); }} className="flex-1 gradient-accent text-accent-foreground">
                  <CheckCircle className="mr-2 h-4 w-4" /> Publish Auction
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
