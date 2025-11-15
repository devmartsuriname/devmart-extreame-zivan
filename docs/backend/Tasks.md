# Devmart Backend - Implementation Tasks Breakdown

**Version:** 1.0.0  
**Last Updated:** 2025-11-15

---

## Task Complexity Legend
- **S (Small)**: 1-2 hours
- **M (Medium)**: 3-6 hours
- **L (Large)**: 1-2 days
- **XL (Extra Large)**: 3-5 days

---

## Phase 1: Foundation & Authentication (Week 1-2)

### 1.1 Project Setup
- [ ] **TASK-001** Enable Lovable Cloud for backend [S]
- [ ] **TASK-002** Create `docs/backend/` directory structure [S]
- [ ] **TASK-003** Set up environment variables and secrets [S]

### 1.2 Database Schema - Auth
- [ ] **TASK-004** Create `app_role` enum [S]
- [ ] **TASK-005** Create `user_roles` table with RLS [M]
- [ ] **TASK-006** Create `profiles` table with RLS [M]
- [ ] **TASK-007** Create `has_role()` security definer function [M]
- [ ] **TASK-008** Create trigger for auto-creating profiles on signup [M]
- [ ] **TASK-009** Test RLS policies with different user roles [M]

### 1.3 Authentication Backend
- [ ] **TASK-010** Create edge function for user signup [M]
- [ ] **TASK-011** Create edge function for password reset [M]
- [ ] **TASK-012** Create edge function for role assignment (super admin only) [M]
- [ ] **TASK-013** Add rate limiting to auth endpoints [M]

### 1.4 Authentication Frontend
- [ ] **TASK-014** Create `/admin/auth/login` page component [M]
- [ ] **TASK-015** Create `/admin/auth/reset-password` page component [M]
- [ ] **TASK-016** Create `useAuth` custom hook [M]
- [ ] **TASK-017** Implement login form with validation (Zod) [M]
- [ ] **TASK-018** Implement password reset flow [M]
- [ ] **TASK-019** Add "Remember me" functionality [S]
- [ ] **TASK-020** Create auth redirect logic (protected routes) [M]
- [ ] **TASK-021** Test auth flows end-to-end [L]

### 1.5 Backend Layout Structure
- [ ] **TASK-022** Create `src/components/Admin/BackendLayout.jsx` [L]
- [ ] **TASK-023** Create `AdminSidebar.jsx` component [M]
- [ ] **TASK-024** Create `AdminTopBar.jsx` component [M]
- [ ] **TASK-025** Create `AdminBreadcrumbs.jsx` component [S]
- [ ] **TASK-026** Add SCSS for admin layout in `src/sass/admin/_layout.scss` [M]
- [ ] **TASK-027** Import admin SCSS in `src/sass/index.scss` [S]
- [ ] **TASK-028** Create admin route structure in App.jsx [M]

### 1.6 Admin Dashboard (Placeholder)
- [ ] **TASK-029** Create `/admin/dashboard` page [M]
- [ ] **TASK-030** Add welcome message and stats placeholders [S]
- [ ] **TASK-031** Test navigation between admin pages [S]

### 1.7 User Management (Super Admin)
- [ ] **TASK-032** Create `/admin/users` list page [L]
- [ ] **TASK-033** Create user role assignment UI [M]
- [ ] **TASK-034** Create user search and filter [M]
- [ ] **TASK-035** Test role changes and permission enforcement [M]

---

## Phase 2: Pages Module & UI Block Integration (Week 3-4)

### 2.1 Database Schema - Pages
- [ ] **TASK-036** Create `pages` table with RLS [M]
- [ ] **TASK-037** Create `page_sections` table with RLS [M]
- [ ] **TASK-038** Add indexes for performance [S]
- [ ] **TASK-039** Test RLS for draft vs published pages [M]

### 2.2 Pages Backend API
- [ ] **TASK-040** Create edge function `GET /api/pages/:slug` [M]
- [ ] **TASK-041** Create edge function `POST /api/admin/pages` [M]
- [ ] **TASK-042** Create edge function `PUT /api/admin/pages/:id` [M]
- [ ] **TASK-043** Create edge function `DELETE /api/admin/pages/:id` [M]
- [ ] **TASK-044** Create edge function `POST /api/admin/pages/:id/sections` [M]
- [ ] **TASK-045** Create edge function `PUT /api/admin/pages/:id/sections/:sectionId` [M]
- [ ] **TASK-046** Create edge function `DELETE /api/admin/pages/:id/sections/:sectionId` [M]
- [ ] **TASK-047** Create edge function `PUT /api/admin/pages/:id/reorder` [M]
- [ ] **TASK-048** Add input validation with Zod for all endpoints [L]

### 2.3 Pages Admin UI - List View
- [ ] **TASK-049** Create `/admin/pages` list page [L]
- [ ] **TASK-050** Create `DataTable` reusable component [L]
- [ ] **TASK-051** Add search, filter, and sort functionality [M]
- [ ] **TASK-052** Add "Create New Page" button [S]
- [ ] **TASK-053** Add page status badges (Draft/Published) [S]
- [ ] **TASK-054** Add pagination controls [M]

### 2.4 Pages Admin UI - Create/Edit Page
- [ ] **TASK-055** Create `/admin/pages/new` page [L]
- [ ] **TASK-056** Create `/admin/pages/:id/edit` page [L]
- [ ] **TASK-057** Create page metadata form (title, slug, meta description) [M]
- [ ] **TASK-058** Add slug auto-generation from title [S]
- [ ] **TASK-059** Add layout selector (Layout, Layout2, Layout3) [S]

### 2.5 UI Block Selector
- [ ] **TASK-060** Create `BlockSelector` component [L]
- [ ] **TASK-061** Load UI blocks from `ui-blocks-registry.json` [M]
- [ ] **TASK-062** Create category filter tabs [M]
- [ ] **TASK-063** Create block preview cards [M]
- [ ] **TASK-064** Add "Add to Page" button functionality [M]
- [ ] **TASK-065** Create search functionality for blocks [M]

### 2.6 Page Builder Canvas
- [ ] **TASK-066** Create `PageCanvas` component [XL]
- [ ] **TASK-067** Display added blocks as section cards [M]
- [ ] **TASK-068** Implement drag-and-drop reordering (react-beautiful-dnd) [L]
- [ ] **TASK-069** Add delete block button [S]
- [ ] **TASK-070** Add select block for editing [S]
- [ ] **TASK-071** Show visual indicator for selected block [S]

### 2.7 Block Props Editor
- [ ] **TASK-072** Create `BlockPropsEditor` component [XL]
- [ ] **TASK-073** Create form builder for common prop types [L]
  - Text inputs (heading, description)
  - Textarea (long text)
  - Image upload picker
  - Color picker
  - Toggle switches
  - Number inputs
- [ ] **TASK-074** Create JSON editor for advanced props [M]
- [ ] **TASK-075** Add prop validation with visual errors [M]
- [ ] **TASK-076** Add help text tooltips for each prop [S]
- [ ] **TASK-077** Save props to database on change (debounced) [M]

### 2.8 Page Publishing Workflow
- [ ] **TASK-078** Add "Save Draft" button [S]
- [ ] **TASK-079** Add "Publish" button [S]
- [ ] **TASK-080** Add "Unpublish" button [S]
- [ ] **TASK-081** Add confirmation dialogs [S]
- [ ] **TASK-082** Show publish status in top bar [S]
- [ ] **TASK-083** Test publishing workflow end-to-end [M]

### 2.9 Dynamic Frontend Rendering
- [ ] **TASK-084** Create `src/pages/DynamicPage.jsx` [L]
- [ ] **TASK-085** Add route handler for `/:slug` in App.jsx [S]
- [ ] **TASK-086** Fetch page data from API [M]
- [ ] **TASK-087** Map sections to UI Block components [L]
- [ ] **TASK-088** Pass props from JSON to components [M]
- [ ] **TASK-089** Handle 404 for non-existent pages [S]
- [ ] **TASK-090** Test dynamic rendering with multiple pages [M]

### 2.10 Page Preview Mode
- [ ] **TASK-091** Add "Preview" button in page editor [S]
- [ ] **TASK-092** Create preview route `/admin/pages/:id/preview` [M]
- [ ] **TASK-093** Render page preview with unsaved changes [M]
- [ ] **TASK-094** Test preview mode [S]

---

## Phase 3: Content Modules (Week 5-6)

### 3.1 Navigation Module
- [ ] **TASK-095** Create `navigation_items` table with RLS [M]
- [ ] **TASK-096** Create `/admin/navigation` page [L]
- [ ] **TASK-097** Create navigation item form (add/edit) [M]
- [ ] **TASK-098** Add drag-and-drop reordering [L]
- [ ] **TASK-099** Add nested menu support (parent-child) [M]
- [ ] **TASK-100** Create edge functions for CRUD operations [L]
- [ ] **TASK-101** Update frontend Header to use dynamic navigation [L]

### 3.2 Blog Module
- [ ] **TASK-102** Create `blog_categories` table with RLS [M]
- [ ] **TASK-103** Create `blog_posts` table with RLS [M]
- [ ] **TASK-104** Create `/admin/blog` list page [L]
- [ ] **TASK-105** Create `/admin/blog/new` editor page [L]
- [ ] **TASK-106** Create `/admin/blog/:id/edit` editor page [L]
- [ ] **TASK-107** Integrate rich text editor (TipTap) [L]
- [ ] **TASK-108** Add featured image upload [M]
- [ ] **TASK-109** Add category selection [S]
- [ ] **TASK-110** Add tags input [M]
- [ ] **TASK-111** Add SEO metadata fields [S]
- [ ] **TASK-112** Create edge functions for blog CRUD [L]
- [ ] **TASK-113** Update frontend blog pages to use database [L]

### 3.3 Portfolio Module
- [ ] **TASK-114** Create `portfolio_projects` table with RLS [M]
- [ ] **TASK-115** Create `/admin/portfolio` list page [L]
- [ ] **TASK-116** Create `/admin/portfolio/new` form [L]
- [ ] **TASK-117** Create `/admin/portfolio/:id/edit` form [L]
- [ ] **TASK-118** Add multiple image upload (gallery) [M]
- [ ] **TASK-119** Add category and tags [S]
- [ ] **TASK-120** Add external links (live URL, GitHub) [S]
- [ ] **TASK-121** Create edge functions for portfolio CRUD [L]
- [ ] **TASK-122** Update frontend portfolio pages to use database [L]

### 3.4 Services Module
- [ ] **TASK-123** Create `services` table with RLS [M]
- [ ] **TASK-124** Create `/admin/services` list page [L]
- [ ] **TASK-125** Create service form (add/edit) [M]
- [ ] **TASK-126** Add icon picker (Iconify) [M]
- [ ] **TASK-127** Add drag-and-drop reordering [M]
- [ ] **TASK-128** Create edge functions for services CRUD [L]
- [ ] **TASK-129** Update frontend services section to use database [M]

### 3.5 Team Module
- [ ] **TASK-130** Create `team_members` table with RLS [M]
- [ ] **TASK-131** Create `/admin/team` list page [L]
- [ ] **TASK-132** Create team member form (add/edit) [M]
- [ ] **TASK-133** Add photo upload [S]
- [ ] **TASK-134** Add social media links [S]
- [ ] **TASK-135** Add drag-and-drop reordering [M]
- [ ] **TASK-136** Create edge functions for team CRUD [L]
- [ ] **TASK-137** Update frontend team section to use database [M]

### 3.6 FAQs Module
- [ ] **TASK-138** Create `faqs` table with RLS [M]
- [ ] **TASK-139** Create `/admin/faqs` list page [L]
- [ ] **TASK-140** Create FAQ form (add/edit) [M]
- [ ] **TASK-141** Add category filter [S]
- [ ] **TASK-142** Add drag-and-drop reordering [M]
- [ ] **TASK-143** Create edge functions for FAQs CRUD [L]
- [ ] **TASK-144** Update frontend FAQs section to use database [M]

---

## Phase 4: Media Library & Settings (Week 7)

### 4.1 Media Library Backend
- [ ] **TASK-145** Create `media_library` table with RLS [M]
- [ ] **TASK-146** Create storage bucket for media uploads [S]
- [ ] **TASK-147** Configure storage RLS policies [M]
- [ ] **TASK-148** Create edge function for file upload [L]
- [ ] **TASK-149** Create edge function for WebP conversion [L]
- [ ] **TASK-150** Create edge function for thumbnail generation [L]
- [ ] **TASK-151** Create edge functions for media CRUD [M]

### 4.2 Media Library Frontend
- [ ] **TASK-152** Create `/admin/media` library page [XL]
- [ ] **TASK-153** Create `ImageUploader` component [L]
- [ ] **TASK-154** Add drag-and-drop file upload [M]
- [ ] **TASK-155** Add file preview (images, PDFs) [M]
- [ ] **TASK-156** Add alt text editor [S]
- [ ] **TASK-157** Add search and filter by tags [M]
- [ ] **TASK-158** Add grid/list view toggle [S]
- [ ] **TASK-159** Add bulk delete functionality [M]
- [ ] **TASK-160** Create media picker modal (for use in other modules) [L]

### 4.3 Settings Module
- [ ] **TASK-161** Create `site_settings` table with RLS [M]
- [ ] **TASK-162** Create `/admin/settings` page [L]
- [ ] **TASK-163** Create settings form (general info) [M]
- [ ] **TASK-164** Create settings form (company details) [M]
- [ ] **TASK-165** Create settings form (social media) [M]
- [ ] **TASK-166** Create settings form (SEO defaults) [M]
- [ ] **TASK-167** Add logo upload (light/dark) [M]
- [ ] **TASK-168** Add favicon upload [S]
- [ ] **TASK-169** Create edge functions for settings CRUD [M]
- [ ] **TASK-170** Update frontend to use dynamic settings [L]
- [ ] **TASK-170a** Create settings form for SMTP configuration (Hostinger) [M]
  - SMTP host, port, username, password fields
  - Enable/disable toggle
  - Password encryption handling
- [ ] **TASK-170b** Create edge function for sending emails via Hostinger SMTP [L]
  - Use nodemailer or similar
  - Load SMTP credentials from site_settings
  - Add email queue for reliability
- [ ] **TASK-170c** Add "Test Email" functionality in settings [M]
  - Send test email to admin
  - Show success/error feedback

---

## Phase 5: Forms & E-commerce (Week 8)

### 5.1 Contact Forms
- [ ] **TASK-171** Create `contact_submissions` table with RLS [M]
- [ ] **TASK-172** Create edge function to receive form submissions [M]
  - Save to database
  - Send email notification via Hostinger SMTP (if configured)
- [ ] **TASK-173** Add rate limiting to prevent spam [M]
- [ ] **TASK-174** Update frontend contact form to submit to API [M]
- [ ] **TASK-175** Add success/error toast notifications [S]

### 5.2 Forms Inbox
- [ ] **TASK-176** Create `/admin/forms` inbox page [L]
- [ ] **TASK-177** Display submissions in table with filters [M]
- [ ] **TASK-178** Add mark as read/unread functionality [S]
- [ ] **TASK-179** Add delete submission [S]
- [ ] **TASK-180** Add export to CSV [M]
- [ ] **TASK-181** Add submission detail modal [M]

### 5.3 E-commerce Foundation
- [ ] **TASK-182** Create `products` table with RLS [M]
- [ ] **TASK-183** Create `/admin/products` list page [L]
- [ ] **TASK-184** Create product form (add/edit) [L]
- [ ] **TASK-185** Add multiple image upload [M]
- [ ] **TASK-186** Add stock management [S]
- [ ] **TASK-187** Create edge functions for products CRUD [L]
- [ ] **TASK-188** Update frontend shop pages to use database [L]

---

## Phase 6: Polish & Testing (Week 9)

### 6.1 Reusable Admin Components
- [ ] **TASK-189** Create `DataTable` component with sorting [L]
- [ ] **TASK-190** Create `FormField` wrapper component [M]
- [ ] **TASK-191** Create `ConfirmDialog` component [S]
- [ ] **TASK-192** Create `Toast` notification system [M]
- [ ] **TASK-193** Create `LoadingSpinner` component [S]
- [ ] **TASK-194** Create `EmptyState` component [S]

### 6.2 Error Handling
- [ ] **TASK-195** Add global error boundary [M]
- [ ] **TASK-196** Add API error handling with user-friendly messages [M]
- [ ] **TASK-197** Add form validation error displays [M]
- [ ] **TASK-198** Add 404 page for admin routes [S]

### 6.3 Performance Optimization
- [ ] **TASK-199** Add database query caching [M]
- [ ] **TASK-200** Optimize images (WebP conversion) [M]
- [ ] **TASK-201** Add lazy loading for admin modules [M]
- [ ] **TASK-202** Add pagination to all list views [M]
- [ ] **TASK-203** Add CDN headers for media files [S]

### 6.4 Testing
- [ ] **TASK-204** Test all auth flows [M]
- [ ] **TASK-205** Test all CRUD operations per module [L]
- [ ] **TASK-206** Test RLS policies with different user roles [L]
- [ ] **TASK-207** Test dynamic page rendering [M]
- [ ] **TASK-208** Test media uploads and serving [M]
- [ ] **TASK-209** Load testing for API endpoints [L]
- [ ] **TASK-210** Security audit (input validation, XSS, CSRF) [L]

### 6.5 Documentation
- [ ] **TASK-211** Write admin user guide [L]
- [ ] **TASK-212** Write developer documentation [L]
- [ ] **TASK-213** Create video tutorials (optional) [XL]

---

## Task Summary

**Total Tasks:** 213  
**Estimated Time:** 9 weeks  

**Breakdown by Phase:**
- Phase 1 (Auth & Foundation): 35 tasks
- Phase 2 (Pages Module): 56 tasks
- Phase 3 (Content Modules): 50 tasks
- Phase 4 (Media & Settings): 26 tasks
- Phase 5 (Forms & E-commerce): 18 tasks
- Phase 6 (Polish & Testing): 28 tasks

---

**Priority Tasks (Must Complete First):**
1. TASK-001 to TASK-021: Authentication
2. TASK-022 to TASK-035: Backend layout and user management
3. TASK-036 to TASK-094: Pages module (CRITICAL PATH)
4. All other modules can be developed in parallel after Phase 2

---

**End of Tasks Document**
