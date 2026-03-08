import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Bell, Shield, Globe, Palette, Smartphone, Database, Download } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Settings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [bidAlerts, setBidAlerts] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [rentalReminders, setRentalReminders] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);

  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* Appearance */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Palette className="h-4 w-4" /> Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Dark / Light Mode</p>
                <p className="text-xs text-muted-foreground">Toggle between dark and light themes</p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Email Notifications', desc: 'Receive updates via email', state: emailNotifs, setter: setEmailNotifs },
              { label: 'Push Notifications', desc: 'Browser push notifications', state: pushNotifs, setter: setPushNotifs },
              { label: 'Auction Bid Alerts', desc: 'Get notified on outbid and auction updates', state: bidAlerts, setter: setBidAlerts },
              { label: 'Price Drop Alerts', desc: 'Notifications when saved items drop in price', state: priceAlerts, setter: setPriceAlerts },
              { label: 'Rental Reminders', desc: 'Alerts before rental periods end', state: rentalReminders, setter: setRentalReminders },
              { label: 'Inventory Stock Alerts', desc: 'Warnings when stock falls below minimum', state: stockAlerts, setter: setStockAlerts },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">{item.label}</Label>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch checked={item.state} onCheckedChange={item.setter} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" /> Security & Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs">Enable 2FA</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">GDPR Data Export</p>
                <p className="text-xs text-muted-foreground">Download all your data</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs"><Download className="mr-1 h-3 w-3" /> Export</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">API Access</p>
                <p className="text-xs text-muted-foreground">ERP integration (SAP, Oracle) API keys</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs"><Database className="mr-1 h-3 w-3" /> Manage</Button>
            </div>
          </CardContent>
        </Card>

        {/* PWA */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Smartphone className="h-4 w-4" /> Mobile & Offline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Install as App</p>
                <p className="text-xs text-muted-foreground">Add InduCycle Hub to your home screen for offline access</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs" onClick={() => toast.info('PWA install prompt would appear here')}>Install</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Offline Mode</p>
                <p className="text-xs text-muted-foreground">Cache data for remote site access</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">InduCycle Hub v2.0 · © 2026 · All rights reserved</p>
        </div>
      </div>
    </AppLayout>
  );
}
