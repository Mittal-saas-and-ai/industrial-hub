export type UserRole = 'buyer' | 'seller' | 'equipment_owner';

export type Sector = 
  | 'manufacturing' | 'construction' | 'energy_mining' 
  | 'renewable_energy' | 'data_centers' | 'semiconductor' 
  | 'ev_battery' | 'oil_gas' | 'automotive';

export type ProductCondition = 'new' | 'refurbished' | 'used';

export type OrderStatus = 'pending' | 'active' | 'completed' | 'cancelled';

export type AuctionStatus = 'upcoming' | 'live' | 'ended' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  company: Company;
  sectors: Sector[];
  avatarUrl?: string;
  verified: boolean;
  creditLimit?: number;
  createdAt: string;
}

export interface Company {
  name: string;
  gstin?: string;
  pan?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  logo?: string;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  model: string;
  specs: Record<string, string>;
  images: string[];
  condition: ProductCondition;
  price: number;
  rentalRate?: RentalRate;
  supplierId: string;
  supplierName: string;
  supplierRating: number;
  location: string;
  sector: Sector[];
  inStock: boolean;
  quantity: number;
  certifications: string[];
  sustainability: boolean;
  compatibleWith?: string[];
  documents: ProductDocument[];
  reviews: Review[];
  createdAt: string;
}

export interface RentalRate {
  daily: number;
  weekly: number;
  monthly: number;
  deposit: number;
  insurancePerDay: number;
}

export interface ProductDocument {
  id: string;
  name: string;
  type: 'certificate' | 'manual' | 'inspection' | 'warranty';
  url: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  sector: Sector[];
  sellerId: string;
  sellerName: string;
  startingBid: number;
  currentBid: number;
  reservePrice: number;
  bidIncrement: number;
  bidCount: number;
  status: AuctionStatus;
  startTime: string;
  endTime: string;
  location: string;
  condition: ProductCondition;
  certifications: string[];
  bids: Bid[];
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: string;
}

export interface RentalBooking {
  id: string;
  productId: string;
  productTitle: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  dailyRate: number;
  deposit: number;
  insurance: boolean;
  insuranceCost: number;
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  deliveryType: 'delivery' | 'pickup';
  location: string;
  trackingId?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  type: 'buy' | 'rent';
  rentalDays?: number;
}

export interface RFQItem {
  id: string;
  productId: string;
  title: string;
  quantity: number;
  notes: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  invoiceUrl?: string;
  type: 'purchase' | 'rental';
}

export interface Notification {
  id: string;
  type: 'bid' | 'order' | 'rental' | 'alert' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  usageRate: number;
  lastOrdered: string;
  unitPrice: number;
  sector: Sector;
}

export interface SpendData {
  month: string;
  consumables: number;
  rentals: number;
  auctions: number;
}

export interface UsageData {
  month: string;
  utilization: number;
  consumption: number;
}

export interface OnboardingState {
  step: number;
  role?: UserRole;
  company?: Partial<Company>;
  sectors?: Sector[];
  completed: boolean;
}
