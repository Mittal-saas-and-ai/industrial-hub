import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Plus, MapPin, Truck, Package, Clock, CheckCircle } from 'lucide-react';

interface ProjectItem {
  id: string;
  type: 'rental' | 'consumable';
  name: string;
  status: 'planned' | 'active' | 'completed';
  startWeek: number;
  endWeek: number;
}

const sampleProject: ProjectItem[] = [
  { id: '1', type: 'rental', name: 'CAT 320 Excavator', status: 'active', startWeek: 1, endWeek: 8 },
  { id: '2', type: 'rental', name: 'Liebherr 50T Crane', status: 'active', startWeek: 3, endWeek: 12 },
  { id: '3', type: 'consumable', name: 'Safety Equipment Bundle', status: 'completed', startWeek: 1, endWeek: 2 },
  { id: '4', type: 'rental', name: 'Backup Generator 500kVA', status: 'planned', startWeek: 6, endWeek: 12 },
  { id: '5', type: 'consumable', name: 'Concrete Mix (500 bags)', status: 'planned', startWeek: 4, endWeek: 4 },
];

const statusColors: Record<string, string> = {
  planned: 'bg-info/20 text-info',
  active: 'bg-accent/20 text-accent',
  completed: 'bg-muted text-muted-foreground',
};

export function ProjectMode() {
  const [projectName, setProjectName] = useState('Highway NH-48 Extension');
  const [items] = useState(sampleProject);
  const totalWeeks = 12;
  const currentWeek = 5;
  const progress = (currentWeek / totalWeeks) * 100;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" /> Project Mode
          </CardTitle>
          <Badge variant="secondary" className="text-[10px]">Construction</Badge>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Input value={projectName} onChange={e => setProjectName(e.target.value)} className="text-xs font-medium h-8" />
          <Badge variant="outline" className="text-[10px] shrink-0">
            <MapPin className="h-3 w-3 mr-1" /> Pune, MH
          </Badge>
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
            <span>Week {currentWeek} of {totalWeeks}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Timeline header */}
        <div className="flex text-[8px] text-muted-foreground">
          <div className="w-36 shrink-0" />
          {Array.from({ length: totalWeeks }).map((_, i) => (
            <div key={i} className="flex-1 text-center border-l border-border/30 min-w-[28px]">
              W{i + 1}
            </div>
          ))}
        </div>

        {/* Items */}
        {items.map(item => (
          <div key={item.id} className="flex items-center">
            <div className="w-36 shrink-0 flex items-center gap-1.5 pr-2">
              {item.type === 'rental' ? <Truck className="h-3 w-3 text-primary shrink-0" /> : <Package className="h-3 w-3 text-warning shrink-0" />}
              <span className="text-[10px] truncate">{item.name}</span>
            </div>
            <div className="flex flex-1">
              {Array.from({ length: totalWeeks }).map((_, week) => {
                const isInRange = week + 1 >= item.startWeek && week + 1 <= item.endWeek;
                const isCurrent = week + 1 === currentWeek;
                return (
                  <div key={week} className="flex-1 min-w-[28px] h-5 border-l border-border/30 relative">
                    {isInRange && (
                      <div className={`absolute inset-y-0.5 inset-x-0 rounded-sm ${statusColors[item.status]}`} />
                    )}
                    {isCurrent && <div className="absolute inset-y-0 left-0 w-px bg-destructive z-10" />}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex gap-3 mt-3 pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-accent/20" /><span className="text-[9px] text-muted-foreground">Active</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-info/20" /><span className="text-[9px] text-muted-foreground">Planned</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-muted" /><span className="text-[9px] text-muted-foreground">Completed</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-[10px] h-7 flex-1">
            <Plus className="h-3 w-3 mr-1" /> Add Rental
          </Button>
          <Button variant="outline" size="sm" className="text-[10px] h-7 flex-1">
            <Plus className="h-3 w-3 mr-1" /> Add Consumable
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
