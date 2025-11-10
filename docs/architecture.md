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

### Styling Architecture

#### SCSS Organization
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

---

**Architecture Version:** 1.0  
**Last Updated:** November 10, 2025  
**Template Version:** Zivan 1.0.0
