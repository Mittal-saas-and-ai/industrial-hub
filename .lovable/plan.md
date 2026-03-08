

# InduCycle Hub — Full Platform Build Plan

## Overview
Build a comprehensive B2B industrial marketplace platform with consumables, rentals, auctions, and ecosystem features. This is a large-scale build that will be implemented in phases across multiple iterations. This first implementation covers the complete frontend prototype with mock data, responsive design, and all core screens.

## Design System
- Dark industrial theme as default with light mode toggle
- Primary: Deep blue (#1E3A5F / hsl 210 52% 24%), Accent green for actions (hsl 142 71% 45%)
- Warning orange for auctions, muted grays for backgrounds
- Large imagery cards, professional typography (Inter font)
- Desktop: Sidebar navigation. Mobile: Bottom tab bar
- High-contrast, accessibility-focused

## Architecture

```text
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx          (sidebar + header + bottom tabs)
│   │   ├── DesktopSidebar.tsx
│   │   ├── MobileBottomNav.tsx
│   │   └── ThemeToggle.tsx
│   ├── onboarding/
│   │   ├── SplashScreen.tsx
│   │   ├── WelcomeCarousel.tsx
│   │   ├── RoleSelection.tsx
│   │   ├── BusinessRegistration.tsx
│   │   └── ProfileSetup.tsx
│   ├── dashboard/
│   │   ├── StatsCards.tsx
│   │   ├── FeaturedBanner.tsx
│   │   ├── QuickActions.tsx
│   │   ├── ActivityFeed.tsx
│   │   └── SectorWidgets.tsx
│   ├── marketplace/
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── AISuggestionChips.tsx
│   ├── product/
│   │   ├── ImageCarousel.tsx
│   │   ├── ProductTabs.tsx
│   │   ├── PricingSection.tsx
│   │   └── ActionButtons.tsx
│   ├── rental/
│   │   ├── AvailabilityCalendar.tsx
│   │   ├── PricingBreakdown.tsx
│   │   ├── BundleSuggestions.tsx
│   │   ├── RentalCheckout.tsx
│   │   └── RentalConfirmation.tsx
│   ├── auction/
│   │   ├── CreateAuctionWizard.tsx
│   │   ├── LiveAuctionView.tsx
│   │   ├── BidderDashboard.tsx
│   │   └── AuctionCard.tsx
│   ├── cart/
│   │   ├── CartView.tsx
│   │   ├── RFQBuilder.tsx
│   │   └── OrderHistory.tsx
│   ├── inventory/
│   │   ├── UsageCharts.tsx
│   │   ├── PredictiveAlerts.tsx
│   │   └── SpendAnalytics.tsx
│   └── profile/
│       ├── CompanyDetails.tsx
│       ├── PaymentMethods.tsx
│       └── TeamManagement.tsx
├── pages/
│   ├── Index.tsx (splash/landing)
│   ├── Onboarding.tsx
│   ├── Dashboard.tsx
│   ├── Search.tsx
│   ├── ProductDetail.tsx
│   ├── RentalBooking.tsx
│   ├── Auctions.tsx
│   ├── AuctionDetail.tsx
│   ├── CreateAuction.tsx
│   ├── Cart.tsx
│   ├── Orders.tsx
│   ├── Inventory.tsx
│   ├── Profile.tsx
│   └── Settings.tsx
├── data/
│   └── mockData.ts (products, rentals, auctions, users)
├── types/
│   └── index.ts (all TypeScript interfaces)
└── contexts/
    ├── ThemeContext.tsx
    └── UserContext.tsx
```

## Screens and Features

### 1. Splash + Onboarding (4 screens)
- Animated splash with InduCycle Hub logo and tagline
- Welcome carousel: 4 slides covering Consumables, Rentals, Auctions, Ecosystem with illustrations
- Role selection: Buyer, Seller, Equipment Owner cards with icons
- Business registration form: Company name, GSTIN/PAN, email, phone, document upload areas
- Profile setup: Multi-select sectors (Manufacturing, Construction, Energy, etc.), location picker, payment preferences
- Auto-redirect to dashboard on completion

### 2. Dashboard
- 4 stat cards: Active Rentals, Pending Auctions, Recent Orders value, Saved Items
- Featured deals carousel banner (auto-rotating)
- Quick actions 2x2 grid: Search Consumables, Browse Rentals, Start Auction, My Inventory
- Recent activity feed with icons and timestamps
- Sector-specific widget area based on user profile

### 3. Search and Discovery
- Sticky search bar with filter icon
- Filter panel: Category, Brand, Specs, Location, Price range slider, Condition (New/Refurbished/Used), Availability
- Desktop: sidebar filters. Mobile: bottom sheet modal
- Grid/list view toggle
- Product cards: image, title, key specs, price/rate, supplier rating stars, quick action buttons
- AI suggestion chips row (mock)
- Saved searches section

### 4. Product Detail
- Hero image carousel with thumbnails
- Tabbed content: Overview (specs table, compatibility), Pricing (dynamic rates, bulk discounts table), Documents (certificates list), Reviews (star ratings + comments), Related Items (horizontal scroll)
- Sticky action bar: Rent Now (green), Buy, Bid, Add to RFQ, Chat with Supplier
- Sustainability badge for refurbished items

### 5. Rental Booking Flow
- Step indicator (1-4)
- Step 1: Date range calendar picker + location selector
- Step 2: Pricing breakdown card (daily/weekly, deposit, insurance toggle, taxes)
- Step 3: Bundle suggestions carousel
- Step 4: Checkout — delivery/pickup toggle, payment summary, digital contract checkbox
- Confirmation: Success animation, order ID, tracking link, telematics prompt

### 6. Auction System
- Auction listing page with cards (image, title, current bid, time remaining, bid count)
- Create Auction wizard (4 steps): Upload images, lot details, pricing rules, preview and publish
- Live auction view: Real-time bid feed (mock), countdown timer, current highest bid, place bid with quick increment buttons
- Bidder dashboard: tabs for Watchlist, My Bids, Won, Lost

### 7. Cart / RFQ / Orders
- Multi-item cart with quantity editors, coupon input, running total
- RFQ builder: select items, add notes per item, send to suppliers button
- Order history with tabs: Pending, Active Rentals, Completed, Invoices

### 8. Inventory and Analytics (Premium)
- Usage charts (recharts): Rental utilization %, consumable consumption trends
- Predictive alerts cards: "Reorder bearings — stock low"
- Spend analytics: By sector/project pie chart, ROI comparison bar chart

### 9. Profile and Settings
- Company details form (editable)
- Payment methods list with add/remove
- Notification preferences toggles
- Team management: invite members, role assignment
- Sustainability report download button
- Dark/light theme toggle

### 10. Sector-Specific Features
- Manufacturing: Compatibility checker component, bulk RFQ templates
- Construction: Project mode with timeline, site delivery map placeholder
- Energy/Mining: Certification filter badges, inspection report viewer
- Renewable: Green filters, carbon savings calculator widget
- Data Centers: Power/cooling compatibility tool
- Semiconductor: Cleanroom spec filters, ESD badges
- EV/Battery: High-voltage connector filters, safety compliance highlights

## Technical Approach
- All data from comprehensive mock data file with realistic industrial products
- React Router for all navigation with protected route patterns
- next-themes for dark/light mode
- recharts for all analytics charts
- Responsive: Tailwind breakpoints, mobile-first
- Bottom tab bar on mobile (Dashboard, Search, Auctions, Cart, Profile)
- Desktop sidebar with collapsible groups
- All forms use react-hook-form + zod validation
- Toast notifications via sonner for all actions

## Implementation Order
Since this is very large, implementation will proceed screen by screen:
1. Theme system + layout (sidebar, bottom nav, header)
2. Mock data + types
3. Onboarding flow
4. Dashboard
5. Search and product listing
6. Product detail
7. Rental booking flow
8. Auction system
9. Cart / RFQ / Orders
10. Inventory analytics
11. Profile and settings
12. Sector-specific features

