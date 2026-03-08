import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { products, formatCurrency, formatCurrencyFull } from '@/data/mockData';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Leaf, Shield, FileText, MessageCircle, ShoppingCart, Truck, Gavel, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useUser();
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Product not found</p>
        </div>
      </AppLayout>
    );
  }

  const relatedProducts = products.filter(p => p.id !== product.id && p.sector.some(s => product.sector.includes(s))).slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: `cart-${Date.now()}`,
      productId: product.id,
      title: product.title,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      type: 'buy',
    });
    toast.success('Added to cart');
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/search" className="hover:text-primary">Search</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-foreground font-medium">{product.title}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Carousel */}
          <div className="space-y-3">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <img src={product.images[currentImage]} alt={product.title} className="w-full h-full object-cover" />
              {product.images.length > 1 && (
                <>
                  <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm" onClick={() => setCurrentImage(i => i > 0 ? i - 1 : product.images.length - 1)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm" onClick={() => setCurrentImage(i => i < product.images.length - 1 ? i + 1 : 0)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              {product.sustainability && (
                <Badge className="absolute top-3 left-3 bg-accent/90 text-accent-foreground gap-1">
                  <Leaf className="h-3 w-3" /> Refurbished · Eco-friendly
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setCurrentImage(i)} className={cn('w-16 h-12 rounded-md overflow-hidden border-2 transition-colors', currentImage === i ? 'border-primary' : 'border-transparent')}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-[10px]">{product.condition}</Badge>
                {product.certifications.map(c => (
                  <Badge key={c} variant="outline" className="text-[10px] gap-1"><Shield className="h-2.5 w-2.5" />{c}</Badge>
                ))}
              </div>
              <h1 className="text-2xl font-bold mt-2">{product.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">{product.brand} · {product.model}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-semibold text-sm">{product.supplierRating}</span>
              </div>
              <span className="text-sm text-muted-foreground">{product.supplierName}</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-sm">{product.location}</span>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-3xl font-bold">{formatCurrencyFull(product.price)}</p>
              {product.rentalRate && (
                <div className="mt-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm font-semibold text-accent">Rental Available</p>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                    <div><span className="text-muted-foreground">Daily</span><p className="font-bold">{formatCurrency(product.rentalRate.daily)}</p></div>
                    <div><span className="text-muted-foreground">Weekly</span><p className="font-bold">{formatCurrency(product.rentalRate.weekly)}</p></div>
                    <div><span className="text-muted-foreground">Monthly</span><p className="font-bold">{formatCurrency(product.rentalRate.monthly)}</p></div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {product.rentalRate && (
                <Button asChild className="gradient-accent text-accent-foreground">
                  <Link to={`/rental/${product.id}`}><Truck className="mr-2 h-4 w-4" /> Rent Now</Link>
                </Button>
              )}
              <Button onClick={handleAddToCart} className="gradient-primary text-primary-foreground">
                <ShoppingCart className="mr-2 h-4 w-4" /> Buy
              </Button>
              <Button variant="outline"><Gavel className="mr-2 h-4 w-4" /> Bid in Auction</Button>
              <Button variant="outline"><ClipboardList className="mr-2 h-4 w-4" /> Add to RFQ</Button>
            </div>
            <Button variant="ghost" className="w-full"><MessageCircle className="mr-2 h-4 w-4" /> Chat with Supplier</Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <h3 className="font-semibold mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between p-2 rounded bg-muted/50 text-xs">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium">{val}</span>
                    </div>
                  ))}
                </div>
                {product.compatibleWith && product.compatibleWith.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Compatible With</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.compatibleWith.map(c => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Pricing Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 rounded bg-muted/50"><span>Unit Price</span><span className="font-bold">{formatCurrencyFull(product.price)}</span></div>
                  <div className="flex justify-between p-2 rounded bg-muted/50"><span>Bulk (10+)</span><span className="font-bold text-accent">{formatCurrencyFull(product.price * 0.9)} (10% off)</span></div>
                  <div className="flex justify-between p-2 rounded bg-muted/50"><span>Bulk (50+)</span><span className="font-bold text-accent">{formatCurrencyFull(product.price * 0.85)} (15% off)</span></div>
                </div>
                {product.rentalRate && (
                  <>
                    <h3 className="font-semibold mt-6 mb-3">Rental Rates</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 rounded bg-muted/50"><span>Daily</span><span className="font-bold">{formatCurrencyFull(product.rentalRate.daily)}</span></div>
                      <div className="flex justify-between p-2 rounded bg-muted/50"><span>Weekly</span><span className="font-bold">{formatCurrencyFull(product.rentalRate.weekly)}</span></div>
                      <div className="flex justify-between p-2 rounded bg-muted/50"><span>Monthly</span><span className="font-bold">{formatCurrencyFull(product.rentalRate.monthly)}</span></div>
                      <div className="flex justify-between p-2 rounded bg-muted/50"><span>Security Deposit</span><span className="font-bold">{formatCurrencyFull(product.rentalRate.deposit)}</span></div>
                      <div className="flex justify-between p-2 rounded bg-muted/50"><span>Insurance (per day)</span><span className="font-bold">{formatCurrencyFull(product.rentalRate.insurancePerDay)}</span></div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-3">
                {product.documents.length > 0 ? product.documents.map(doc => (
                  <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/50">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{doc.type}</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">Download</Button>
                  </div>
                )) : <p className="text-sm text-muted-foreground">No documents available.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-4">
                {product.reviews.length > 0 ? product.reviews.map(review => (
                  <div key={review.id} className="p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn('h-3.5 w-3.5', i < review.rating ? 'fill-warning text-warning' : 'text-muted')} />
                        ))}
                      </div>
                      <span className="text-xs font-medium">{review.userName}</span>
                      <span className="text-[10px] text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                )) : <p className="text-sm text-muted-foreground">No reviews yet.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="related">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <Card className="overflow-hidden border-border/50 hover:shadow-industrial transition-all cursor-pointer">
                    <div className="aspect-[4/3] bg-muted">
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-3">
                      <p className="text-xs font-medium line-clamp-2">{p.title}</p>
                      <p className="text-sm font-bold mt-1">{formatCurrency(p.price)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
