import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, Zap, Snowflake, Cpu, Battery, HardHat, Flame, Droplets, Wind } from 'lucide-react';
import { useState } from 'react';

interface SectorFilterProps {
  sector: string;
  onFilterChange?: (filters: string[]) => void;
}

const sectorFilters: Record<string, { title: string; icon: any; filters: { id: string; label: string; badge?: string }[] }> = {
  energy_mining: {
    title: 'Energy & Mining Certifications',
    icon: Flame,
    filters: [
      { id: 'atex', label: 'ATEX Rated (Explosive Atmosphere)', badge: 'Safety' },
      { id: 'dgms', label: 'DGMS Approved', badge: 'Mining' },
      { id: 'iecex', label: 'IECEx Certified', badge: 'Intl' },
      { id: 'iso14001', label: 'ISO 14001 Environmental', badge: 'Eco' },
      { id: 'inspection', label: 'Has Inspection Report', badge: 'Verified' },
    ],
  },
  semiconductor: {
    title: 'Cleanroom & ESD Specifications',
    icon: Cpu,
    filters: [
      { id: 'iso5', label: 'ISO Class 5 (Class 100)', badge: 'Cleanroom' },
      { id: 'iso4', label: 'ISO Class 4 (Class 10)', badge: 'Cleanroom' },
      { id: 'iso3', label: 'ISO Class 3 (Class 1)', badge: 'Ultra-Clean' },
      { id: 'esd', label: 'ESD-Safe (ANSI/ESD S20.20)', badge: 'ESD' },
      { id: 'ulpa', label: 'ULPA Filtered', badge: 'Filtration' },
    ],
  },
  ev_battery: {
    title: 'EV & Battery Safety',
    icon: Battery,
    filters: [
      { id: 'hv', label: 'High-Voltage Rated (>400V)', badge: 'HV' },
      { id: 'iec62133', label: 'IEC 62133 Battery Safety', badge: 'Safety' },
      { id: 'ul2580', label: 'UL 2580 EV Battery', badge: 'UL' },
      { id: 'thermal', label: 'Thermal Management Rated', badge: 'Thermal' },
      { id: 'compliance', label: 'AIS-156 Compliant', badge: 'India' },
    ],
  },
  data_centers: {
    title: 'Data Center Compatibility',
    icon: Snowflake,
    filters: [
      { id: 'cooling', label: 'Precision Cooling Compatible', badge: 'HVAC' },
      { id: 'ups', label: 'UPS Compatible', badge: 'Power' },
      { id: 'redundant', label: 'N+1 Redundancy Ready', badge: 'Uptime' },
      { id: 'tier3', label: 'Tier III+ Data Center Grade', badge: 'Grade' },
      { id: '24x7', label: '24/7 Support Available', badge: 'SLA' },
    ],
  },
  renewable_energy: {
    title: 'Green & Renewable Filters',
    icon: Wind,
    filters: [
      { id: 'biodegradable', label: 'Biodegradable Materials', badge: 'Eco' },
      { id: 'recycled', label: 'Recycled/Refurbished Parts', badge: 'Circular' },
      { id: 'solar', label: 'Solar Installation Compatible', badge: 'Solar' },
      { id: 'wind', label: 'Wind Turbine Compatible', badge: 'Wind' },
      { id: 'carbon_neutral', label: 'Carbon Neutral Certified', badge: 'Net Zero' },
    ],
  },
  construction: {
    title: 'Construction & Safety',
    icon: HardHat,
    filters: [
      { id: 'bis', label: 'BIS Certified', badge: 'India' },
      { id: 'ce', label: 'CE Marked', badge: 'EU' },
      { id: 'osha', label: 'OSHA Compliant', badge: 'Safety' },
      { id: 'heavy_duty', label: 'Heavy Duty (>20T)', badge: 'Heavy' },
      { id: 'gps', label: 'GPS/Telematics Equipped', badge: 'IoT' },
    ],
  },
  manufacturing: {
    title: 'Manufacturing Standards',
    icon: Shield,
    filters: [
      { id: 'iso9001', label: 'ISO 9001 Quality', badge: 'Quality' },
      { id: 'iatf', label: 'IATF 16949 Automotive', badge: 'Auto' },
      { id: 'precision', label: 'Precision Grade (IT6+)', badge: 'Precision' },
      { id: 'cnc', label: 'CNC Compatible', badge: 'CNC' },
      { id: 'calibrated', label: 'Calibration Certificate', badge: 'Cal' },
    ],
  },
};

export function SectorFilters({ sector, onFilterChange }: SectorFilterProps) {
  const config = sectorFilters[sector];
  const [selected, setSelected] = useState<string[]>([]);

  if (!config) return null;

  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id];
    setSelected(next);
    onFilterChange?.(next);
  };

  const Icon = config.icon;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" /> {config.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {config.filters.map(f => (
          <div key={f.id} className="flex items-center gap-2" onClick={() => toggle(f.id)}>
            <Checkbox checked={selected.includes(f.id)} onCheckedChange={() => toggle(f.id)} />
            <span className="text-xs flex-1">{f.label}</span>
            {f.badge && <Badge variant="outline" className="text-[9px] h-4">{f.badge}</Badge>}
          </div>
        ))}
        {selected.length > 0 && (
          <Button variant="ghost" size="sm" className="text-[10px] h-6 w-full" onClick={() => { setSelected([]); onFilterChange?.([]); }}>
            Clear Filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
