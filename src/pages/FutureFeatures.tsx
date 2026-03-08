import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Glasses, Printer, Link2, GraduationCap, 
  Eye, Box, Shield, BookOpen, Play, Award,
  ArrowRight, Clock, Sparkles
} from 'lucide-react';

const arvrFeatures = [
  { title: 'AR Equipment Preview', desc: 'Point your camera at your worksite and visualize how heavy equipment fits in your space before renting.', icon: Eye, status: 'beta' },
  { title: 'VR Factory Tours', desc: 'Walk through supplier facilities virtually. Inspect manufacturing quality without travel.', icon: Glasses, status: 'coming-soon' },
  { title: '3D Part Inspection', desc: 'Rotate and zoom into 3D scans of refurbished parts to verify condition remotely.', icon: Box, status: 'beta' },
];

const printingFeatures = [
  { title: 'Custom Part Requests', desc: 'Upload CAD files and get instant quotes from certified 3D printing suppliers across India.', icon: Printer, status: 'live' },
  { title: 'Material Library', desc: 'Browse 200+ industrial-grade materials: metals, polymers, ceramics. Compare strength, cost, and lead times.', icon: Sparkles, status: 'live' },
  { title: 'Print-on-Demand Spares', desc: 'Emergency spare parts printed and delivered within 48 hours. No minimum order.', icon: Clock, status: 'coming-soon' },
];

const blockchainFeatures = [
  { title: 'Equipment Provenance Chain', desc: 'Every ownership transfer, maintenance record, and certification stored on-chain. Immutable history.', icon: Link2, status: 'pilot' },
  { title: 'Smart Contracts for Rentals', desc: 'Automated escrow, deposit release, and penalty enforcement through blockchain smart contracts.', icon: Shield, status: 'coming-soon' },
  { title: 'Verified Certifications', desc: 'ISO, BIS, and CE certifications verified on-chain. No more forged documents.', icon: Award, status: 'pilot' },
];

const trainingModules = [
  { title: 'Equipment Operation Safety', desc: '12 modules covering heavy machinery safety protocols. OSHA-aligned.', hours: 24, modules: 12, level: 'Beginner' },
  { title: 'Industrial IoT & Telematics', desc: 'Learn to set up and interpret telematics data from rental equipment.', hours: 16, modules: 8, level: 'Intermediate' },
  { title: 'Sustainable Procurement', desc: 'Circular economy principles for industrial buyers. Reduce waste, save costs.', hours: 8, modules: 5, level: 'All Levels' },
  { title: 'Auction Strategy Masterclass', desc: 'Advanced bidding techniques, reserve price psychology, and lot evaluation.', hours: 6, modules: 4, level: 'Advanced' },
];

const statusBadge: Record<string, { label: string; className: string }> = {
  live: { label: 'Live', className: 'bg-accent/20 text-accent border-accent/30' },
  beta: { label: 'Beta', className: 'bg-info/20 text-info border-info/30' },
  pilot: { label: 'Pilot', className: 'bg-warning/20 text-warning border-warning/30' },
  'coming-soon': { label: 'Coming Soon', className: 'bg-muted text-muted-foreground' },
};

export default function FutureFeatures() {
  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Innovation Lab</h1>
          <p className="text-sm text-muted-foreground mt-1">Explore cutting-edge features shaping the future of industrial commerce</p>
        </div>

        <Tabs defaultValue="arvr">
          <TabsList className="flex-wrap">
            <TabsTrigger value="arvr"><Glasses className="h-4 w-4 mr-1" /> AR/VR Previews</TabsTrigger>
            <TabsTrigger value="printing"><Printer className="h-4 w-4 mr-1" /> 3D Printing</TabsTrigger>
            <TabsTrigger value="blockchain"><Link2 className="h-4 w-4 mr-1" /> Blockchain</TabsTrigger>
            <TabsTrigger value="training"><GraduationCap className="h-4 w-4 mr-1" /> Training</TabsTrigger>
          </TabsList>

          <TabsContent value="arvr">
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {arvrFeatures.map((f, i) => (
                <Card key={i} className="border-border/50 hover:shadow-industrial transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="rounded-xl p-3 bg-primary/10">
                        <f.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="outline" className={statusBadge[f.status].className}>
                        {statusBadge[f.status].label}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                    </div>
                    <Button 
                      variant={f.status === 'coming-soon' ? 'outline' : 'default'} 
                      className="w-full" 
                      onClick={() => f.status === 'coming-soon' ? toast.info('Joining waitlist...') : toast.info('Launching AR preview...')}
                    >
                      {f.status === 'coming-soon' ? 'Join Waitlist' : 'Try Now'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-6 border-border/50 gradient-primary">
              <CardContent className="p-6 text-primary-foreground">
                <h3 className="font-bold text-lg mb-2">🔮 AR Equipment Visualization Demo</h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  Experience how a CAT 320 Excavator looks at your job site. Requires a WebXR-compatible browser and camera access.
                </p>
                <Button variant="secondary" onClick={() => toast.info('AR demo requires WebXR-compatible device. Try on a mobile device with ARCore/ARKit support.')}>
                  <Eye className="mr-2 h-4 w-4" /> Launch AR Demo
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="printing">
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {printingFeatures.map((f, i) => (
                <Card key={i} className="border-border/50 hover:shadow-industrial transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="rounded-xl p-3 bg-accent/10">
                        <f.icon className="h-6 w-6 text-accent" />
                      </div>
                      <Badge variant="outline" className={statusBadge[f.status].className}>
                        {statusBadge[f.status].label}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => toast.success('Opening 3D printing marketplace...')}>
                      {f.status === 'live' ? 'Explore' : 'Notify Me'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-6 border-border/50">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">📐 Quick Quote Calculator</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {[
                    { material: 'PLA/ABS', price: '₹800/kg', lead: '3-5 days' },
                    { material: 'Nylon PA12', price: '₹2,400/kg', lead: '5-7 days' },
                    { material: 'Stainless Steel', price: '₹12,000/kg', lead: '10-14 days' },
                    { material: 'Titanium Ti64', price: '₹45,000/kg', lead: '14-21 days' },
                  ].map((m, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                      <p className="text-xs font-semibold">{m.material}</p>
                      <p className="text-lg font-bold mt-1">{m.price}</p>
                      <p className="text-[10px] text-muted-foreground">{m.lead}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain">
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {blockchainFeatures.map((f, i) => (
                <Card key={i} className="border-border/50 hover:shadow-industrial transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="rounded-xl p-3 bg-warning/10">
                        <f.icon className="h-6 w-6 text-warning" />
                      </div>
                      <Badge variant="outline" className={statusBadge[f.status].className}>
                        {statusBadge[f.status].label}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => toast.info('Blockchain feature in pilot phase')}>
                      {f.status === 'pilot' ? 'View Pilot' : 'Join Waitlist'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-6 border-border/50">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">🔗 Sample Provenance Chain</h3>
                <div className="space-y-3">
                  {[
                    { event: 'Manufactured', date: 'Jan 2022', by: 'Caterpillar Inc, USA', hash: '0x7a3f...e291' },
                    { event: 'Imported to India', date: 'Mar 2022', by: 'HeavyEquip India Pvt Ltd', hash: '0x8b4c...d382' },
                    { event: 'Sold to Tata Projects', date: 'May 2022', by: 'HeavyEquip India', hash: '0x9c5d...a473' },
                    { event: 'Major Service (2000h)', date: 'Nov 2023', by: 'CAT Authorized Service', hash: '0xad6e...b564' },
                    { event: 'Listed for Resale', date: 'Feb 2026', by: 'Tata Projects Ltd', hash: '0xbe7f...c655' },
                  ].map((e, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="flex flex-col items-center">
                        <div className="h-3 w-3 rounded-full bg-accent border-2 border-background" />
                        {i < 4 && <div className="w-px h-6 bg-border" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{e.event}</p>
                        <p className="text-xs text-muted-foreground">{e.date} · {e.by}</p>
                      </div>
                      <code className="text-[10px] text-muted-foreground font-mono">{e.hash}</code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {trainingModules.map((m, i) => (
                <Card key={i} className="border-border/50 hover:shadow-industrial transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="rounded-xl p-3 bg-info/10">
                        <GraduationCap className="h-6 w-6 text-info" />
                      </div>
                      <Badge variant="outline">{m.level}</Badge>
                    </div>
                    <h3 className="font-semibold">{m.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">{m.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {m.hours} hours</span>
                      <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {m.modules} modules</span>
                    </div>
                    <Button className="w-full" variant="outline" onClick={() => toast.success('Enrolling in course...')}>
                      <Play className="mr-2 h-4 w-4" /> Start Course
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-6 border-border/50 bg-info/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-6 w-6 text-info" />
                  <h3 className="font-bold">Certification Program</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete all 4 courses to earn your InduCycle Certified Industrial Procurement Professional badge — recognized by 500+ enterprises across India.
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[15%] rounded-full bg-info" />
                  </div>
                  <span className="text-xs font-medium">15% Complete</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
