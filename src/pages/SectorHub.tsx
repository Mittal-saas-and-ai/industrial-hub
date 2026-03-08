import { AppLayout } from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompatibilityChecker } from '@/components/sectors/CompatibilityChecker';
import { CarbonCalculator } from '@/components/sectors/CarbonCalculator';
import { SectorFilters } from '@/components/sectors/SectorFilters';
import { ProjectMode } from '@/components/sectors/ProjectMode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Factory, HardHat, Flame, Wind, Snowflake, Cpu, Battery, ArrowRight, Zap, Shield, Wrench } from 'lucide-react';

const sectorPages = [
  { id: 'manufacturing', label: 'Manufacturing', icon: Factory, color: 'text-primary', features: ['Compatibility Checker', 'Bulk RFQ Templates', 'Precision Spec Filters'] },
  { id: 'construction', label: 'Construction', icon: HardHat, color: 'text-warning', features: ['Project Mode', 'Site Delivery Map', 'Timeline Planning'] },
  { id: 'energy_mining', label: 'Energy & Mining', icon: Flame, color: 'text-destructive', features: ['ATEX Certification Filters', 'Inspection Reports', 'Long-term Rental'] },
  { id: 'renewable_energy', label: 'Renewable', icon: Wind, color: 'text-accent', features: ['Carbon Calculator', 'Green Filters', 'Sustainability Reports'] },
  { id: 'data_centers', label: 'Data Centers', icon: Snowflake, color: 'text-info', features: ['Power/Cooling Compatibility', 'Tier Grading', '24/7 SLA Filters'] },
  { id: 'semiconductor', label: 'Semiconductor', icon: Cpu, color: 'text-primary', features: ['Cleanroom Spec Filters', 'ESD Safety Badges', 'ISO Class Filtering'] },
  { id: 'ev_battery', label: 'EV & Battery', icon: Battery, color: 'text-accent', features: ['HV Connector Filters', 'Safety Compliance', 'Testing Equipment'] },
];

export default function SectorHub() {
  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Sector Hub</h1>
          <p className="text-sm text-muted-foreground">Specialized tools and filters for your industry</p>
        </div>

        <Tabs defaultValue="manufacturing">
          <TabsList className="flex-wrap h-auto gap-1">
            {sectorPages.map(s => (
              <TabsTrigger key={s.id} value={s.id} className="text-xs gap-1">
                <s.icon className="h-3.5 w-3.5" /> {s.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="manufacturing" className="space-y-6 mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <CompatibilityChecker />
              <SectorFilters sector="manufacturing" />
            </div>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Bulk RFQ Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Assembly Line Spares', 'CNC Tooling Set', 'Bearing Replacement Kit', 'Welding Consumables Pack'].map(t => (
                    <Card key={t} className="border-border/50 hover:shadow-industrial transition-all cursor-pointer">
                      <CardContent className="p-3 text-center">
                        <Wrench className="h-5 w-5 text-primary mx-auto mb-1" />
                        <p className="text-xs font-medium">{t}</p>
                        <Button variant="ghost" size="sm" className="text-[10px] h-6 mt-1">Use Template</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="construction" className="space-y-6 mt-4">
            <ProjectMode />
            <div className="grid md:grid-cols-2 gap-6">
              <SectorFilters sector="construction" />
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Site Delivery Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] rounded-lg bg-muted flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">🗺️ Interactive delivery map — connect to Maps API for live tracking</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="energy_mining" className="space-y-6 mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <SectorFilters sector="energy_mining" />
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Inspection Report Viewer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['DGMS Annual Inspection 2025', 'Equipment Safety Audit Q4', 'Environmental Compliance Report'].map(r => (
                      <div key={r} className="flex items-center justify-between p-2 rounded-lg border border-border/50">
                        <span className="text-xs">{r}</span>
                        <Button variant="outline" size="sm" className="text-[10px] h-6">View PDF</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="renewable_energy" className="space-y-6 mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <CarbonCalculator />
              <SectorFilters sector="renewable_energy" />
            </div>
          </TabsContent>

          <TabsContent value="data_centers" className="space-y-6 mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <SectorFilters sector="data_centers" />
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="h-4 w-4" /> Power/Cooling Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground">Check if power and cooling equipment matches your data center requirements.</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded bg-muted/50"><span className="text-muted-foreground">Rack Power:</span> <span className="font-medium">20 kW/rack</span></div>
                    <div className="p-2 rounded bg-muted/50"><span className="text-muted-foreground">Cooling:</span> <span className="font-medium">CRAC / In-row</span></div>
                    <div className="p-2 rounded bg-muted/50"><span className="text-muted-foreground">PUE Target:</span> <span className="font-medium">1.3</span></div>
                    <div className="p-2 rounded bg-muted/50"><span className="text-muted-foreground">Redundancy:</span> <span className="font-medium">N+1</span></div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs">Run Compatibility Check</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="semiconductor" className="space-y-6 mt-4">
            <SectorFilters sector="semiconductor" />
          </TabsContent>

          <TabsContent value="ev_battery" className="space-y-6 mt-4">
            <SectorFilters sector="ev_battery" />
          </TabsContent>
        </Tabs>

        {/* Quick Navigation to Search with Sector */}
        <div>
          <h2 className="text-sm font-semibold mb-3">Browse by Sector</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sectorPages.map(s => (
              <Link key={s.id} to={`/search?sector=${s.id}`}>
                <Card className="border-border/50 hover:shadow-industrial transition-all cursor-pointer group">
                  <CardContent className="p-3">
                    <s.icon className={`h-5 w-5 ${s.color} mb-2`} />
                    <p className="text-xs font-medium group-hover:text-primary">{s.label}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {s.features.slice(0, 2).map(f => (
                        <Badge key={f} variant="outline" className="text-[8px]">{f}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
