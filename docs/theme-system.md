# Theme System Documentation

## Overview
The Devmart website uses a context-based theme system with localStorage persistence and instant switching between light and dark modes.

## Architecture

### ThemeContext (`/src/contexts/ThemeContext.jsx`)
Central theme management using React Context API.

**State:**
- `theme`: `'dark'` | `'light'`

**Methods:**
- `toggleTheme()`: Switch between themes

**Persistence:**
- Saved to `localStorage` with key `devmart-theme`
- Syncs across tabs/windows
- Persists between sessions

**Initialization:**
1. Check localStorage for saved preference
2. If none, check system preference (`prefers-color-scheme`)
3. Default to `'light'` if neither available

### Theme Application
Theme is applied by adding/removing `.cs_dark` class to root div in layouts.

**Layout2.jsx (Homepage):**
```jsx
const { theme } = useTheme();
<div className={theme === 'dark' ? 'cs_dark' : ''}>
```

### Theme Toggle Button
Located in Header component (`/src/components/Header/index.jsx`).

**Features:**
- Icon changes: Sun (in dark mode) / Moon (in light mode)
- Smooth transition animations
- Accessible (aria-label)
- Hover effects

**Styling:**
- File: `/src/sass/common/_theme_toggle.scss`
- Circular button with border
- Adapts to current theme colors

## SCSS Structure

### Dark Mode Styles
**File:** `/src/sass/_dark.scss`

All styles prefixed with `.cs_dark`:
```scss
.cs_dark {
  color: #a3a3a3;
  background-color: #171717;
  
  h1, h2, h3, h4, h5, h6 {
    color: #fff;
  }
  // ... more styles
}
```

### Color Variables
**File:** `/src/sass/default/_color_variable.scss`

```scss
$white: #ffffff;
$black: #000;
$primary: #121212;
$secondary: #4f4747;
$ternary: #b7b7b7;
$border: #dddddd;
$gray: #f8f8f8;
$gray2: #a3a3a3;
$accent: #fd6219; // Will change for Devmart branding
```

## Usage Guide

### In Components
```jsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### In Layouts
```jsx
import { useTheme } from '../../contexts/ThemeContext';

export default function Layout() {
  const { theme } = useTheme();
  
  return (
    <div className={theme === 'dark' ? 'cs_dark' : ''}>
      <Header logoUrl={theme === 'dark' ? '/logo_white.svg' : '/logo.svg'} />
      <Outlet />
      <Footer />
    </div>
  );
}
```

## Migration Notes

### What Changed
- ✅ Removed `/light/` route prefix
- ✅ Removed `darkMode` prop from layouts
- ✅ Added ThemeContext
- ✅ Added theme toggle button
- ✅ localStorage persistence

### What Stayed
- ✅ SCSS structure unchanged
- ✅ `.cs_dark` class approach maintained
- ✅ All dark mode styles in `_dark.scss`
- ✅ Color variables in `_color_variable.scss`

## Future Enhancements

### Planned for Content Swap Phase
- Update `$accent` color to Devmart brand color
- Replace logos with Devmart branding
- Update color scheme if needed

### Possible Future Features
- Scheduled theme switching (auto dark at night)
- Multiple theme variants (not just light/dark)
- Theme-specific imagery (different hero images per theme)
- CSS custom properties for dynamic colors

## Troubleshooting

### Theme not persisting
- Check browser localStorage
- Ensure `ThemeProvider` wraps entire app in `index.jsx`

### Styles not applying
- Verify `.cs_dark` class is on root div
- Check if `_dark.scss` is imported in `index.scss`

### Toggle button not working
- Verify `useTheme` hook is called inside `ThemeProvider`
- Check console for context errors
