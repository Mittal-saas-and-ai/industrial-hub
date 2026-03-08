import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/contexts/UserContext';
import { Building2, Mail, Phone, MapPin, Shield, Users, CreditCard, Download, Leaf, Edit } from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-2xl font-bold text-primary-foreground">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.company.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-[10px] capitalize">{user.role.replace('_', ' ')}</Badge>
              {user.verified && <Badge className="bg-accent text-accent-foreground text-[10px] gap-1"><Shield className="h-3 w-3" /> Verified</Badge>}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Company Details */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><Building2 className="h-4 w-4" /> Company Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label className="text-xs">Company Name</Label>
                <Input defaultValue={user.company.name} className="text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs">GSTIN</Label>
                  <Input defaultValue={user.company.gstin} className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">PAN</Label>
                  <Input defaultValue={user.company.pan} className="text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Address</Label>
                <Input defaultValue={`${user.company.address}, ${user.company.city}, ${user.company.state}`} className="text-sm" />
              </div>
              <Button size="sm" className="text-xs" onClick={() => toast.success('Company details updated')}><Edit className="mr-1 h-3 w-3" /> Save Changes</Button>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><Mail className="h-4 w-4" /> Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label className="text-xs">Email</Label>
                <Input defaultValue={user.email} className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Phone</Label>
                <Input defaultValue={user.phone} className="text-sm" />
              </div>
              <Separator />
              <div>
                <Label className="text-xs mb-2 block">Sectors</Label>
                <div className="flex flex-wrap gap-2">
                  {user.sectors.map(s => <Badge key={s} variant="outline" className="text-xs capitalize">{s.replace('_', ' ')}</Badge>)}
                </div>
              </div>
              <Button size="sm" className="text-xs" onClick={() => toast.success('Contact info updated')}><Edit className="mr-1 h-3 w-3" /> Save Changes</Button>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><CreditCard className="h-4 w-4" /> Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Bank Transfer (NEFT/RTGS)</p>
                    <p className="text-xs text-muted-foreground">Primary · HDFC Bank ****4521</p>
                  </div>
                </div>
                <Badge className="text-[10px]">Default</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Credit Terms (Net 30)</p>
                    <p className="text-xs text-muted-foreground">Limit: ₹50,00,000 · Used: ₹12,80,000</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px]">Active</Badge>
              </div>
              <Button variant="outline" size="sm" className="text-xs">+ Add Payment Method</Button>
            </CardContent>
          </Card>

          {/* Team & Sustainability */}
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4" /> Team Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">Admin</p>
                  </div>
                  <Badge className="text-[10px]">Owner</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Priya Deshmukh</p>
                    <p className="text-xs text-muted-foreground">Procurement Manager</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">Member</Badge>
                </div>
                <Button variant="outline" size="sm" className="text-xs">+ Invite Team Member</Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 border-accent/20 bg-accent/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-accent"><Leaf className="h-4 w-4" /> Sustainability Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">Track your environmental impact through refurbished equipment and eco-certified consumables.</p>
                <div className="grid grid-cols-2 gap-3 text-center mb-3">
                  <div className="p-2 rounded-lg bg-background">
                    <p className="text-lg font-bold text-accent">2.4t</p>
                    <p className="text-[10px] text-muted-foreground">CO₂ Saved</p>
                  </div>
                  <div className="p-2 rounded-lg bg-background">
                    <p className="text-lg font-bold text-accent">3</p>
                    <p className="text-[10px] text-muted-foreground">Refurbished Items</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs"><Download className="mr-1 h-3 w-3" /> Download Full Report</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
