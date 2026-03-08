import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database, Link2, Shield, CheckCircle, XCircle, RefreshCw, Copy, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface ERPConnection {
  id: string;
  name: string;
  type: 'sap' | 'oracle' | 'dynamics' | 'custom';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  modules: string[];
}

const mockConnections: ERPConnection[] = [
  {
    id: 'erp-1',
    name: 'SAP S/4HANA Production',
    type: 'sap',
    status: 'connected',
    lastSync: '2 minutes ago',
    modules: ['Procurement (MM)', 'Plant Maintenance (PM)', 'Inventory (WM)'],
  },
  {
    id: 'erp-2',
    name: 'Oracle EBS Staging',
    type: 'oracle',
    status: 'disconnected',
    lastSync: '3 days ago',
    modules: ['iProcurement', 'Inventory', 'Assets'],
  },
];

const statusBadge: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive'; icon: any }> = {
  connected: { label: 'Connected', variant: 'default', icon: CheckCircle },
  disconnected: { label: 'Disconnected', variant: 'secondary', icon: XCircle },
  error: { label: 'Error', variant: 'destructive', icon: XCircle },
};

export function ERPIntegration() {
  const [connections] = useState<ERPConnection[]>(mockConnections);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [syncInterval, setSyncInterval] = useState('15');

  const apiKey = 'ic_live_7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c';

  return (
    <div className="space-y-6">
      {/* API Key Management */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4" /> API Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs">Your API Key</Label>
            <div className="flex gap-2 mt-1">
              <div className="relative flex-1">
                <Input
                  value={showApiKey ? apiKey : '•'.repeat(40)}
                  readOnly
                  className="text-xs font-mono pr-20"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 text-xs"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(apiKey); toast.success('API key copied!'); }}>
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Use this key to authenticate ERP webhook calls to InduCycle Hub.</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm">Auto-Sync</Label>
              <p className="text-xs text-muted-foreground">Automatically sync data between ERP and InduCycle</p>
            </div>
            <Switch checked={autoSync} onCheckedChange={setAutoSync} />
          </div>

          {autoSync && (
            <div>
              <Label className="text-xs">Sync Interval (minutes)</Label>
              <Select value={syncInterval} onValueChange={setSyncInterval}>
                <SelectTrigger className="text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Every 5 minutes</SelectItem>
                  <SelectItem value="15">Every 15 minutes</SelectItem>
                  <SelectItem value="30">Every 30 minutes</SelectItem>
                  <SelectItem value="60">Every hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Connections */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-4 w-4" /> ERP Connections
            </CardTitle>
            <Button size="sm" className="text-xs" onClick={() => setShowAddForm(!showAddForm)}>
              <Link2 className="h-3 w-3 mr-1" /> {showAddForm ? 'Cancel' : 'Add Connection'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && (
            <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
              <CardContent className="p-4 space-y-3">
                <h4 className="text-sm font-semibold">New ERP Connection</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Connection Name</Label>
                    <Input placeholder="e.g. SAP Production" className="text-xs mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">ERP System</Label>
                    <Select>
                      <SelectTrigger className="text-xs mt-1"><SelectValue placeholder="Select ERP" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sap">SAP S/4HANA</SelectItem>
                        <SelectItem value="oracle">Oracle EBS / Fusion</SelectItem>
                        <SelectItem value="dynamics">Microsoft Dynamics 365</SelectItem>
                        <SelectItem value="custom">Custom REST API</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Endpoint URL</Label>
                    <Input placeholder="https://erp.company.com/api" className="text-xs mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">Authentication Token</Label>
                    <Input type="password" placeholder="Bearer token or API key" className="text-xs mt-1" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="text-xs" onClick={() => { setShowAddForm(false); toast.success('Connection test successful! Saving...'); }}>
                    Test & Save
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => setShowAddForm(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {connections.map(conn => {
            const status = statusBadge[conn.status];
            const StatusIcon = status.icon;
            return (
              <div key={conn.id} className="p-4 rounded-lg border border-border/50 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">{conn.name}</h4>
                      <Badge variant={status.variant} className="text-[10px] gap-1">
                        <StatusIcon className="h-3 w-3" /> {status.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {conn.type.toUpperCase()} · Last synced: {conn.lastSync}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.info('Syncing...')}>
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {conn.modules.map(m => (
                    <Badge key={m} variant="outline" className="text-[10px]">{m}</Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Webhook Endpoints */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">📡 Webhook Endpoints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">Configure these endpoints in your ERP to push data to InduCycle Hub.</p>
          {[
            { name: 'Purchase Orders', endpoint: '/api/webhooks/erp/purchase-orders', method: 'POST' },
            { name: 'Inventory Updates', endpoint: '/api/webhooks/erp/inventory', method: 'POST' },
            { name: 'Asset Transfers', endpoint: '/api/webhooks/erp/assets', method: 'POST' },
            { name: 'Invoice Sync', endpoint: '/api/webhooks/erp/invoices', method: 'POST' },
          ].map((wh, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Badge variant="outline" className="text-[10px] font-mono">{wh.method}</Badge>
              <div className="flex-1">
                <p className="text-xs font-medium">{wh.name}</p>
                <code className="text-[10px] text-muted-foreground font-mono">{wh.endpoint}</code>
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-[10px]" onClick={() => { navigator.clipboard.writeText(wh.endpoint); toast.success('Endpoint copied!'); }}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
