import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ArrowLeft, ShoppingCart, Warehouse, Truck, Package, Gavel, Leaf, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sectors } from '@/data/mockData';
import { UserRole, Sector } from '@/types';

const carouselSlides = [
  { title: 'Industrial Consumables', desc: 'Source hoses, bearings, lubricants, and safety equipment from verified suppliers at competitive prices.', icon: Package, color: 'text-primary' },
  { title: 'Equipment Rentals', desc: 'Rent excavators, cranes, generators, and testing rigs — by the day, week, or month with full insurance.', icon: Truck, color: 'text-accent' },
  { title: 'Live Auctions', desc: 'Bid on surplus machinery, decommissioned equipment, and bulk lots from top industrial companies.', icon: Gavel, color: 'text-warning' },
  { title: 'Ecosystem & Sustainability', desc: 'Track carbon savings, source recycled parts, and connect with the industrial circular economy.', icon: Leaf, color: 'text-success' },
];

const roles = [
  { id: 'buyer' as UserRole, title: 'Buyer', desc: 'Factory, contractor, or project manager sourcing equipment and consumables.', icon: ShoppingCart },
  { id: 'seller' as UserRole, title: 'Seller / Supplier', desc: 'Supply consumables, spare parts, or list equipment for sale or auction.', icon: Warehouse },
  { id: 'equipment_owner' as UserRole, title: 'Equipment Owner', desc: 'List machinery for rental or auction surplus equipment from your fleet.', icon: Truck },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { setIsOnboarded, setUser, user } = useUser();
  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [gstin, setGstin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleComplete = () => {
    setIsOnboarded(true);
    navigate('/dashboard');
  };

  const toggleSector = (id: Sector) => {
    setSelectedSectors(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  // Step 0: Splash
  if (step === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="animate-scale-in flex flex-col items-center text-center max-w-md">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-industrial">
            <Globe className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">InduCycle Hub</h1>
          <p className="text-lg text-muted-foreground mb-8">The Industrial B2B Marketplace</p>
          <p className="text-sm text-muted-foreground mb-10">
            Consumables · Rentals · Auctions · Circular Economy
          </p>
          <Button size="lg" className="gradient-accent text-accent-foreground px-10 animate-pulse-glow" onClick={() => setStep(1)}>
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Step 1: Carousel
  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="max-w-lg w-full space-y-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Welcome to InduCycle Hub</h2>
            <p className="text-muted-foreground text-sm mt-1">Everything your industrial operations need</p>
          </div>
          <div className="grid gap-4">
            {carouselSlides.map((slide, i) => (
              <Card key={i} className="animate-fade-in border-border/50 hover:border-primary/30 transition-colors" style={{ animationDelay: `${i * 100}ms` }}>
                <CardContent className="flex items-start gap-4 p-4">
                  <div className={cn('mt-1 rounded-lg bg-muted p-2.5', slide.color)}>
                    <slide.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{slide.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{slide.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(0)} className="flex-1"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
            <Button onClick={() => setStep(2)} className="flex-1 gradient-primary text-primary-foreground">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Role Selection
  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="max-w-lg w-full space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Choose Your Role</h2>
            <p className="text-muted-foreground text-sm mt-1">How will you use InduCycle Hub?</p>
          </div>
          <div className="grid gap-4">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={cn(
                  'cursor-pointer transition-all hover:shadow-industrial',
                  selectedRole === role.id ? 'border-primary ring-2 ring-primary/20' : 'border-border/50'
                )}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={cn('rounded-lg p-3', selectedRole === role.id ? 'gradient-primary' : 'bg-muted')}>
                    <role.icon className={cn('h-5 w-5', selectedRole === role.id ? 'text-primary-foreground' : 'text-foreground')} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{role.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{role.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
            <Button onClick={() => selectedRole && setStep(3)} disabled={!selectedRole} className="flex-1 gradient-primary text-primary-foreground">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Business Registration
  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="max-w-lg w-full space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Business Details</h2>
            <p className="text-muted-foreground text-sm mt-1">Verify your business to unlock full access</p>
          </div>
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input id="company" placeholder="e.g., Tata Projects Ltd" value={companyName} onChange={e => setCompanyName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gstin">GSTIN</Label>
                  <Input id="gstin" placeholder="27AAACT2727Q1ZV" value={gstin} onChange={e => setGstin(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pan">PAN</Label>
                  <Input id="pan" placeholder="AAACT2727Q" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Business Email *</Label>
                <Input id="email" type="email" placeholder="procurement@company.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Upload Documents</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">Business License</Button>
                  <Button variant="outline" size="sm" className="text-xs">GST Certificate</Button>
                </div>
                <p className="text-[10px] text-muted-foreground">PDF, JPG or PNG (max 5MB each)</p>
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(2)} className="flex-1"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
            <Button onClick={() => setStep(4)} className="flex-1 gradient-primary text-primary-foreground">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Sector & Profile Setup
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="max-w-lg w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Your Sectors</h2>
          <p className="text-muted-foreground text-sm mt-1">Select industries you operate in for personalized experience</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {sectors.map((sector) => (
            <Card
              key={sector.id}
              className={cn(
                'cursor-pointer transition-all',
                selectedSectors.includes(sector.id as Sector) ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border/50 hover:border-primary/30'
              )}
              onClick={() => toggleSector(sector.id as Sector)}
            >
              <CardContent className="flex items-center gap-3 p-3">
                <span className="text-xl">{sector.icon}</span>
                <span className="text-xs font-medium leading-tight">{sector.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setStep(3)} className="flex-1"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
          <Button onClick={handleComplete} className="flex-1 gradient-accent text-accent-foreground">
            Enter InduCycle Hub <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
