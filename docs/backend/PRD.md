# Devmart Backend - Product Requirements Document (PRD)

**Version:** 1.0.0  
**Last Updated:** 2025-11-15  
**Status:** Planning Phase

---

## 1. Executive Summary

### 1.1 Purpose
Transform Devmart from a static frontend template into a full-featured Content Management System (CMS) with dynamic page building capabilities, enabling non-technical administrators to manage all website content through an intuitive admin interface.

### 1.2 Target Users
- **Super Admin**: Full system access, user management, all content operations
- **Admin**: Content management across all modules
- **Editor**: Content creation and editing (limited publishing)
- **Viewer**: Read-only access to admin panel

### 1.3 Core Functionality
- Role-based authentication and authorization
- Dynamic page builder using existing UI Blocks
- Multi-module content management (Blog, Portfolio, Services, Team, FAQs)
- Media library with cloud storage
- Navigation management
- Site settings and configuration
- Contact form management
- E-commerce integration foundation

---

## 2. System Requirements

### 2.1 Technical Stack
- **Frontend**: React 18.3.1, React Router DOM 6, Vite
- **Styling**: SASS (existing Zivan design system)
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL with Row Level Security
- **Storage**: Supabase Storage (CDN-backed)
- **Authentication**: Supabase Auth with email/password
- **API**: Edge Functions for server-side logic

### 2.2 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile responsive (iOS Safari, Chrome Mobile)

### 2.3 Performance Requirements
- Admin page load: < 2 seconds
- Frontend dynamic pages: < 1.5 seconds
- Image optimization: WebP format, lazy loading
- Database queries: < 500ms for 95th percentile
- Media uploads: Support files up to 50MB

---

## 3. Authentication Module

### 3.1 User Stories
- As an admin, I want to log in securely with email/password
- As an admin, I want to reset my password if forgotten
- As a super admin, I want to manage user roles and permissions
- As a user, I want my session to persist across browser refreshes

### 3.2 Functional Requirements

#### 3.2.1 Login Flow
- Email and password authentication
- Email validation (proper format)
- Password requirements: min 8 characters
- "Remember me" functionality (30-day session)
- Clear error messages for invalid credentials
- Redirect to dashboard on successful login
- Redirect to intended page after login (deep linking)

#### 3.2.2 Password Reset Flow
- Send reset link to registered email
- Secure token with 1-hour expiration
- Password strength indicator
- Confirm new password field
- Success confirmation message

#### 3.2.3 Role Management
- Four roles: Super Admin, Admin, Editor, Viewer
- Super Admin can create/edit/delete users
- Super Admin can assign/revoke roles
- Users can have multiple roles
- Role changes take effect immediately

#### 3.2.4 Permissions Matrix

| Feature | Super Admin | Admin | Editor | Viewer |
|---------|-------------|-------|--------|--------|
| User Management | Full | - | - | - |
| Pages Module | Full | Full | Create/Edit | Read |
| Blog | Full | Full | Create/Edit | Read |
| Portfolio | Full | Full | Create/Edit | Read |
| Services | Full | Full | Create/Edit | Read |
| Team | Full | Full | Create/Edit | Read |
| FAQs | Full | Full | Create/Edit | Read |
| Media Library | Full | Full | Upload/Edit | Read |
| Navigation | Full | Full | - | Read |
| Settings | Full | Full | - | Read |
| Forms Inbox | Full | Full | Read | Read |

### 3.3 Security Requirements
- Passwords hashed with bcrypt
- JWT tokens with 7-day expiration
- Refresh tokens for session extension
- Rate limiting on login attempts (5 attempts/15 minutes)
- HTTPS only in production
- CSRF protection on all mutations
- XSS protection on all inputs
- SQL injection prevention via parameterized queries

### 3.4 Database Schema
```sql
-- Enum for roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'editor', 'viewer');

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

### 3.5 RLS Policies
```sql
-- Only super admins can manage user_roles
CREATE POLICY "Super admins manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

-- Users can view their own profile
CREATE POLICY "Users view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Admins can view all profiles
CREATE POLICY "Admins view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin')
);
```

---

## 4. Pages Module (CRITICAL - UI Block Integration)

### 4.1 User Stories
- As an admin, I want to create new pages dynamically
- As an admin, I want to select and arrange UI Blocks on a page
- As an admin, I want to edit UI Block properties (text, images, colors)
- As an admin, I want to preview pages before publishing
- As an admin, I want to publish/unpublish pages
- As a visitor, I want to see dynamically rendered pages on the frontend

### 4.2 Functional Requirements

#### 4.2.1 Page Management
- Create new pages with URL slug
- Edit existing pages
- Delete pages (with confirmation)
- Duplicate pages
- Set page status: Draft, Published
- SEO metadata per page (title, description, OG tags)
- Parent-child page relationships (for breadcrumbs)

#### 4.2.2 UI Block System
- Browse all 36 available UI Blocks by category
- Preview UI Block before adding to page
- Drag-and-drop blocks to reorder sections
- Delete blocks from page
- Edit block properties via JSON editor or form UI
- Block prop validation (ensure required props are set)
- Support for block variants (Hero1, Hero2, etc.)

#### 4.2.3 Block Props Editor
- Visual form builder for common props
  - Text inputs (heading, description, button text)
  - Image uploads (hero images, thumbnails)
  - Color pickers (accent colors, backgrounds)
  - Toggle switches (dark mode, show/hide elements)
  - Number inputs (counts, limits)
- Advanced JSON editor for complex props
- Real-time validation
- Help text for each property

#### 4.2.4 Page Builder UI
- Left sidebar: UI Block selector (filtered by category)
- Center canvas: Page preview with block stack
- Right sidebar: Selected block props editor
- Top toolbar: Save, Preview, Publish buttons
- Breadcrumbs: Home > Pages > Edit Page
- Undo/Redo functionality (future)

#### 4.2.5 Frontend Rendering
- Dynamic route handler: `/[slug]`
- Fetch page data by slug from database
- Map `page_sections` to UI Block components
- Pass props from JSON to components
- Handle 404 for non-existent pages
- Cache page data (5-minute TTL)

### 4.3 Database Schema
```sql
-- Pages table
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT,
  og_image TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  layout TEXT DEFAULT 'Layout', -- Layout, Layout2, Layout3
  parent_id UUID REFERENCES public.pages(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  published_at TIMESTAMPTZ
);

-- Page sections (UI Blocks)
CREATE TABLE public.page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  block_id TEXT NOT NULL, -- e.g., 'Hero1_CreativeAgency'
  order_index INTEGER NOT NULL,
  props JSONB DEFAULT '{}', -- Block-specific props
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_id, order_index)
);

-- Index for performance
CREATE INDEX idx_pages_slug ON public.pages(slug);
CREATE INDEX idx_pages_status ON public.pages(status);
CREATE INDEX idx_page_sections_page_id ON public.page_sections(page_id);
CREATE INDEX idx_page_sections_order ON public.page_sections(page_id, order_index);
```

### 4.4 RLS Policies
```sql
-- Admins and editors can create/edit pages
CREATE POLICY "Admins manage pages"
ON public.pages FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'editor')
);

-- Everyone can view published pages (for frontend)
CREATE POLICY "Public view published pages"
ON public.pages FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- Similar policies for page_sections
CREATE POLICY "Admins manage page sections"
ON public.page_sections FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Public view published page sections"
ON public.page_sections FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.pages
    WHERE id = page_sections.page_id AND status = 'published'
  )
);
```

### 4.5 API Endpoints

#### GET `/api/pages/:slug`
Fetch page data for frontend rendering.

**Response:**
```json
{
  "id": "uuid",
  "slug": "home",
  "title": "Home Page",
  "meta_description": "Welcome to Devmart",
  "layout": "Layout",
  "sections": [
    {
      "id": "uuid",
      "block_id": "Hero1_CreativeAgency",
      "order_index": 0,
      "props": {
        "title": "We are Creative Agency",
        "subtitle": "Building digital experiences",
        "videoUrl": "https://...",
        "bgImage": "https://..."
      }
    }
  ]
}
```

#### POST `/api/admin/pages`
Create new page (admin only).

**Request:**
```json
{
  "slug": "about-us",
  "title": "About Us",
  "meta_description": "Learn about our story",
  "layout": "Layout"
}
```

#### PUT `/api/admin/pages/:id`
Update page metadata.

#### POST `/api/admin/pages/:id/sections`
Add section to page.

**Request:**
```json
{
  "block_id": "About2_CreativeAgency",
  "order_index": 1,
  "props": {
    "heading": "Our Mission",
    "description": "We create digital solutions..."
  }
}
```

#### PUT `/api/admin/pages/:id/sections/:sectionId`
Update section props.

#### DELETE `/api/admin/pages/:id/sections/:sectionId`
Remove section from page.

#### PUT `/api/admin/pages/:id/reorder`
Reorder sections.

**Request:**
```json
{
  "sections": [
    { "id": "uuid1", "order_index": 0 },
    { "id": "uuid2", "order_index": 1 }
  ]
}
```

---

## 5. Navigation Module

### 5.1 User Stories
- As an admin, I want to manage header navigation links
- As an admin, I want to configure mega menu items
- As an admin, I want to manage footer links
- As an admin, I want to reorder navigation items
- As a visitor, I want to see dynamic navigation on the frontend

### 5.2 Functional Requirements
- Add/edit/delete navigation items
- Set link type: Page, External URL, Mega Menu Parent
- Drag-and-drop reordering
- Support for nested menus (2 levels)
- Enable/disable items without deleting
- Set target: _self, _blank
- Icon support (optional, using Iconify)

### 5.3 Database Schema
```sql
CREATE TABLE public.navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL CHECK (location IN ('header', 'footer')),
  label TEXT NOT NULL,
  url TEXT,
  page_id UUID REFERENCES public.pages(id) ON DELETE SET NULL,
  parent_id UUID REFERENCES public.navigation_items(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  target TEXT DEFAULT '_self' CHECK (target IN ('_self', '_blank')),
  icon TEXT, -- Iconify icon name
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(location, order_index, parent_id)
);

CREATE INDEX idx_nav_location ON public.navigation_items(location);
CREATE INDEX idx_nav_order ON public.navigation_items(location, order_index);
```

### 5.4 RLS Policies
```sql
-- Admins manage navigation
CREATE POLICY "Admins manage navigation"
ON public.navigation_items FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin')
);

-- Public can view active nav items
CREATE POLICY "Public view active navigation"
ON public.navigation_items FOR SELECT
TO anon, authenticated
USING (is_active = TRUE);
```

---

## 6. Media Library Module

### 6.1 User Stories
- As an admin, I want to upload images and files
- As an admin, I want to organize media in folders
- As an admin, I want to search media by filename
- As an admin, I want to edit alt text for images
- As an admin, I want to see file size and dimensions
- As an admin, I want to delete unused media

### 6.2 Functional Requirements
- Upload multiple files at once
- Supported formats: JPG, PNG, WebP, SVG, PDF, ZIP
- Automatic WebP conversion for JPG/PNG
- Thumbnail generation
- Folder organization (virtual folders via tags)
- Alt text editor for accessibility
- File metadata: size, dimensions, upload date
- Usage tracking (which pages use which media)
- Bulk delete

### 6.3 Database Schema
```sql
CREATE TABLE public.media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE, -- Storage path
  file_url TEXT NOT NULL, -- Public URL
  file_size INTEGER, -- Bytes
  mime_type TEXT,
  width INTEGER, -- For images
  height INTEGER, -- For images
  alt_text TEXT,
  tags TEXT[], -- Virtual folders
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_tags ON public.media_library USING GIN(tags);
CREATE INDEX idx_media_filename ON public.media_library(filename);
```

### 6.4 Storage Buckets
```sql
-- Create media bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', TRUE);

-- RLS for uploads
CREATE POLICY "Admins upload media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'media' AND
  (
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'editor')
  )
);

-- Public read access
CREATE POLICY "Public read media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');
```

---

## 7. Blog Module

### 7.1 Functional Requirements
- Create/edit/delete blog posts
- Rich text editor (TipTap or similar)
- Categories and tags
- Featured image
- Author attribution
- Publish/draft status
- Scheduled publishing (future)
- SEO metadata per post
- Related posts suggestions

### 7.2 Database Schema
```sql
CREATE TABLE public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT, -- Rich text HTML
  excerpt TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  meta_description TEXT,
  meta_keywords TEXT[],
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_status ON public.blog_posts(status);
CREATE INDEX idx_blog_published_at ON public.blog_posts(published_at DESC);
```

---

## 8. Portfolio Module

### 8.1 Functional Requirements
- Create/edit/delete portfolio projects
- Multiple images per project (gallery)
- Project categories
- External links (live site, GitHub, etc.)
- Rich text description
- Tags for filtering
- Featured projects flag

### 8.2 Database Schema
```sql
CREATE TABLE public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  thumbnail TEXT,
  gallery_images TEXT[], -- Array of image URLs
  category TEXT,
  tags TEXT[],
  client_name TEXT,
  project_date DATE,
  live_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_portfolio_slug ON public.portfolio_projects(slug);
CREATE INDEX idx_portfolio_featured ON public.portfolio_projects(is_featured);
```

---

## 9. Services Module

### 9.1 Functional Requirements
- Create/edit/delete services
- Icon selection (Iconify)
- Service description (rich text)
- Pricing information
- Service categories
- Order for display on frontend

### 9.2 Database Schema
```sql
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT, -- Iconify icon name
  price_starting DECIMAL(10,2),
  category TEXT,
  order_index INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(order_index)
);
```

---

## 10. Team Module

### 10.1 Functional Requirements
- Add/edit/delete team members
- Photo upload
- Name, title, bio
- Social media links (LinkedIn, Twitter, etc.)
- Order for display

### 10.2 Database Schema
```sql
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  photo_url TEXT,
  email TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  github_url TEXT,
  order_index INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(order_index)
);
```

---

## 11. FAQs Module

### 11.1 Functional Requirements
- Create/edit/delete FAQ items
- Question and answer fields
- Categories for organization
- Order for display
- Searchable on frontend

### 11.2 Database Schema
```sql
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  order_index INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(category, order_index)
);
```

---

## 12. Settings Module

### 12.1 Functional Requirements
- Site name and tagline
- Company information
- Contact details (email, phone, address)
- Social media URLs
- Logo uploads (light/dark versions)
- Favicon
- Google Analytics ID
- Default SEO metadata
- Footer copyright text
- Maintenance mode toggle
- **SMTP Email Configuration** (for contact forms and transactional emails)
  - SMTP Host (e.g., smtp.hostinger.com)
  - SMTP Port (e.g., 587 for TLS, 465 for SSL)
  - SMTP Username (email account)
  - SMTP Password (encrypted)
  - From Email (sender email address)
  - From Name (sender display name)
  - Enable/Disable SMTP
  - Test email functionality

### 12.2 Database Schema
```sql
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Predefined settings
INSERT INTO public.site_settings (key, value) VALUES
('site_name', '"Devmart"'),
('site_tagline', '"Creative Digital Agency"'),
('company_email', '"info@devmart.com"'),
('company_phone', '"+1 234 567 890"'),
('social_linkedin', '"https://linkedin.com/company/devmart"'),
('social_twitter', '"https://twitter.com/devmart"'),
('logo_light', '"/images/logo.svg"'),
('logo_dark', '"/images/logo_white.svg"'),
('maintenance_mode', 'false'),
-- SMTP Email Configuration (Hostinger)
('smtp_enabled', 'false'),
('smtp_host', '"smtp.hostinger.com"'),
('smtp_port', '587'),
('smtp_username', '""'),
('smtp_password', '""'), -- Encrypted in production
('smtp_from_email', '"noreply@devmart.com"'),
('smtp_from_name', '"Devmart"');
```

---

## 13. Forms Module

### 13.1 Functional Requirements
- Receive contact form submissions
- View submissions in admin inbox
- Mark as read/unread
- Reply via email (future)
- Export to CSV
- Delete submissions
- Spam protection (rate limiting)

### 13.2 Database Schema
```sql
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX idx_contact_is_read ON public.contact_submissions(is_read);
```

---

## 14. E-commerce Foundation (Future)

### 14.1 Minimal Requirements
- Products table (for existing product pages)
- Basic product info: name, price, description, images
- Stock tracking
- Admin CRUD for products

### 14.2 Database Schema
```sql
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  sku TEXT UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  images TEXT[],
  category TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 15. Performance Requirements

### 15.1 Caching Strategy
- Database queries: 5-minute cache for published content
- Media files: CDN with 1-year cache headers
- API responses: ETags for conditional requests
- Admin panel: No caching (always fresh)

### 15.2 Optimization
- Lazy load images on frontend (Intersection Observer)
- WebP format for all images
- Minified JS/CSS in production
- Database indexes on all foreign keys and query columns
- Pagination for all list views (50 items per page)

### 15.3 Monitoring
- Database query time tracking
- API endpoint response time tracking
- Error logging (Sentry or similar)
- User activity logging (who changed what, when)

---

## 16. Security Requirements

### 16.1 Data Protection
- All passwords hashed with bcrypt
- Sensitive data encrypted at rest
- HTTPS only in production
- CORS restrictions on API endpoints
- Rate limiting on all public endpoints

### 16.2 Input Validation
- Zod schemas for all form inputs
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitize HTML inputs)
- File upload validation (type, size, malware scan)
- CSRF tokens on all mutations

### 16.3 Authorization
- Row Level Security on all tables
- API endpoint authorization checks
- Admin actions logged with user attribution
- Sensitive operations require re-authentication

---

## 17. Acceptance Criteria

### 17.1 Phase 1: Auth & Backend Shell
- [ ] Admin can log in with email/password
- [ ] Admin can reset password
- [ ] Super admin can manage user roles
- [ ] Backend layout renders with sidebar and top bar
- [ ] All admin routes protected with auth

### 17.2 Phase 2: Pages Module
- [ ] Admin can create new pages
- [ ] Admin can add UI Blocks to pages
- [ ] Admin can edit UI Block props
- [ ] Admin can reorder sections
- [ ] Admin can publish/unpublish pages
- [ ] Frontend renders dynamic pages from database
- [ ] 404 page for non-existent slugs

### 17.3 Phase 3: Content Modules
- [ ] Blog CRUD works
- [ ] Portfolio CRUD works
- [ ] Services CRUD works
- [ ] Team CRUD works
- [ ] FAQs CRUD works
- [ ] All modules display on frontend

### 17.4 Phase 4: Media & Settings
- [ ] Media library uploads work
- [ ] Images display in admin and frontend
- [ ] Settings update and reflect on frontend
- [ ] Navigation manager works

### 17.5 Phase 5: Forms
- [ ] Contact form submissions save to database
- [ ] Admin can view form inbox
- [ ] Admin can mark as read/unread
- [ ] Export to CSV works

---

## 18. Future Enhancements

- [ ] Versioning and revision history for pages
- [ ] Multi-language support (i18n)
- [ ] Advanced SEO tools (sitemap generator, robots.txt editor)
- [ ] Analytics dashboard in admin
- [ ] Custom UI Block creator
- [ ] Workflow approvals (Editor → Admin → Publish)
- [ ] Scheduled publishing
- [ ] Full e-commerce with cart and checkout
- [ ] Email marketing integration
- [ ] Webhook support for third-party integrations

---

## 19. Success Metrics

- Admin can create a new page in < 5 minutes
- Admin can publish content without developer assistance
- Frontend page load remains < 2 seconds
- Zero security vulnerabilities (regular audits)
- 100% uptime for backend services

---

**End of PRD**
