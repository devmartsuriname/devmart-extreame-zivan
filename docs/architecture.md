# Project Architecture

## Overview

This project is built using the **Zivan – Creative Agency React Template** with a modern React architecture using Vite as the build tool.

## Technology Stack

### Core Technologies
- **React 18.2** - UI library
- **React Router DOM 6.16** - Client-side routing
- **Vite 5.x** - Build tool and dev server
- **SCSS/Sass** - CSS preprocessing

### UI Libraries
- **Bootstrap 5.3.2** - CSS framework
- **Swiper 10.3.1** - Touch slider
- **React Slick** - Carousel component
- **Iconify React** - Icon system

### Utility Libraries
- **Axios** - HTTP client
- **HTML React Parser** - HTML string parsing
- **React Parallax** - Parallax scrolling effects
- **React Masonry CSS** - Masonry grid layouts

## Project Structure

```
devmart-extreame-zivan/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Layout/      # Layout wrappers (Header, Footer)
│   │   ├── Pages/       # Page-level components
│   │   └── [Others]/    # Feature-specific components
│   ├── helpers/         # Utility functions
│   ├── sass/            # SCSS stylesheets
│   │   ├── common/      # Common styles
│   │   ├── default/     # Theme variables
│   │   ├── shortcode/   # Component styles
│   │   └── index.scss   # Main entry point
│   ├── App.jsx          # Main app with routing
│   └── index.jsx        # Application entry point
├── public/
│   ├── images/          # Static image assets
│   ├── data/            # JSON data files
│   └── [assets]/        # Other static assets
├── docs/                # Project documentation
├── vite.config.js       # Vite configuration
├── index.html           # HTML template
└── package.json         # Dependencies and scripts
```

## Architecture Patterns

### Component Organization

#### Layout Components
- **Header** - Navigation, logo, mobile menu
- **Footer** - Footer content, social links
- **Layout/Layout2/Layout3** - Different layout wrappers for various page types

#### Page Components
Page components are organized in `src/components/Pages/`:
- Each page is a self-contained component
- Pages compose smaller reusable components
- Pages handle their own data and state

#### Reusable Components
Organized by feature/function:
- **UI Components**: Button, Card, Accordion, etc.
- **Content Components**: Post, Portfolio, TeamMember, etc.
- **Section Components**: Hero, About, Services, etc.
- **Utility Components**: Spacing, VideoModal, etc.

### Routing Architecture

The application uses React Router v6 with nested routes:

```javascript
<Routes>
  {/* Dark Mode Routes */}
  <Route path="/" element={<Layout darkMode />}>
    <Route path="about" element={<AboutPage darkMode />} />
    <Route path="service" element={<ServicePage />} />
    {/* ... */}
  </Route>
  
  {/* Tech Startup Route */}
  <Route path="/" element={<Layout2 darkMode />}>
    <Route index element={<Home />} />
  </Route>
  
  {/* E-commerce Routes */}
  <Route path="/" element={<Layout3 darkMode />}>
    <Route path="shop" element={<Shop />} />
    {/* ... */}
  </Route>
  
  {/* Light Mode Routes */}
  <Route path="/light/" element={<Layout />}>
    {/* Mirror of dark mode routes */}
  </Route>
</Routes>
```

### Component Organization

The template uses SCSS modules for styling, which are organized into:
- `default/` - Base styles and variables
- `common/` - Shared components (header, footer, theme toggle, etc.)
- `shortcode/` - Reusable content blocks
- Individual component styles

## Theme System Architecture

### Context-Based Theme Management
The application uses React Context API for global theme state management:

**Location:** `/src/contexts/ThemeContext.jsx`

**Features:**
- Theme state (`'dark'` | `'light'`)
- `toggleTheme()` function
- localStorage persistence (`devmart-theme` key)
- System preference detection

**Usage:**
```jsx
import { useTheme } from '@/contexts/ThemeContext';

function Component() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}
```

### CSS Implementation
Dark theme styles are applied via `.cs_dark` class on root element:
- **Dark mode:** `<div className="cs_dark">...</div>`
- **Light mode:** `<div>...</div>` (no class)

All dark mode styles located in `/src/sass/_dark.scss`.

### Post-Consolidation Route Structure (November 2025)

The application has been simplified to use a single homepage variant:

**Active Homepage:**
- Creative Agency (Home.jsx) at `/`

**Removed Variants:**
- TechStartupPage, MarketingAgencyPage, StudioAgencyPage, DigitalAgencyPage

**Route Structure:**
Single set of routes with theme applied globally:
- `/` - Homepage
- `/about` - About page
- `/service` - Services
- `/portfolio` - Portfolio
- `/blog` - Blog
- `/team` - Team
- `/contact` - Contact
- `/shop/*` - E-commerce pages

No more `/light/` prefix routes. Theme handled by context.
```
sass/
├── default/
│   ├── _color_variable.scss   # Color palette
│   └── _typography.scss       # Font definitions
├── common/
│   ├── _general.scss         # Base styles
│   ├── _header.scss          # Header styles
│   ├── _footer.scss          # Footer styles
│   ├── _spacing.scss         # Spacing utilities
│   └── ...
├── shortcode/
│   ├── _hero.scss            # Hero section styles
│   ├── _iconbox.scss         # Icon box styles
│   ├── _portfolio.scss       # Portfolio styles
│   └── ...
├── _dark.scss                # Dark mode overrides
├── _custom.scss              # Custom modifications
└── index.scss                # Main import file
```

#### Theming System
- SCSS variables for colors, fonts, spacing
- Dark mode implemented via `.cs_dark` class
- Responsive breakpoints defined globally
- Utility classes for common patterns

### State Management

The template uses React's built-in state management:
- **Local State**: `useState` for component-level state
- **URL State**: React Router for navigation state
- **Prop Drilling**: For passing data between components
- No global state management library (Redux, Zustand, etc.)

### Data Management

#### Static Data
- JSON files in `public/data/` directory
- Loaded via Axios on component mount
- Cached in component state

#### Dynamic Routes
- URL parameters for detail pages (`/:id`)
- Route data passed via React Router

## Build Configuration

### Vite Configuration
```javascript
{
  server: {
    host: "::",
    port: 8080
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: { /* SCSS config */ }
    }
  }
}
```

### Development
- Hot Module Replacement (HMR)
- Fast refresh for React components
- SCSS compilation on the fly
- Port 8080 for dev server

### Production Build
- Optimized bundles
- Code splitting by route
- Asset optimization
- CSS extraction and minification

## Performance Considerations

### Code Splitting
- Route-based splitting via React Router
- Lazy loading for heavy components
- Dynamic imports for modals

### Asset Optimization
- Image optimization via public folder
- SVG for icons (Iconify)
- Web fonts loaded asynchronously

### Carousel Libraries
- Swiper for modern, touch-enabled sliders
- React Slick for traditional carousels
- Conditional rendering for performance

## Browser Support

Based on Browserslist configuration:
- **Production**: >0.2%, not dead, not op_mini all
- **Development**: last 1 chrome/firefox/safari version

## Accessibility

The template includes:
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus management for modals

## Integration with Zivan Template

### Original Template Structure
The Zivan template was originally built for Create React App (react-scripts). This integration maintains 100% visual and structural parity while adapting to use Vite for improved performance.

### Key Adaptations
1. **Build Tool**: Migrated from react-scripts to Vite
2. **Entry Point**: Updated for Vite's module system
3. **Asset Loading**: Configured for Vite's public directory handling
4. **SCSS Processing**: Integrated with Vite's CSS pipeline

### Maintained Elements
- ✅ All components exactly as in original template
- ✅ Complete SCSS styling system
- ✅ All helper functions and utilities
- ✅ Routing structure and page organization
- ✅ Image assets and data files
- ✅ Dark/Light mode functionality
- ✅ Responsive design system

## Pages Module Architecture (Sprint 2 - Implemented)

### Overview
The Pages Module introduces dynamic page management with a composable UI block system. Pages are stored in Supabase and rendered dynamically from reusable UI blocks.

### Data Flow

```mermaid
sequenceDiagram
    participant Admin
    participant PageForm
    participant Supabase
    participant DynamicPage
    participant BlockRegistry
    participant UIBlock
    participant User

    Admin->>PageForm: Create/Edit Page
    PageForm->>Supabase: Save page metadata
    Supabase-->>PageForm: Confirm save
    PageForm->>Admin: Show success message
    
    User->>DynamicPage: Visit /:slug
    DynamicPage->>Supabase: Fetch page + sections
    Supabase-->>DynamicPage: Return page data
    DynamicPage->>DynamicPage: Check status & permissions
    DynamicPage->>BlockRegistry: Load block components
    BlockRegistry-->>DynamicPage: Return components
    DynamicPage->>UIBlock: Render blocks with props
    UIBlock-->>User: Display page content
```

### Component Structure

```
src/
├── pages/
│   ├── Admin/
│   │   └── Pages/
│   │       ├── PagesList.jsx       # Page management dashboard
│   │       └── PageForm.jsx        # Create/Edit page form
│   └── DynamicPage.jsx             # Public page renderer
├── UIBlocks/                        # 36 reusable UI blocks
│   ├── Hero/                       # 5 hero variants
│   ├── About/                      # 4 about variants
│   ├── Services/                   # 3 service variants
│   ├── Blog/                       # 3 blog variants
│   └── [14 more categories]/
└── utils/
    └── blockRegistry.js            # Dynamic block loader
```

### Key Features

#### 1. Dynamic Routing
- `/:slug` route matches any page slug
- Falls through static routes first
- 404 for non-existent pages

#### 2. Block System
- 36 UI blocks across 18 categories
- Dynamic imports via blockRegistry
- Component caching for performance
- Props stored as JSONB in database

#### 3. SEO Management
- Dynamic meta tags via react-helmet-async
- Title, description, keywords
- Open Graph images
- Canonical URLs

#### 4. Access Control
- Published pages: Public
- Draft pages: Admin only
- Archived pages: 404 error

#### 5. Layout Support
- Layout (default)
- Layout2 (tech startup)
- Layout3 (e-commerce)

### Database Tables

**pages**
- Stores page metadata (title, slug, SEO)
- Status: draft | published | archived
- Layout configuration
- Timestamps and audit trail

**page_sections**
- Links blocks to pages
- Stores block type and props
- Order index for sequencing
- Active/inactive toggle

### Integration Points

#### With UI Blocks System
- All 36 blocks available for composition
- Blocks remain independent components
- No coupling between blocks
- Props passed from database

#### With Routing System
- Dynamic route `/:slug` at end of route list
- Doesn't override static routes
- Works with nested layouts

#### With Theme System
- Blocks inherit theme context
- Dark/light mode support
- Consistent styling

### Performance Optimizations

1. **Code Splitting**
   - UI blocks loaded on demand
   - Only imports used blocks
   - Reduces initial bundle size

2. **Component Caching**
   - Loaded blocks cached in Map
   - Prevents duplicate imports
   - Faster subsequent renders

3. **Suspense Boundaries**
   - Smooth loading states
   - No flash of unstyled content
   - Progressive enhancement

## Future Considerations

### Potential Enhancements
- Add TypeScript for type safety
- Implement React Query for data fetching
- Add Storybook for component documentation
- Integrate testing framework (Vitest)
- Add CI/CD pipeline

### Scalability
- Component library extraction
- Shared component patterns
- Design system documentation
- Performance monitoring

## Media Library UI Architecture

### Design System
The Media Library uses a comprehensive design system for consistency and theming:

**Spacing System:**
- All spacing uses rem units (base 16px)
- Reduced spacing for better information density
- Consistent gaps: 0.125rem, 0.25rem, 0.375rem, 0.5rem, 0.625rem, 0.75rem
- Card padding: 0.375rem - 0.5rem
- Grid gaps: 0.5rem (mobile) - 0.875rem (large desktop)

**Color Tokens:**
- All colors use HSL design tokens for full dark mode support
- Semantic tokens: `--card`, `--foreground`, `--border`, `--primary`, `--muted`
- No hardcoded colors (text-white, bg-white, etc.)
- Shadow opacities: 0.04 - 0.1 for subtle depth

**Typography Scale:**
- Font sizes range from 0.5625rem to 1.125rem
- Reduced font weights (500 instead of 600) for less visual weight
- Clear hierarchy: filename > metadata > actions
- Responsive scaling on mobile (0.6875rem - 0.75rem)

**Responsive Breakpoints:**
```scss
// Large desktop (1600px+): 180px min cards, 0.875rem gap
// Medium desktop (1200-1599px): 170px min cards
// Small desktop/tablet (768-1199px): 150px min cards, 0.625rem gap
// Mobile (< 768px): 135px min cards, 0.5rem gap
```

### Component Density Strategy

**Grid Layout:**
- Uses CSS Grid with `auto-fill` and `minmax()` for responsive columns
- Card minimum width: 160px (desktop), 135px (mobile)
- Fits 4-6 cards per row on 1920px screens
- Optimized for scanning and information density

**MediaCard Optimization:**
- Thumbnail aspect ratio: 4:3 (instead of 1:1 square)
- Compact info section: 0.375rem padding
- Tighter meta gaps: 0.25rem between items
- Always-visible action buttons (no hover-only UI)
- Top-right checkbox with better visibility

**List View:**
- Grid layout: `56px thumbnail | flex-1 info | auto actions`
- Row padding: 0.375rem 0.5rem
- Compact for maximum items per screen
- No transform on hover for stability

### Interaction Design

**Transitions:**
- Consistent timing: 0.15s ease-out for all interactions
- Subtle hover effects: `translateY(-1px)` instead of `-2px`
- Smooth opacity changes for focus states
- No jarring animations

**Focus States (Accessibility):**
- 2px solid primary color outline
- 1px offset (or -2px inside for buttons)
- Visible keyboard navigation
- Proper ARIA attributes maintained

**Touch Targets:**
- Minimum 44px for accessibility
- Icon buttons: 0.25rem padding
- Action buttons maintain adequate spacing
- Checkbox: 18px × 18px

### Visual Polish

**Shadows:**
- Card base: `0 1px 2px hsl(var(--foreground) / 0.04)`
- Card hover: `0 2px 8px hsl(var(--primary) / 0.08)`
- Usage badge: `0 1px 3px rgba(0, 0, 0, 0.1)`
- Skeleton shimmer animation for loading

**Borders:**
- 1px solid using `hsl(var(--border))`
- Hover: `hsl(var(--primary) / 0.5)`
- Selected: `hsl(var(--primary))`
- Border radius: 6-8px for cards, 3px for checkboxes

**Backgrounds:**
- Card: `hsl(var(--card))`
- Actions bar: `hsl(var(--muted) / 0.3)`
- Hover: subtle primary tint `hsl(var(--primary) / 0.05)`

### Performance Considerations

**CSS Optimizations:**
- Uses HSL color space for better browser performance
- Transition timing optimized (0.15s instead of 0.2s)
- No expensive transforms in list view
- Skeleton loaders prevent layout shift

**Information Density:**
- 30-40% more cards visible per screen vs original
- Reduced padding and gaps throughout
- Smaller font sizes with maintained readability
- Responsive typography scales down on mobile

### Accessibility Features

- Semantic HTML structure maintained
- Proper focus indicators (2px primary outline)
- Keyboard navigation support
- ARIA attributes for screen readers
- Touch targets meet 44px minimum
- High contrast ratios for text

## Media Picker Architecture (Phase 1E)

### Component Hierarchy

```
MediaPicker (form field component)
├── Preview/Placeholder
├── Select/Change/Remove buttons
└── MediaPickerModal
    ├── Sidebar (FolderManager)
    ├── Main Content Area
    │   ├── Toolbar (Search + Upload)
    │   ├── File Type Tabs
    │   ├── View Toggle (Grid/List)
    │   ├── MediaGrid
    │   │   └── MediaCard (selectable)
    │   └── Pagination
    └── UploadModal (with defaultFolder)
```

### State Management

**MediaPicker:** Stores `{selectedMedia, isModalOpen, isTracking}`  
**MediaPickerModal:** Manages `{selectedIds, searchTerm, selectedFolder, fileTypeFilter, viewMode, page, showUpload}`

### Usage Tracking

Uses existing hooks (`useTrackMediaUsage`, `useUntrackMediaUsage`) with `usageKey` pattern: `{module}:{itemKey}` (e.g., "pages:home", "settings:logo_light")

### Design Tokens

All components use HSL tokens: `hsl(var(--card))`, `hsl(var(--border))`, `hsl(var(--primary))`, etc. for full dark mode support.

---

**Architecture Version:** 1.0  
**Last Updated:** November 17, 2025  
**Template Version:** Zivan 1.0.0
