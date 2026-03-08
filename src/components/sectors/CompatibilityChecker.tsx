import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle, XCircle, AlertTriangle, Wrench, Search } from 'lucide-react';
import { toast } from 'sonner';

const machineModels = [
  'CAT 320 Hydraulic Excavator',
  'Komatsu PC200-8',
  'JCB 3DX Backhoe',
  'Volvo A40G Dump Truck',
  'Liebherr LTM 1050 Crane',
  'Haas VF-2SS CNC',
];

const partCategories = [
  'Hydraulic Hoses', 'Oil Filters', 'Bucket Teeth', 'Bearings', 'Seals & Gaskets',
  'Fuel Filters', 'Belts', 'Lubricants', 'Electrical Components', 'Brake Parts',
];

export function CompatibilityChecker() {
  const [machine, setMachine] = useState('');
  const [part, setPart] = useState('');
  const [customPart, setCustomPart] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const checkCompatibility = async () => {
    const partName = customPart || part;
    if (!machine || !partName) { toast.error('Select both machine and part'); return; }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-suggest', {
        body: { type: 'compatibility-check', context: { machine, part: partName } },
      });
      if (error) throw error;
      setResult(data);
    } catch (e: any) {
      toast.error(e.message || 'Failed to check compatibility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Wrench className="h-4 w-4 text-primary" /> Compatibility Checker
        </CardTitle>
        <p className="text-xs text-muted-foreground">Check if parts are compatible with your machinery</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs font-medium">Machine Model</label>
            <Select value={machine} onValueChange={setMachine}>
              <SelectTrigger className="text-xs"><SelectValue placeholder="Select machine" /></SelectTrigger>
              <SelectContent>
                {machineModels.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium">Part Category</label>
            <Select value={part} onValueChange={setPart}>
              <SelectTrigger className="text-xs"><SelectValue placeholder="Select part" /></SelectTrigger>
              <SelectContent>
                {partCategories.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Input placeholder="Or type specific part name..." value={customPart} onChange={e => setCustomPart(e.target.value)} className="text-xs" />
        <Button onClick={checkCompatibility} disabled={loading} className="w-full text-xs">
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
          Check Compatibility
        </Button>

        {result && (
          <div className="p-4 rounded-lg border border-border/50 space-y-3">
            <div className="flex items-center gap-2">
              {result.compatible ? (
                <><CheckCircle className="h-5 w-5 text-accent" /><span className="font-semibold text-sm text-accent">Compatible</span></>
              ) : (
                <><XCircle className="h-5 w-5 text-destructive" /><span className="font-semibold text-sm text-destructive">Not Compatible</span></>
              )}
              <Badge variant="outline" className="text-[10px] ml-auto">Confidence: {result.confidence}%</Badge>
            </div>
            {result.notes && <p className="text-xs text-muted-foreground">{result.notes}</p>}
            {result.alternatives && result.alternatives.length > 0 && (
              <div>
                <p className="text-xs font-medium mb-1">Alternatives:</p>
                <div className="flex flex-wrap gap-1">
                  {result.alternatives.map((a: string, i: number) => (
                    <Badge key={i} variant="secondary" className="text-[10px]">{a}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
