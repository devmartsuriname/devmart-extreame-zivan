# Zivan Template Integration

## Template Information

**Template Name:** Zivan – Creative Agency React Template  
**Version:** 1.0.0  
**Author:** Laralink  
**License:** Envato Elements License (Code: AVWUJHGRFT)  
**Licensee:** Devmart Suriname  
**License Date:** November 10, 2025  
**Envato Item ID:** UKFTCYQ  
**Source URL:** https://elements.envato.com/zivan-creative-agency-react-template-UKFTCYQ

## License Information

This project uses the Zivan Creative Agency React Template under a valid Envato Elements commercial license. The license allows use for the registered project "Dev" by Devmart Suriname.

## File Structure Overview

```
├── src/
│   ├── components/
│   │   ├── About/           # About section components
│   │   ├── Accordion/       # Accordion UI component
│   │   ├── Award/           # Award showcase component
│   │   ├── Brands/          # Brand logos component
│   │   ├── Button/          # Button component
│   │   ├── Card/            # Card components (multiple styles)
│   │   ├── CaseStudy/       # Case study components
│   │   ├── Cta/             # Call-to-action components
│   │   ├── Footer/          # Footer component
│   │   ├── FunFact/         # Fun facts/statistics component
│   │   ├── Header/          # Header/navigation component
│   │   ├── Hero/            # Hero section components
│   │   ├── Hiring/          # Hiring section component
│   │   ├── IconBox/         # Icon box components (multiple styles)
│   │   ├── Layout/          # Layout wrappers
│   │   ├── Marquee/         # Scrolling text component
│   │   ├── Pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ServicePage.jsx
│   │   │   ├── PortfolioPage.jsx
│   │   │   ├── BlogPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── Shop/        # E-commerce pages
│   │   │   └── ...          # Additional pages
│   │   ├── Pagination/      # Pagination component
│   │   ├── Portfolio/       # Portfolio components
│   │   ├── Post/            # Blog post components
│   │   ├── PostGrid/        # Post grid layouts
│   │   ├── PricingTable/    # Pricing table component
│   │   ├── ProgressBar/     # Progress bar component
│   │   ├── Ratings/         # Star ratings component
│   │   ├── SectionHeading/  # Section heading components
│   │   ├── ShopComponents/  # E-commerce components
│   │   ├── Slider/          # Slider/carousel components
│   │   ├── Spacing/         # Spacing utility component
│   │   ├── TeamMember/      # Team member components
│   │   ├── Testimonial/     # Testimonial component
│   │   ├── VideoModal/      # Video modal component
│   │   ├── WhyChose/        # Why choose us section
│   │   └── Widget/          # Sidebar widgets
│   ├── helpers/
│   │   ├── FormateNumber.js # Number formatting utility
│   │   └── PageTitle.js     # Page title helper
│   ├── sass/
│   │   ├── common/          # Common styles
│   │   ├── default/         # Default theme variables
│   │   ├── shortcode/       # Component-specific styles
│   │   ├── dark.scss        # Dark mode styles
│   │   ├── custom.scss      # Custom styles
│   │   └── index.scss       # Main SCSS entry point
│   ├── App.jsx              # Main app component with routing
│   └── index.jsx            # Application entry point
├── public/
│   ├── images/              # Image assets
│   ├── data/                # JSON data files
│   ├── favicon.png
│   └── manifest.json
└── package.json             # Project dependencies
```

## Core Dependencies

### Required Dependencies
- `react` ^18.2.0 - React library
- `react-dom` ^18.2.0 - React DOM renderer
- `react-router-dom` ^6.16.0 - Routing
- `bootstrap` ^5.3.2 - Bootstrap CSS framework
- `sass` ^1.68.0 - SCSS preprocessor
- `swiper` ^10.3.1 - Modern slider library
- `react-slick` ^0.29.0 - Carousel component
- `slick-carousel` ^1.8.1 - Slick carousel
- `@iconify/react` ^4.1.1 - Icon library
- `html-react-parser` ^4.2.2 - HTML parsing
- `axios` ^1.5.1 - HTTP client
- `react-masonry-css` ^1.0.16 - Masonry layout
- `react-parallax` ^3.5.1 - Parallax effects
- `react-text-transition` ^3.1.0 - Text transitions
- `react-water-wave` ^2.0.1 - Water wave effects
- `multi-range-slider-react` ^2.0.5 - Range slider

### Fonts
The template uses Google Fonts:
- **Inter** - Main body font
- **Prompt** - Primary heading font

Font imports are included in the SCSS files.

## Integration Notes

### Build System
The template has been integrated with Vite (instead of Create React App) for improved performance and modern development experience. All original functionality and styling remain intact.

### File Organization
All files from the original Zivan template have been copied with complete structural parity:
- Components maintain their exact structure
- SCSS files preserve original styling
- Assets are in their original locations
- Helper functions remain unchanged

### Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Routes

#### Dark Mode (Default)
- `/` - Home (Tech Startup)
- `/marketing-agency` - Marketing Agency Home
- `/studio-agency` - Studio Agency Home
- `/digital-agency` - Digital Agency Home
- `/about` - About Page
- `/service` - Services Page
- `/service/:serviceDetailsId` - Service Details
- `/blog` - Blog Grid
- `/blog-list` - Blog List
- `/blog/:blogDetailsId` - Blog Details
- `/portfolio` - Portfolio
- `/portfolio/:portfolioDetailsId` - Portfolio Details
- `/case-study-details` - Case Study
- `/team` - Team Page
- `/team/:teamDetailsId` - Team Member Details
- `/contact` - Contact Page
- `/shop` - Shop
- `/shop/:productId` - Product Details
- `/shop/cart` - Shopping Cart
- `/shop/checkout` - Checkout
- `/shop/success` - Order Success
- `/shop/wishlist` - Wishlist

#### Light Mode
All routes above are also available with `/light/` prefix for light theme.

## Verification Checklist

✅ All source files copied from template  
✅ Complete folder hierarchy preserved  
✅ Dependencies installed  
✅ SCSS compilation configured  
✅ Routing structure intact  
✅ Image assets in place  
✅ Helper functions available  
✅ Layout components functional  
✅ Dark/Light mode support maintained  
✅ E-commerce features included  

## Known Configurations

### Dark Mode
The template includes comprehensive dark mode styling. Dark mode is enabled by default on all main routes.

### Responsive Design
The template is fully responsive with breakpoints defined in SCSS:
- Mobile: < 576px
- Tablet: 576px - 991px
- Desktop: 992px - 1750px
- Large Desktop: > 1750px

### Color System
The template uses SCSS variables for theming defined in `sass/default/_color_variable.scss`.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Theme System (November 2025)

**Effective Date:** 2025-11-15  
**Status:** Production Ready

### Implementation
- **ThemeContext:** Global theme state with localStorage persistence
- **Theme Toggle:** Button in header for instant theme switching
- **No Route-Based Themes:** Single set of routes, theme applied via context
- **CSS Implementation:** `.cs_dark` class applied to root based on theme state
- **Persistence:** User preference saved to localStorage (`devmart-theme` key)
- **System Preference:** Falls back to OS theme preference on first visit

### Removed Features
- ❌ `/light/` route prefix
- ❌ Duplicate light mode routes for all pages
- ❌ `darkMode` prop drilling through layouts

### Benefits
- ✅ Instant theme switching without page reload
- ✅ Persisted user preference
- ✅ Single source of truth for theme state
- ✅ Cleaner route structure
- ✅ Better performance (no route navigation for theme change)

## Main Theme Selection

**Primary Homepage:** Creative Agency (Home.jsx)

### Home Variant Consolidation
The Devmart website has been consolidated to use a single homepage:

- ✅ **Active:** Creative Agency
  - Route: `/` (theme-aware via context)
  - Layout: Layout2

- ❌ **Removed:** Tech Startup, Marketing Agency, Studio Agency, Digital Agency

### UI Block Preservation
All 36 UI Blocks from all 5 home variants remain available in `/src/UIBlocks/` for:
- Future custom pages
- Dynamic Page Builder
- Marketing landing pages

### Rationale
1. Simplicity: One main homepage reduces maintenance
2. Flexibility: UI Blocks available for custom page building
3. Performance: Smaller bundle size
4. Clarity: Single source of truth
5. Preparation: Clean structure before backend PRD

### Next Steps
1. Content swap: Replace Zivan demo with Devmart branding
2. Backend PRD: Design dynamic page builder system

## Support & Documentation

For detailed component documentation and usage examples, refer to the original Zivan template documentation included in the template package.

## Integration Completion

**Integration Date:** November 10, 2025  
**Status:** ✅ Complete  
**Build Status:** ✅ Operational  
**Visual Parity:** ✅ 1:1 Match

All files from the Zivan – Creative Agency React Template have been successfully integrated into the repository with complete structural and visual parity to the original template.
