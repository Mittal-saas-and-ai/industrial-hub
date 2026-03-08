import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Leaf, TreePine } from 'lucide-react';
import { toast } from 'sonner';

export function CarbonCalculator() {
  const [itemType, setItemType] = useState('Refurbished Excavator');
  const [quantity, setQuantity] = useState(1);
  const [usageDays, setUsageDays] = useState([30]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const calculate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-suggest', {
        body: {
          type: 'carbon-calculator',
          context: { itemType, quantity, usageDays: usageDays[0], isRefurbished: true },
        },
      });
      if (error) throw error;
      setResult(data);
    } catch (e: any) {
      toast.error(e.message || 'Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-accent/20 bg-accent/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-accent">
          <Leaf className="h-4 w-4" /> Carbon Savings Calculator
        </CardTitle>
        <p className="text-xs text-muted-foreground">Estimate CO₂ savings from refurbished/recycled items</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium">Item Type</label>
          <Input value={itemType} onChange={e => setItemType(e.target.value)} placeholder="e.g., Refurbished Excavator" className="text-xs" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs font-medium">Quantity</label>
            <Input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min={1} className="text-xs" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium">Usage Days: {usageDays[0]}</label>
            <Slider value={usageDays} onValueChange={setUsageDays} min={1} max={365} step={1} className="mt-3" />
          </div>
        </div>
        <Button onClick={calculate} disabled={loading} className="w-full text-xs gradient-accent text-accent-foreground">
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Leaf className="h-4 w-4 mr-2" />}
          Calculate Savings
        </Button>

        {result && (
          <div className="p-4 rounded-lg bg-background border border-accent/20 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-lg bg-accent/10">
                <p className="text-2xl font-bold text-accent">{result.co2SavedKg || '~500'} kg</p>
                <p className="text-[10px] text-muted-foreground">CO₂ Saved</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10">
                <TreePine className="h-5 w-5 text-accent mx-auto mb-1" />
                <p className="text-2xl font-bold text-accent">{result.treesEquivalent || '~25'}</p>
                <p className="text-[10px] text-muted-foreground">Trees Equivalent</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {result.percentReduction || '~35'}% reduction compared to buying new
            </p>
            {result.recommendations && (
              <div className="space-y-1">
                <p className="text-xs font-medium">Recommendations:</p>
                {result.recommendations.map((r: string, i: number) => (
                  <p key={i} className="text-[10px] text-muted-foreground">• {r}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
