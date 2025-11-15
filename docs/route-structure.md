# Route Structure Documentation

## Active Routes (Post-Consolidation)

### Homepage
- `/` - Creative Agency Homepage (Dark Mode)
- `/light/` - Creative Agency Homepage (Light Mode)

### Content Pages

#### Dark Mode (Default)
- `/about` - About Us
- `/service` - Services Overview
- `/service/:serviceDetailsId` - Service Details (dynamic route)
- `/portfolio` - Portfolio Grid
- `/portfolio/:portfolioDetailsId` - Portfolio Details (dynamic route)
- `/case-study-details` - Case Study Details
- `/blog` - Blog Grid
- `/blog-list` - Blog List View
- `/blog/:blogDetailsId` - Blog Post Details (dynamic route)
- `/team` - Team Overview
- `/team/:teamDetailsId` - Team Member Details (dynamic route)
- `/contact` - Contact Page

#### Light Mode (Same pages under `/light/` prefix)
- `/light/about`
- `/light/service`
- `/light/service/:serviceDetailsId`
- `/light/portfolio`
- `/light/portfolio/:portfolioDetailsId`
- `/light/case-study-details`
- `/light/blog`
- `/light/blog-list`
- `/light/blog/:blogDetailsId`
- `/light/team`
- `/light/team/:teamDetailsId`
- `/light/contact`

### E-commerce (Shop)

#### Dark Mode
- `/shop` - Shop Homepage
- `/shop/:productId` - Product Details (dynamic route)
- `/shop/cart` - Shopping Cart
- `/shop/checkout` - Checkout
- `/shop/success` - Order Success
- `/shop/wishlist` - Wishlist

#### Light Mode
- `/light/shop`
- `/light/shop/:productId`
- `/light/shop/cart`
- `/light/shop/checkout`
- `/light/shop/success`
- `/light/shop/wishlist`

### Error Handling
- `*` (any unmatched route) - 404 Error Page

## Removed Routes (Post-Consolidation)

The following demo homepage routes have been removed as of **November 14, 2025**:

### Removed Dark Mode Routes
- `/tech-startup` ❌
- `/marketing-agency` ❌
- `/studio-agency` ❌
- `/digital-agency` ❌

### Removed Light Mode Routes
- `/light/tech-startup` ❌
- `/light/marketing-agency` ❌
- `/light/studio-agency` ❌
- `/light/digital-agency` ❌

**Note:** Accessing these routes will now display the 404 Error Page.

## Layout Mapping

### Layout (Default Layout)
Used by most content pages:
- About
- Service / Service Details
- Portfolio / Portfolio Details
- Case Study Details
- Blog / Blog List / Blog Details
- Team / Team Details
- Contact

**Features:**
- Standard header with navigation
- Standard footer
- Content area with sidebar support

### Layout2 (Homepage Layout)
Used by homepage:
- `/` (Home - Creative Agency)
- `/light/` (Home - Creative Agency Light)

**Features:**
- Full-width hero section
- No sidebar
- Optimized for landing page experience

### Layout3 (Shop Layout)
Used by e-commerce pages:
- Shop
- Product Details
- Cart
- Checkout
- Success
- Wishlist

**Features:**
- Shopping cart indicator
- Simplified navigation
- E-commerce focused footer

## Internal Link Audit Checklist

After consolidation, verify that no internal navigation links point to removed routes:

### Header/Navigation Menu
- [ ] No links to `/tech-startup`
- [ ] No links to `/marketing-agency`
- [ ] No links to `/studio-agency`
- [ ] No links to `/digital-agency`
- [ ] Homepage link points to `/` (not variant-specific)
- [ ] All content page links valid

### Footer Links
- [ ] Verify all footer links point to active routes
- [ ] Social media links functional
- [ ] Contact information up-to-date

### Home Page (Home.jsx)
- [ ] All CTAs and buttons point to valid routes
- [ ] Portfolio links use `/portfolio` or `/portfolio/:id`
- [ ] Blog links use `/blog` or `/blog/:id`
- [ ] Service links use `/service` or `/service/:id`
- [ ] Contact CTA points to `/contact`

### Other Pages
- [ ] AboutPage.jsx - all links valid
- [ ] ServicePage.jsx - all links valid
- [ ] PortfolioPage.jsx - all links valid
- [ ] BlogPage.jsx - all links valid
- [ ] ContactPage.jsx - all links valid
- [ ] TeamPage.jsx - all links valid

## Dynamic Route Parameters

### Service Details
- **Route:** `/service/:serviceDetailsId`
- **Example:** `/service/web-development`
- **Component:** ServiceDetailsPage
- **Parameter:** `serviceDetailsId` (string)

### Portfolio Details
- **Route:** `/portfolio/:portfolioDetailsId`
- **Example:** `/portfolio/project-alpha`
- **Component:** PortfolioDetailsPage
- **Parameter:** `portfolioDetailsId` (string)

### Blog Details
- **Route:** `/blog/:blogDetailsId`
- **Example:** `/blog/how-to-build-react-app`
- **Component:** BlogDetailsPage
- **Parameter:** `blogDetailsId` (string)

### Team Details
- **Route:** `/team/:teamDetailsId`
- **Example:** `/team/john-doe`
- **Component:** TeamDetailsPage
- **Parameter:** `teamDetailsId` (string)

### Product Details
- **Route:** `/shop/:productId`
- **Example:** `/shop/product-123`
- **Component:** ProductDetails
- **Parameter:** `productId` (string)

## Future Route Planning

Reserved routes for future custom pages (using UI Block composer):

### Marketing Pages
- `/solutions` - Solutions overview page
- `/industries` - Industry-specific landing pages
- `/case-studies` - Case study showcase (different from case-study-details)
- `/pricing` - Pricing page
- `/resources` - Resources hub

### Utility Pages
- `/privacy-policy` - Privacy Policy
- `/terms-of-service` - Terms of Service
- `/sitemap` - HTML Sitemap

### Authentication (Future)
- `/login` - User Login
- `/signup` - User Registration
- `/account` - User Account Dashboard
- `/forgot-password` - Password Recovery

These will be built using the UI Block library after backend CMS integration.

## Route Configuration

### Current App.jsx Structure
```jsx
<Routes>
  {/* Dark Mode Routes */}
  <Route path="/" element={<Layout darkMode />}>
    <Route path="about" element={<AboutPage darkMode />} />
    <Route path="service" element={<ServicePage />} />
    <Route path="service/:serviceDetailsId" element={<ServiceDetailsPage />} />
    <Route path="blog" element={<BlogPage />} />
    <Route path="blog-list" element={<BlogListPage />} />
    <Route path="blog/:blogDetailsId" element={<BlogDetailsPage />} />
    <Route path="portfolio" element={<PortfolioPage />} />
    <Route
      path="portfolio/:portfolioDetailsId"
      element={<PortfolioDetailsPage />}
    />
    <Route path="case-study-details" element={<CaseStudyDetailsPage />} />
    <Route path="team" element={<TeamPage />} />
    <Route path="team/:teamDetailsId" element={<TeamDetailsPage />} />
    <Route path="contact" element={<ContactPage />} />
  </Route>
  
  <Route path="/" element={<Layout2 darkMode />}>
    <Route index element={<Home />} />
  </Route>
  
  <Route path="/" element={<Layout3 darkMode />}>
    <Route path="shop" element={<Shop />} />
    <Route path="shop/:productId" element={<ProductDetails />} />
    <Route path="shop/cart" element={<Cart />} />
    <Route path="shop/checkout" element={<Checkout />} />
    <Route path="shop/success" element={<Success />} />
    <Route path="shop/wishlist" element={<Wishlist />} />
  </Route>

  {/* Light Mode Routes */}
  <Route path="/light/" element={<Layout />}>
    <Route path="about" element={<AboutPage />} />
    <Route path="service" element={<ServicePage />} />
    <Route
      path="service/:serviceDetailsId"
      element={<ServiceDetailsPage />}
    />
    <Route path="blog" element={<BlogPage />} />
    <Route path="blog-list" element={<BlogListPage />} />
    <Route path="blog/:blogDetailsId" element={<BlogDetailsPage />} />
    <Route path="portfolio" element={<PortfolioPage />} />
    <Route
      path="portfolio/:portfolioDetailsId"
      element={<PortfolioDetailsPage />}
    />
    <Route path="case-study-details" element={<CaseStudyDetailsPage />} />
    <Route path="team" element={<TeamPage />} />
    <Route path="team/:teamDetailsId" element={<TeamDetailsPage />} />
    <Route path="contact" element={<ContactPage />} />
  </Route>
  
  <Route path="/light/" element={<Layout2 />}>
    <Route index element={<Home />} />
  </Route>
  
  <Route path="/light/" element={<Layout3 />}>
    <Route path="shop" element={<Shop />} />
    <Route path="shop/:productId" element={<ProductDetails />} />
    <Route path="shop/cart" element={<Cart />} />
    <Route path="shop/checkout" element={<Checkout />} />
    <Route path="shop/success" element={<Success />} />
    <Route path="shop/wishlist" element={<Wishlist />} />
  </Route>

  {/* 404 Error Page */}
  <Route path="*" element={<ErrorPage />} />
</Routes>
```

## Navigation Best Practices

### Link Components
Use React Router's `Link` component for internal navigation:
```jsx
import { Link } from 'react-router-dom';

<Link to="/about">About Us</Link>
<Link to="/service/web-development">Web Development</Link>
```

### Theme Switching
To switch between light/dark modes:
```jsx
// Dark to Light
<Link to="/light/">View Light Mode</Link>

// Light to Dark
<Link to="/">View Dark Mode</Link>

// Maintain current page with theme switch
const currentPath = location.pathname.replace('/light', '');
<Link to={darkMode ? `/light${currentPath}` : currentPath}>
  Toggle Theme
</Link>
```

### External Links
Use standard `<a>` tags for external links:
```jsx
<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">
  External Link
</a>
```

## SEO Considerations

### Page Titles
Each route should have a unique page title:
```jsx
import { pageTitle } from '@/helpers/PageTitle';

export default function AboutPage() {
  pageTitle('About Us - Devmart');
  // ...
}
```

### Meta Tags
Consider adding meta tags for:
- Description
- Keywords
- Open Graph tags (for social sharing)
- Canonical URLs (especially for light/dark variants)

### Sitemap
Generate XML sitemap including:
- All static routes
- Dynamic routes with known IDs
- Priority and change frequency

## Testing Checklist

### Manual Testing
- [ ] Visit each active route
- [ ] Verify page loads correctly
- [ ] Check navigation links work
- [ ] Test theme switching
- [ ] Verify 404 page for removed routes
- [ ] Test dynamic routes with various IDs
- [ ] Check responsive design on all routes

### Automated Testing (Future)
- Route existence tests
- Navigation flow tests
- 404 behavior tests
- Dynamic parameter validation
- Link integrity checks

## Troubleshooting

### Common Issues

**404 on Valid Route:**
- Check route is defined in App.jsx
- Verify component import path
- Ensure route nesting is correct

**Wrong Layout Applied:**
- Check which Layout wrapper contains the route
- Verify layout hierarchy in App.jsx

**Theme Not Applying:**
- Ensure `darkMode` prop passed to Layout
- Check component receives and uses `darkMode`

**Dynamic Route Not Working:**
- Verify parameter name matches in route definition
- Check component uses correct parameter name (useParams)
- Ensure parameter value is valid

### Debug Tips
```jsx
// Log current route
import { useLocation } from 'react-router-dom';

const location = useLocation();
console.log('Current route:', location.pathname);

// Log route params
import { useParams } from 'react-router-dom';

const params = useParams();
console.log('Route params:', params);
```
