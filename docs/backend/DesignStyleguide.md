# Devmart Backend - Design Styleguide

**Version:** 1.0.0  
**Last Updated:** 2025-11-15

---

## 1. Design Philosophy

The Devmart admin panel reuses the existing **Zivan SCSS design system** to maintain visual consistency between the frontend and backend. This approach:

- Reduces development time
- Ensures brand consistency
- Leverages proven design patterns
- Minimizes CSS bloat

**Key Principle:** Admin UI should feel professional and familiar, not like a separate application.

---

## 2. Color Palette

### 2.1 Reusing Zivan Variables

All admin components use the existing color variables from `src/sass/default/_color_variable.scss`:

```scss
// From Zivan template
$white: #ffffff;
$black: #000;
$primary: #121212;   // Dark gray/black
$secondary: #4f4747; // Medium gray
$ternary: #b7b7b7;   // Light gray
$border: #dddddd;    // Border color
$gray: #f8f8f8;      // Background gray
$gray2: #a3a3a3;     // Secondary gray
$accent: #fd6219;    // Orange accent
```

### 2.2 Admin-Specific Color Usage

| Element | Color Variable | Usage |
|---------|---------------|-------|
| Sidebar background | `$primary` | Dark sidebar for contrast |
| Sidebar text | `$white` | High contrast on dark background |
| Content background | `$white` | Clean workspace |
| Top bar background | `$white` | Consistent with content |
| Top bar border | `$border` | Subtle separation |
| Primary buttons | `$accent` | Call-to-action |
| Secondary buttons | `$secondary` | Less prominent actions |
| Success state | `#10b981` (green) | Confirmation messages |
| Error state | `#ef4444` (red) | Error messages |
| Warning state | `#f59e0b` (amber) | Warning messages |
| Info state | `$accent` | Information messages |
| Table headers | `$gray` | Subtle background |
| Hover states | `rgba($accent, 0.1)` | Interactive feedback |
| Selected items | `rgba($accent, 0.2)` | Active selection |
| Disabled elements | `$ternary` | Non-interactive state |

### 2.3 Dark Mode Support

Admin panel supports dark mode using Zivan's existing `.cs_dark` class:

```scss
// Dark mode overrides for admin
.cs_dark {
  .admin-content {
    background-color: #1a1a1a;
    color: $white;
  }
  
  .admin-card {
    background-color: #2a2a2a;
    border-color: #3a3a3a;
  }
  
  .admin-table {
    background-color: #2a2a2a;
    
    thead {
      background-color: #333333;
    }
    
    tbody tr:hover {
      background-color: #333333;
    }
  }
}
```

---

## 3. Typography

### 3.1 Font Families

Reuse Zivan's typography system:

```scss
// Primary font (Inter) for UI elements
$primary-font: 'Inter', sans-serif;

// Secondary font (Prompt) for headings
$secondary-font: 'Prompt', sans-serif;
```

### 3.2 Typography Scale

| Element | Font Family | Size | Weight | Usage |
|---------|-------------|------|--------|-------|
| Page titles | Prompt | 28px | 600 | Main page headings |
| Section headers | Prompt | 22px | 600 | Card/section titles |
| Subsection headers | Inter | 18px | 600 | Smaller headings |
| Body text | Inter | 15px | 400 | Paragraphs, labels |
| Small text | Inter | 13px | 400 | Help text, captions |
| Buttons | Inter | 15px | 500 | Call-to-action |
| Nav links | Inter | 14px | 500 | Sidebar navigation |
| Table headers | Inter | 13px | 600 | Column headers |
| Table cells | Inter | 14px | 400 | Data cells |

### 3.3 Line Height

```scss
// Tight for headings
$line-height-tight: 1.2;

// Normal for body text
$line-height-normal: 1.6;

// Loose for forms
$line-height-loose: 1.8;
```

---

## 4. Spacing System

### 4.1 Spacing Scale

Use Zivan's existing spacing utilities:

```scss
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
$spacing-2xl: 48px;
$spacing-3xl: 64px;
```

### 4.2 Common Spacing Patterns

| Element | Spacing |
|---------|---------|
| Section padding | `$spacing-2xl` (48px) |
| Card padding | `$spacing-lg` (24px) |
| Form field margin | `$spacing-lg` (24px) |
| Button padding | `$spacing-md $spacing-xl` (16px 32px) |
| Icon margin | `$spacing-sm` (8px) |
| List item padding | `$spacing-md` (16px) |
| Table cell padding | `$spacing-md` (16px) |
| Modal padding | `$spacing-2xl` (48px) |

---

## 5. Layout Components

### 5.1 Sidebar

```scss
.admin-sidebar {
  width: 260px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: $primary;
  color: $white;
  overflow-y: auto;
  z-index: 1000;
  
  .sidebar-logo {
    padding: $spacing-lg;
    border-bottom: 1px solid rgba($white, 0.1);
  }
  
  .sidebar-nav {
    padding: $spacing-lg 0;
    
    .nav-item {
      padding: $spacing-md $spacing-lg;
      color: rgba($white, 0.7);
      transition: all 0.2s ease;
      
      &:hover {
        background-color: rgba($white, 0.05);
        color: $white;
      }
      
      &.active {
        background-color: $accent;
        color: $white;
      }
      
      .nav-icon {
        margin-right: $spacing-sm;
        font-size: 20px;
      }
    }
  }
}
```

### 5.2 Top Bar

```scss
.admin-topbar {
  height: 70px;
  position: fixed;
  top: 0;
  left: 260px; // Sidebar width
  right: 0;
  background-color: $white;
  border-bottom: 1px solid $border;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 $spacing-2xl;
  z-index: 999;
  
  .topbar-breadcrumbs {
    font-size: 14px;
    color: $secondary;
  }
  
  .topbar-actions {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    
    .user-menu {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      cursor: pointer;
    }
  }
}
```

### 5.3 Content Area

```scss
.admin-content {
  margin-left: 260px; // Sidebar width
  margin-top: 70px;   // Topbar height
  padding: $spacing-2xl;
  min-height: calc(100vh - 70px);
  background-color: $gray;
}
```

### 5.4 Cards

```scss
.admin-card {
  background-color: $white;
  border: 1px solid $border;
  border-radius: 8px;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  
  .card-header {
    margin-bottom: $spacing-lg;
    padding-bottom: $spacing-md;
    border-bottom: 1px solid $border;
    
    h2 {
      font-family: $secondary-font;
      font-size: 22px;
      font-weight: 600;
      color: $primary;
    }
  }
  
  .card-body {
    // Content
  }
  
  .card-footer {
    margin-top: $spacing-lg;
    padding-top: $spacing-md;
    border-top: 1px solid $border;
    display: flex;
    justify-content: flex-end;
    gap: $spacing-md;
  }
}
```

---

## 6. Form Components

### 6.1 Form Fields

```scss
.form-field {
  margin-bottom: $spacing-lg;
  
  label {
    display: block;
    margin-bottom: $spacing-sm;
    font-weight: 500;
    color: $primary;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: $spacing-md;
    border: 1px solid $border;
    border-radius: 4px;
    font-family: $primary-font;
    font-size: 15px;
    transition: border-color 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: $accent;
      box-shadow: 0 0 0 3px rgba($accent, 0.1);
    }
    
    &.error {
      border-color: #ef4444;
    }
  }
  
  .help-text {
    margin-top: $spacing-xs;
    font-size: 13px;
    color: $secondary;
  }
  
  .error-text {
    margin-top: $spacing-xs;
    font-size: 13px;
    color: #ef4444;
  }
}
```

### 6.2 Buttons

```scss
.btn {
  padding: $spacing-md $spacing-xl;
  border: none;
  border-radius: 4px;
  font-family: $primary-font;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.btn-primary {
    background-color: $accent;
    color: $white;
    
    &:hover {
      background-color: darken($accent, 10%);
    }
  }
  
  &.btn-secondary {
    background-color: $secondary;
    color: $white;
    
    &:hover {
      background-color: darken($secondary, 10%);
    }
  }
  
  &.btn-outline {
    background-color: transparent;
    border: 1px solid $border;
    color: $primary;
    
    &:hover {
      background-color: $gray;
    }
  }
  
  &.btn-danger {
    background-color: #ef4444;
    color: $white;
    
    &:hover {
      background-color: darken(#ef4444, 10%);
    }
  }
  
  &.btn-sm {
    padding: $spacing-sm $spacing-md;
    font-size: 13px;
  }
  
  &.btn-lg {
    padding: $spacing-lg $spacing-2xl;
    font-size: 16px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

---

## 7. Tables

```scss
.admin-table {
  width: 100%;
  background-color: $white;
  border: 1px solid $border;
  border-radius: 8px;
  overflow: hidden;
  
  thead {
    background-color: $gray;
    
    th {
      padding: $spacing-md;
      text-align: left;
      font-weight: 600;
      font-size: 13px;
      color: $primary;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
  
  tbody {
    tr {
      border-top: 1px solid $border;
      transition: background-color 0.2s ease;
      
      &:hover {
        background-color: rgba($accent, 0.05);
      }
      
      td {
        padding: $spacing-md;
        font-size: 14px;
        color: $primary;
      }
    }
  }
}
```

---

## 8. Badges & Status Indicators

```scss
.badge {
  display: inline-block;
  padding: $spacing-xs $spacing-sm;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.badge-success {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  &.badge-warning {
    background-color: #fef3c7;
    color: #92400e;
  }
  
  &.badge-danger {
    background-color: #fee2e2;
    color: #991b1b;
  }
  
  &.badge-info {
    background-color: rgba($accent, 0.1);
    color: darken($accent, 20%);
  }
  
  &.badge-neutral {
    background-color: $gray;
    color: $secondary;
  }
}
```

---

## 9. Modals & Dialogs

```scss
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($black, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  
  .modal-content {
    background-color: $white;
    border-radius: 8px;
    padding: $spacing-2xl;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    
    .modal-header {
      margin-bottom: $spacing-lg;
      
      h2 {
        font-family: $secondary-font;
        font-size: 22px;
        font-weight: 600;
      }
    }
    
    .modal-footer {
      margin-top: $spacing-2xl;
      display: flex;
      justify-content: flex-end;
      gap: $spacing-md;
    }
  }
}
```

---

## 10. Toast Notifications

```scss
.toast {
  position: fixed;
  top: $spacing-2xl;
  right: $spacing-2xl;
  min-width: 300px;
  padding: $spacing-md $spacing-lg;
  background-color: $white;
  border: 1px solid $border;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba($black, 0.1);
  display: flex;
  align-items: center;
  gap: $spacing-md;
  z-index: 10000;
  animation: slideInRight 0.3s ease;
  
  &.toast-success {
    border-left: 4px solid #10b981;
  }
  
  &.toast-error {
    border-left: 4px solid #ef4444;
  }
  
  &.toast-warning {
    border-left: 4px solid #f59e0b;
  }
  
  &.toast-info {
    border-left: 4px solid $accent;
  }
  
  .toast-message {
    flex: 1;
    font-size: 14px;
  }
  
  .toast-close {
    cursor: pointer;
    color: $secondary;
    
    &:hover {
      color: $primary;
    }
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

---

## 11. Responsive Breakpoints

Reuse Zivan's breakpoints:

```scss
$breakpoint-mobile: 576px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 992px;
$breakpoint-large: 1200px;

// Example usage
@media (max-width: $breakpoint-tablet) {
  .admin-sidebar {
    transform: translateX(-100%);
    
    &.open {
      transform: translateX(0);
    }
  }
  
  .admin-content {
    margin-left: 0;
  }
  
  .admin-topbar {
    left: 0;
  }
}
```

---

## 12. Icons

Use **Iconify** (already installed) for all admin icons:

```jsx
import { Icon } from '@iconify/react';

// Common admin icons
<Icon icon="mdi:view-dashboard" />       // Dashboard
<Icon icon="mdi:file-document" />        // Pages
<Icon icon="mdi:post" />                 // Blog
<Icon icon="mdi:briefcase" />            // Portfolio
<Icon icon="mdi:cog" />                  // Settings
<Icon icon="mdi:account-multiple" />     // Users
<Icon icon="mdi:image-multiple" />       // Media
<Icon icon="mdi:menu" />                 // Navigation
<Icon icon="mdi:email" />                // Forms
<Icon icon="mdi:pencil" />               // Edit
<Icon icon="mdi:delete" />               // Delete
<Icon icon="mdi:eye" />                  // View
<Icon icon="mdi:plus" />                 // Add
<Icon icon="mdi:check" />                // Success
<Icon icon="mdi:close" />                // Close
```

---

## 13. Animation & Transitions

```scss
// Standard transition
$transition-standard: all 0.2s ease;

// Fast transition
$transition-fast: all 0.15s ease;

// Slow transition
$transition-slow: all 0.3s ease;

// Apply to interactive elements
button, a, input, select {
  transition: $transition-standard;
}
```

---

## 14. Shadows

```scss
$shadow-sm: 0 1px 3px rgba($black, 0.1);
$shadow-md: 0 4px 6px rgba($black, 0.1);
$shadow-lg: 0 10px 30px rgba($black, 0.15);

// Usage
.admin-card {
  box-shadow: $shadow-sm;
}

.modal-content {
  box-shadow: $shadow-lg;
}
```

---

## 15. Component Reuse Examples

### 15.1 Data Table with Actions

```jsx
<table className="admin-table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Status</th>
      <th>Created</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Homepage</td>
      <td><span className="badge badge-success">Published</span></td>
      <td>2025-11-10</td>
      <td>
        <button className="btn btn-sm btn-outline">
          <Icon icon="mdi:pencil" /> Edit
        </button>
      </td>
    </tr>
  </tbody>
</table>
```

### 15.2 Form with Validation

```jsx
<div className="admin-card">
  <div className="card-header">
    <h2>Create New Page</h2>
  </div>
  <div className="card-body">
    <div className="form-field">
      <label htmlFor="title">Page Title</label>
      <input 
        id="title" 
        type="text" 
        placeholder="Enter page title"
        className={errors.title ? 'error' : ''}
      />
      {errors.title && (
        <p className="error-text">{errors.title}</p>
      )}
    </div>
  </div>
  <div className="card-footer">
    <button className="btn btn-outline">Cancel</button>
    <button className="btn btn-primary">Save Page</button>
  </div>
</div>
```

---

## 16. File Structure

```
src/sass/
├── admin/
│   ├── _layout.scss        # Sidebar, topbar, content
│   ├── _forms.scss         # Form components
│   ├── _tables.scss        # Data tables
│   ├── _cards.scss         # Card components
│   ├── _modals.scss        # Modals & dialogs
│   ├── _buttons.scss       # Button variants
│   ├── _badges.scss        # Status badges
│   ├── _toast.scss         # Toast notifications
│   └── _responsive.scss    # Media queries
└── index.scss              # Import admin styles
```

---

**End of Design Styleguide**
