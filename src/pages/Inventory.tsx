import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { inventoryItems, spendData, usageData, formatCurrencyFull } from '@/data/mockData';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, Package, RefreshCw, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const COLORS = ['hsl(210, 52%, 24%)', 'hsl(142, 71%, 45%)', 'hsl(32, 95%, 55%)'];

export default function Inventory() {
  const lowStockItems = inventoryItems.filter(i => i.currentStock <= i.minStock);
  const pieData = [
    { name: 'Consumables', value: spendData.reduce((s, d) => s + d.consumables, 0) },
    { name: 'Rentals', value: spendData.reduce((s, d) => s + d.rentals, 0) },
    { name: 'Auctions', value: spendData.reduce((s, d) => s + d.auctions, 0) },
  ];

  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Inventory & Analytics</h1>
            <p className="text-sm text-muted-foreground">Premium dashboard for usage tracking and spend insights</p>
          </div>
          <Badge variant="secondary" className="text-xs">Enterprise</Badge>
        </div>

        {/* Predictive Alerts */}
        {lowStockItems.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Predictive Alerts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {lowStockItems.map(item => (
                <Card key={item.id} className="border-warning/30 bg-warning/5">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Stock: {item.currentStock} / {item.minStock} min · Usage: {item.usageRate}/week
                        </p>
                        <p className="text-[10px] text-warning font-medium mt-1">
                          ~{Math.ceil(item.currentStock / item.usageRate)} weeks until stockout
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs h-7 shrink-0" onClick={() => toast.success(`${item.name} added to cart`)}>
                        <RefreshCw className="h-3 w-3 mr-1" /> Reorder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Utilization Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Rental Utilization & Consumption</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="utilization" stroke="hsl(210, 52%, 24%)" name="Utilization %" strokeWidth={2} />
                  <Line type="monotone" dataKey="consumption" stroke="hsl(142, 71%, 45%)" name="Consumption %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Spend by Category */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Spend by Category</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrencyFull(value)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Spend Trend */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Monthly Spend Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={spendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(value: number) => formatCurrencyFull(value)} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="consumables" fill="hsl(210, 52%, 24%)" name="Consumables" radius={[2, 2, 0, 0]} />
                <Bar dataKey="rentals" fill="hsl(142, 71%, 45%)" name="Rentals" radius={[2, 2, 0, 0]} />
                <Bar dataKey="auctions" fill="hsl(32, 95%, 55%)" name="Auctions" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Package className="h-4 w-4" /> Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-muted-foreground">Item</th>
                    <th className="text-left py-2 px-2 font-medium text-muted-foreground">Category</th>
                    <th className="text-right py-2 px-2 font-medium text-muted-foreground">Stock</th>
                    <th className="text-right py-2 px-2 font-medium text-muted-foreground">Min Stock</th>
                    <th className="text-right py-2 px-2 font-medium text-muted-foreground">Usage/wk</th>
                    <th className="text-right py-2 px-2 font-medium text-muted-foreground">Unit Price</th>
                    <th className="text-right py-2 px-2 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map(item => (
                    <tr key={item.id} className="border-b border-border/50">
                      <td className="py-2 px-2 font-medium">{item.name}</td>
                      <td className="py-2 px-2 text-muted-foreground">{item.category}</td>
                      <td className="py-2 px-2 text-right">{item.currentStock}</td>
                      <td className="py-2 px-2 text-right">{item.minStock}</td>
                      <td className="py-2 px-2 text-right">{item.usageRate}</td>
                      <td className="py-2 px-2 text-right">{formatCurrencyFull(item.unitPrice)}</td>
                      <td className="py-2 px-2 text-right">
                        <Badge variant={item.currentStock <= item.minStock ? 'destructive' : 'secondary'} className="text-[10px]">
                          {item.currentStock <= item.minStock ? 'Low' : 'OK'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
