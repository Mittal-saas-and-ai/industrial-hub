import { useState, useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { VoiceSearch } from '@/components/search/VoiceSearch';
import { products, categories, sectors, formatCurrency } from '@/data/mockData';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter, Grid3X3, List, Star, MapPin, Leaf, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const aiSuggestions = [
  'Compatible hoses for CAT 320',
  'Biodegradable lubricants',
  'Solar installation equipment',
  'ESD-safe cleanroom supplies',
  'Backup generators 500kVA+',
];

function FilterPanel({ category, setCategory, condition, setCondition, priceRange, setPriceRange, location, setLocation }: any) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-medium mb-2 block">Category</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="text-xs"><SelectValue placeholder="All Categories" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-xs font-medium mb-2 block">Condition</label>
        <Select value={condition} onValueChange={setCondition}>
          <SelectTrigger className="text-xs"><SelectValue placeholder="Any Condition" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Condition</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="refurbished">Refurbished</SelectItem>
            <SelectItem value="used">Used</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-xs font-medium mb-2 block">Max Price: {formatCurrency(priceRange[0])}</label>
        <Slider value={priceRange} onValueChange={setPriceRange} max={50000000} step={100000} className="mt-2" />
      </div>
      <div>
        <label className="text-xs font-medium mb-2 block">Location</label>
        <Input placeholder="City or state..." value={location} onChange={e => setLocation(e.target.value)} className="text-xs" />
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [condition, setCondition] = useState('all');
  const [priceRange, setPriceRange] = useState([50000000]);
  const [location, setLocation] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (query && !p.title.toLowerCase().includes(query.toLowerCase()) && !p.brand.toLowerCase().includes(query.toLowerCase())) return false;
      if (category !== 'all' && p.category !== category) return false;
      if (condition !== 'all' && p.condition !== condition) return false;
      if (p.price > priceRange[0]) return false;
      if (location && !p.location.toLowerCase().includes(location.toLowerCase())) return false;
      const sector = searchParams.get('sector');
      if (sector && !p.sector.includes(sector as any)) return false;
      return true;
    });
  }, [query, category, condition, priceRange, location, searchParams]);

  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search equipment, parts, consumables..." value={query} onChange={e => setQuery(e.target.value)} className="pl-10" />
          </div>
          <VoiceSearch onResult={(transcript) => setQuery(transcript)} />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden"><Filter className="h-4 w-4" /></Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh]">
              <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
              <div className="p-4">
                <FilterPanel {...{ category, setCategory, condition, setCondition, priceRange, setPriceRange, location, setLocation }} />
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden md:flex gap-1">
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}><Grid3X3 className="h-4 w-4" /></Button>
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}><List className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          <Sparkles className="h-4 w-4 text-warning shrink-0 mt-1" />
          {aiSuggestions.map((s, i) => (
            <Badge key={i} variant="outline" className="cursor-pointer hover:bg-primary/10 whitespace-nowrap text-xs shrink-0" onClick={() => setQuery(s)}>
              {s}
            </Badge>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters */}
          <div className="hidden md:block w-60 shrink-0">
            <Card className="sticky top-20 border-border/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-4">Filters</h3>
                <FilterPanel {...{ category, setCategory, condition, setCondition, priceRange, setPriceRange, location, setLocation }} />
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-3">{filtered.length} results found</p>
            <div className={cn(viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3')}>
              {filtered.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <Card className={cn(
                    'overflow-hidden border-border/50 hover:shadow-industrial transition-all group cursor-pointer',
                    viewMode === 'list' && 'flex'
                  )}>
                    <div className={cn('relative overflow-hidden bg-muted', viewMode === 'grid' ? 'aspect-[4/3]' : 'w-32 shrink-0')}>
                      <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      {product.sustainability && (
                        <Badge className="absolute top-2 left-2 bg-accent/90 text-accent-foreground text-[10px] gap-1">
                          <Leaf className="h-3 w-3" /> Eco
                        </Badge>
                      )}
                      <Badge className="absolute top-2 right-2 text-[10px]" variant="secondary">{product.condition}</Badge>
                    </div>
                    <CardContent className="p-3">
                      <p className="text-xs text-muted-foreground">{product.brand} · {product.category}</p>
                      <h3 className="font-semibold text-sm mt-1 line-clamp-2 group-hover:text-primary transition-colors">{product.title}</h3>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="h-3 w-3 fill-warning text-warning" />
                        <span className="text-xs font-medium">{product.supplierRating}</span>
                        <span className="text-[10px] text-muted-foreground ml-1">· {product.supplierName}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">{product.location}</span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <p className="font-bold text-sm">{formatCurrency(product.price)}</p>
                          {product.rentalRate && (
                            <p className="text-[10px] text-accent font-medium">Rent: {formatCurrency(product.rentalRate.daily)}/day</p>
                          )}
                        </div>
                        <Button size="sm" variant="outline" className="text-xs h-7">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <SearchIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
