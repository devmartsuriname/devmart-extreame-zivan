# Devmart Backend - Admin Layout Specification

**Version:** 1.0.0  
**Last Updated:** 2025-11-15

---

## 1. Overview

The Devmart admin panel uses a **classic dashboard layout** with:
- Fixed sidebar navigation (left)
- Fixed top bar (header)
- Scrollable content area (main)
- Responsive behavior for mobile/tablet

This layout provides a familiar, professional interface for content management.

---

## 2. Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│ Sidebar          │ Top Bar                              │
│ (260px)          │ (Breadcrumbs, Search, User Menu)     │
├─────────────────────────────────────────────────────────┤
│                  │                                       │
│  Navigation      │                                       │
│  • Dashboard     │         Content Area                  │
│  • Pages         │         (Scrollable)                  │
│  • Blog          │                                       │
│  • Portfolio     │                                       │
│  • Services      │                                       │
│  • Team          │                                       │
│  • FAQs          │                                       │
│  • Media         │                                       │
│  • Navigation    │                                       │
│  • Settings      │                                       │
│  • Forms         │                                       │
│  • Users         │                                       │
│                  │                                       │
│                  │                                       │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Component Breakdown

### 3.1 BackendLayout.jsx

**Purpose:** Main layout wrapper for all admin pages

**Props:**
- `children` (ReactNode): Page content
- `breadcrumbs` (Array): Breadcrumb items

**Structure:**
```jsx
<div className="admin-layout">
  <AdminSidebar />
  <div className="admin-main">
    <AdminTopBar breadcrumbs={breadcrumbs} />
    <div className="admin-content">
      {children}
    </div>
  </div>
</div>
```

**File Location:** `src/components/Admin/BackendLayout.jsx`

---

### 3.2 AdminSidebar.jsx

**Purpose:** Left sidebar navigation

**Features:**
- Logo at top
- Navigation menu with icons
- Active state highlighting
- Collapsible on mobile
- User info at bottom (optional)

**Navigation Items:**
```javascript
const navItems = [
  { label: 'Dashboard', icon: 'mdi:view-dashboard', path: '/admin/dashboard' },
  { label: 'Pages', icon: 'mdi:file-document', path: '/admin/pages' },
  { label: 'Blog', icon: 'mdi:post', path: '/admin/blog' },
  { label: 'Portfolio', icon: 'mdi:briefcase', path: '/admin/portfolio' },
  { label: 'Services', icon: 'mdi:cog-outline', path: '/admin/services' },
  { label: 'Team', icon: 'mdi:account-group', path: '/admin/team' },
  { label: 'FAQs', icon: 'mdi:help-circle', path: '/admin/faqs' },
  { label: 'Media', icon: 'mdi:image-multiple', path: '/admin/media' },
  { label: 'Navigation', icon: 'mdi:menu', path: '/admin/navigation' },
  { label: 'Settings', icon: 'mdi:cog', path: '/admin/settings' },
  { label: 'Forms', icon: 'mdi:email-outline', path: '/admin/forms' },
  { label: 'Users', icon: 'mdi:account-multiple', path: '/admin/users', adminOnly: true },
];
```

**ASCII Wireframe:**
```
┌──────────────────────┐
│                      │
│    [LOGO]            │
│                      │
├──────────────────────┤
│                      │
│  □ Dashboard         │
│  □ Pages             │
│  □ Blog              │
│  □ Portfolio         │
│  □ Services          │
│  □ Team              │
│  □ FAQs              │
│  □ Media             │
│  □ Navigation        │
│  □ Settings          │
│  □ Forms             │
│  □ Users             │
│                      │
├──────────────────────┤
│  [User Avatar]       │
│  John Doe            │
│  [Logout]            │
└──────────────────────┘
```

**File Location:** `src/components/Admin/AdminSidebar.jsx`

---

### 3.3 AdminTopBar.jsx

**Purpose:** Top header bar with breadcrumbs and user menu

**Features:**
- Breadcrumbs navigation
- Search bar (optional)
- Theme toggle
- Notifications (future)
- User dropdown menu

**ASCII Wireframe:**
```
┌───────────────────────────────────────────────────────────────┐
│  Home > Pages > Edit                    🔍 Search   🌙 👤▾    │
└───────────────────────────────────────────────────────────────┘
```

**User Menu Items:**
- Profile
- Account Settings
- Logout

**File Location:** `src/components/Admin/AdminTopBar.jsx`

---

### 3.4 AdminBreadcrumbs.jsx

**Purpose:** Show current location in admin panel

**Props:**
- `items` (Array): Breadcrumb items
  ```javascript
  [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Pages', path: '/admin/pages' },
    { label: 'Edit Page', path: null }, // Current page
  ]
  ```

**Example:**
```jsx
<AdminBreadcrumbs
  items={[
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Pages', path: '/admin/pages' },
    { label: 'Create New Page' },
  ]}
/>
```

**File Location:** `src/components/Admin/AdminBreadcrumbs.jsx`

---

## 4. Responsive Behavior

### 4.1 Desktop (> 992px)
- Sidebar: Fixed, 260px width
- Content: Margin-left 260px
- Top bar: Fixed, full width minus sidebar

### 4.2 Tablet (768px - 991px)
- Sidebar: Collapsible, overlay mode
- Hamburger menu button in top bar
- Content: Full width
- Top bar: Full width

### 4.3 Mobile (< 767px)
- Sidebar: Off-canvas, full-screen overlay
- Hamburger menu button in top bar
- Content: Full width, padding reduced
- Top bar: Simplified (logo, hamburger, user icon)

**Responsive SCSS:**
```scss
@media (max-width: 991px) {
  .admin-sidebar {
    position: fixed;
    left: -260px;
    transition: left 0.3s ease;
    z-index: 1001;
    
    &.open {
      left: 0;
      box-shadow: 2px 0 10px rgba(0,0,0,0.3);
    }
  }
  
  .admin-content {
    margin-left: 0;
  }
  
  .admin-topbar {
    left: 0;
    
    .hamburger-btn {
      display: block;
    }
  }
  
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
  }
}
```

---

## 5. Admin Routes Structure

```
/admin
├── /auth
│   ├── /login
│   └── /reset-password
├── /dashboard
├── /pages
│   ├── / (list)
│   ├── /new
│   ├── /:id/edit
│   └── /:id/preview
├── /blog
│   ├── / (list)
│   ├── /new
│   └── /:id/edit
├── /portfolio
│   ├── / (list)
│   ├── /new
│   └── /:id/edit
├── /services
│   ├── / (list)
│   ├── /new
│   └── /:id/edit
├── /team
│   ├── / (list)
│   ├── /new
│   └── /:id/edit
├── /faqs
│   ├── / (list)
│   ├── /new
│   └── /:id/edit
├── /media
│   └── / (library)
├── /navigation
│   └── / (manager)
├── /settings
│   └── / (general, company, social, seo)
├── /forms
│   └── / (inbox)
└── /users (super admin only)
    └── / (user management)
```

---

## 6. Page Template Structure

Every admin page follows this structure:

```jsx
import BackendLayout from '@/components/Admin/BackendLayout';

export default function PagesList() {
  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Pages', path: null },
  ];

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Pages</h1>
        <button className="btn btn-primary">Create New Page</button>
      </div>
      
      <div className="admin-card">
        {/* Page content */}
      </div>
    </BackendLayout>
  );
}
```

---

## 7. Common Layout Patterns

### 7.1 List View Pattern

```
┌─────────────────────────────────────────────────────────┐
│  Pages                                [Create New Page]  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  🔍 Search: [___________]  Filter: [All ▾]  Sort: [▾]   │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Title        │ Status    │ Created    │ Actions   │ │
│  ├────────────────────────────────────────────────────┤ │
│  │ Home         │ Published │ 2025-11-10 │ Edit Del  │ │
│  │ About Us     │ Draft     │ 2025-11-12 │ Edit Del  │ │
│  │ Services     │ Published │ 2025-11-13 │ Edit Del  │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ← 1 2 3 ... 10 →                    Showing 1-20 of 200│
└─────────────────────────────────────────────────────────┘
```

### 7.2 Form View Pattern

```
┌─────────────────────────────────────────────────────────┐
│  Create New Page                           [Cancel] [Save]│
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Page Title *                                            │
│  [_______________________________________]               │
│                                                          │
│  Slug *                                                  │
│  [_______________________________________]               │
│  Will be auto-generated from title                       │
│                                                          │
│  Meta Description                                        │
│  [_______________________________________]               │
│  [_______________________________________]               │
│  160 characters max                                      │
│                                                          │
│  Layout                                                  │
│  ○ Layout (Default)  ○ Layout2  ○ Layout3               │
│                                                          │
│  Status                                                  │
│  ○ Draft  ○ Published                                    │
│                                                          │
│  ┌────────────────────────────────────────┐             │
│  │             [Save Draft]  [Publish]     │             │
│  └────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────┘
```

### 7.3 Dashboard Pattern

```
┌─────────────────────────────────────────────────────────┐
│  Dashboard                                               │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │ Pages    │  │ Blog     │  │ Forms    │  │ Media    ││
│  │   24     │  │   12     │  │   8      │  │  156     ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
│                                                          │
│  Recent Activity                                         │
│  ┌────────────────────────────────────────────────────┐ │
│  │ • John created "About Us" page        2 hours ago  │ │
│  │ • Jane published "New Blog Post"      5 hours ago  │ │
│  │ • Form submission received            1 day ago    │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  Quick Actions                                           │
│  [Create Page] [Write Post] [Upload Media]              │
└─────────────────────────────────────────────────────────┘
```

---

## 8. SCSS File Structure

```
src/sass/admin/
├── _layout.scss          # Main layout (sidebar, topbar, content)
├── _sidebar.scss         # Sidebar styles
├── _topbar.scss          # Top bar styles
├── _breadcrumbs.scss     # Breadcrumbs
├── _cards.scss           # Card components
├── _forms.scss           # Form components
├── _tables.scss          # Data tables
├── _buttons.scss         # Button variants
├── _modals.scss          # Modals & dialogs
├── _toast.scss           # Toast notifications
├── _badges.scss          # Status badges
├── _dashboard.scss       # Dashboard-specific
├── _page-builder.scss    # Page builder UI
└── _responsive.scss      # Media queries
```

**Import in `src/sass/index.scss`:**
```scss
// Admin styles
@import 'admin/layout';
@import 'admin/sidebar';
@import 'admin/topbar';
@import 'admin/breadcrumbs';
@import 'admin/cards';
@import 'admin/forms';
@import 'admin/tables';
@import 'admin/buttons';
@import 'admin/modals';
@import 'admin/toast';
@import 'admin/badges';
@import 'admin/dashboard';
@import 'admin/page-builder';
@import 'admin/responsive';
```

---

## 9. Dark Mode Support

The admin panel supports dark mode using Zivan's existing `.cs_dark` class:

```jsx
// In BackendLayout.jsx
<div className={`admin-layout ${darkMode ? 'cs_dark' : ''}`}>
  {/* Layout content */}
</div>
```

**Dark Mode SCSS:**
```scss
.cs_dark {
  .admin-sidebar {
    background-color: #1a1a1a;
  }
  
  .admin-topbar {
    background-color: #2a2a2a;
    border-color: #3a3a3a;
  }
  
  .admin-content {
    background-color: #121212;
    color: #e0e0e0;
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

## 10. Placeholder Pages

All admin pages should have placeholders during Phase 1:

```jsx
// Example: src/pages/Admin/Blog/BlogList.jsx
import BackendLayout from '@/components/Admin/BackendLayout';

export default function BlogList() {
  return (
    <BackendLayout
      breadcrumbs={[
        { label: 'Dashboard', path: '/admin/dashboard' },
        { label: 'Blog' },
      ]}
    >
      <div className="admin-page-header">
        <h1>Blog Posts</h1>
        <button className="btn btn-primary">Create New Post</button>
      </div>
      
      <div className="admin-card">
        <p>Blog management coming soon in Phase 3...</p>
      </div>
    </BackendLayout>
  );
}
```

**Required Placeholders:**
- `/admin/dashboard` → Dashboard
- `/admin/pages` → Pages List
- `/admin/blog` → Blog List
- `/admin/portfolio` → Portfolio List
- `/admin/services` → Services List
- `/admin/team` → Team List
- `/admin/faqs` → FAQs List
- `/admin/media` → Media Library
- `/admin/navigation` → Navigation Manager
- `/admin/settings` → Settings
- `/admin/forms` → Forms Inbox
- `/admin/users` → User Management

---

## 11. Protected Route Implementation

All admin routes must check authentication:

```jsx
// src/App.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

function ProtectedRoute({ children, requiredRole }) {
  const { user, hasRole, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  
  if (!user) {
    return <Navigate to="/admin/auth/login" replace />;
  }
  
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return children;
}

// Usage
<Route path="/admin/*" element={<ProtectedRoute><BackendLayout /></ProtectedRoute>}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="pages" element={<PagesList />} />
  <Route path="users" element={<ProtectedRoute requiredRole="super_admin"><UsersList /></ProtectedRoute>} />
</Route>
```

---

## 12. Component Testing Checklist

### BackendLayout
- [ ] Renders sidebar, topbar, and content
- [ ] Breadcrumbs display correctly
- [ ] Dark mode toggle works
- [ ] Responsive behavior (mobile/tablet)

### AdminSidebar
- [ ] All navigation items render
- [ ] Active state highlights current page
- [ ] Role-based menu items (hide Users for non-admins)
- [ ] Collapses on mobile
- [ ] Logo links to dashboard

### AdminTopBar
- [ ] Breadcrumbs render from props
- [ ] User dropdown menu works
- [ ] Theme toggle works
- [ ] Logout functionality works

---

**End of Backend Layout Document**
