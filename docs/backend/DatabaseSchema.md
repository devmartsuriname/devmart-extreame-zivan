# Devmart Backend - Complete Database Schema

**Version:** 1.0.0  
**Last Updated:** 2025-11-15

---

## 1. Overview

This document contains the **complete SQL schema** for all Devmart backend tables, including:
- Table definitions
- Indexes for performance
- Row Level Security (RLS) policies
- Helper functions
- Triggers
- Migration scripts

---

## 2. Authentication & Users

### 2.1 Enum: app_role

```sql
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'editor', 'viewer');
```

### 2.2 Table: user_roles

```sql
-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- Indexes
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Super admins manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Users view own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());
```

### 2.3 Table: profiles

```sql
-- User profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Users update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Admins view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin')
);
```

### 2.4 Function: has_role()

```sql
-- Security definer function to check user roles
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

### 2.5 Trigger: Auto-create profile on signup

```sql
-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$;

-- Trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 3. Pages Module

### 3.1 Table: pages

```sql
-- Pages table
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT,
  og_image TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  layout TEXT DEFAULT 'Layout' CHECK (layout IN ('Layout', 'Layout2', 'Layout3')),
  parent_id UUID REFERENCES public.pages(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  published_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_pages_slug ON public.pages(slug);
CREATE INDEX idx_pages_status ON public.pages(status);
CREATE INDEX idx_pages_created_by ON public.pages(created_by);
CREATE INDEX idx_pages_parent_id ON public.pages(parent_id);

-- Enable RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins manage pages"
ON public.pages FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Public view published pages"
ON public.pages FOR SELECT
TO anon, authenticated
USING (status = 'published');
```

### 3.2 Table: page_sections

```sql
-- Page sections (UI Blocks)
CREATE TABLE public.page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  block_id TEXT NOT NULL, -- e.g., 'Hero1_CreativeAgency'
  order_index INTEGER NOT NULL,
  props JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_id, order_index)
);

-- Indexes
CREATE INDEX idx_page_sections_page_id ON public.page_sections(page_id);
CREATE INDEX idx_page_sections_order ON public.page_sections(page_id, order_index);

-- Enable RLS
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

-- RLS Policies
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

---

## 4. Navigation Module

### 4.1 Table: navigation_items

```sql
-- Navigation items table
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

-- Indexes
CREATE INDEX idx_nav_location ON public.navigation_items(location);
CREATE INDEX idx_nav_order ON public.navigation_items(location, order_index);
CREATE INDEX idx_nav_parent_id ON public.navigation_items(parent_id);

-- Enable RLS
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins manage navigation"
ON public.navigation_items FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Public view active navigation"
ON public.navigation_items FOR SELECT
TO anon, authenticated
USING (is_active = TRUE);
```

---

## 5. Media Library Module

**Implementation Status:** ✅ Phase 1A Complete (Database Schema)

### 5.1 Table: media_library

```sql
-- Media library table
CREATE TABLE public.media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE, -- Storage path
  file_url TEXT NOT NULL, -- Public URL
  file_size INTEGER NOT NULL, -- Bytes
  mime_type TEXT NOT NULL,
  width INTEGER, -- For images
  height INTEGER, -- For images
  alt_text TEXT,
  caption TEXT,
  folder TEXT DEFAULT 'uncategorized',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[], -- Tag-based organization
  usage_count INTEGER DEFAULT 0, -- Track where media is used
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_media_tags ON public.media_library USING GIN(tags);
CREATE INDEX idx_media_folder ON public.media_library(folder);
CREATE INDEX idx_media_filename ON public.media_library(filename);
CREATE INDEX idx_media_mime_type ON public.media_library(mime_type);
CREATE INDEX idx_media_uploaded_by ON public.media_library(uploaded_by);
CREATE INDEX idx_media_created_at ON public.media_library(created_at DESC);

-- Enable RLS
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins and editors can manage media"
ON public.media_library FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Public can view media"
ON public.media_library FOR SELECT
TO anon, authenticated
USING (TRUE);
```

### 5.2 Table: media_usage

```sql
-- Media usage tracking table
CREATE TABLE public.media_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id UUID REFERENCES public.media_library(id) ON DELETE CASCADE NOT NULL,
  used_in TEXT NOT NULL, -- Format: "table:id" (e.g., "pages:home-page-id")
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_media_usage_media_id ON public.media_usage(media_id);
CREATE INDEX idx_media_usage_used_in ON public.media_usage(used_in);

-- Enable RLS
ALTER TABLE public.media_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins and editors can manage usage tracking"
ON public.media_usage FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Public can view usage tracking"
ON public.media_usage FOR SELECT
TO anon, authenticated
USING (TRUE);
```

### 5.3 Function: increment_media_usage()

```sql
-- Function to increment media usage count
CREATE OR REPLACE FUNCTION public.increment_media_usage(media_id UUID)
RETURNS VOID
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.media_library
  SET usage_count = usage_count + 1
  WHERE id = media_id;
END;
$$;
```

### 5.4 Storage Bucket: media

```sql
-- Create media bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', TRUE);

-- Bucket configuration
-- Size limit: 50MB per file
-- Allowed MIME types:
--   - image/jpeg, image/png, image/webp, image/gif, image/svg+xml
--   - application/pdf
--   - video/mp4, video/webm
--   - application/zip

-- RLS for uploads
CREATE POLICY "Admins and editors can upload media"
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

-- RLS for updates
CREATE POLICY "Admins and editors can update media"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'media' AND
  (
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'editor')
  )
);

-- RLS for deletes
CREATE POLICY "Admins and editors can delete media"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'media' AND
  (
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'editor')
  )
);

-- Public read access
CREATE POLICY "Public can read media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');
```

---

## 6. Settings Module

### 6.1 Table: site_settings

```sql
-- Site settings table
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins manage settings"
ON public.site_settings FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Public view settings"
ON public.site_settings FOR SELECT
TO anon, authenticated
USING (TRUE);
```

### 6.2 Default Settings

```sql
-- Insert default settings
INSERT INTO public.site_settings (key, value) VALUES
('site_name', '"Devmart"'),
('site_tagline', '"Creative Digital Agency"'),
('company_email', '"info@devmart.com"'),
('company_phone', '"+1 234 567 890"'),
('company_address', '"123 Main St, City, Country"'),
('social_linkedin', '"https://linkedin.com/company/devmart"'),
('social_twitter', '"https://twitter.com/devmart"'),
('social_facebook', '"https://facebook.com/devmart"'),
('social_instagram', '"https://instagram.com/devmart"'),
('logo_light', '"/images/logo.svg"'),
('logo_dark', '"/images/logo_white.svg"'),
('favicon', '"/favicon.ico"'),
('google_analytics_id', '""'),
('meta_title_default', '"Devmart - Creative Digital Agency"'),
('meta_description_default', '"We create digital experiences"'),
('footer_copyright', '"© 2025 Devmart. All rights reserved."'),
('maintenance_mode', 'false'),
-- SMTP Email Configuration (Hostinger)
('smtp_enabled', 'false'),
('smtp_host', '"smtp.hostinger.com"'),
('smtp_port', '587'),
('smtp_username', '""'),
('smtp_password', '""'), -- Must be encrypted in production
('smtp_from_email', '"noreply@devmart.com"'),
('smtp_from_name', '"Devmart"');
```

---

## 7. Blog Module

### 7.1 Table: blog_categories

```sql
-- Blog categories table
CREATE TABLE public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins manage blog categories"
ON public.blog_categories FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Public view blog categories"
ON public.blog_categories FOR SELECT
TO anon, authenticated
USING (TRUE);
```

### 7.2 Table: blog_posts

```sql
-- Blog posts table
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

-- Indexes
CREATE INDEX idx_blog_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_status ON public.blog_posts(status);
CREATE INDEX idx_blog_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX idx_blog_category_id ON public.blog_posts(category_id);
CREATE INDEX idx_blog_author_id ON public.blog_posts(author_id);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins manage blog posts"
ON public.blog_posts FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Public view published blog posts"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (status = 'published');
```

---

## 8. Portfolio Module

### 8.1 Table: portfolio_projects

```sql
-- Portfolio projects table
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

-- Indexes
CREATE INDEX idx_portfolio_slug ON public.portfolio_projects(slug);
CREATE INDEX idx_portfolio_featured ON public.portfolio_projects(is_featured);
CREATE INDEX idx_portfolio_category ON public.portfolio_projects(category);

-- Enable RLS
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins manage portfolio"
ON public.portfolio_projects FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Public view portfolio"
ON public.portfolio_projects FOR SELECT
TO anon, authenticated
USING (TRUE);
```

---

## 9. Services Module

### 9.1 Table: services

```sql
-- Services table
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

-- Indexes
CREATE INDEX idx_services_slug ON public.services(slug);
CREATE INDEX idx_services_order ON public.services(order_index);
CREATE INDEX idx_services_active ON public.services(is_active);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins manage services"
ON public.services FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Public view active services"
ON public.services FOR SELECT
TO anon, authenticated
USING (is_active = TRUE);
```

---

## 10. Team Module

### 10.1 Table: team_members

```sql
-- Team members table
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

-- Indexes
CREATE INDEX idx_team_order ON public.team_members(order_index);
CREATE INDEX idx_team_active ON public.team_members(is_active);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins manage team"
ON public.team_members FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Public view active team"
ON public.team_members FOR SELECT
TO anon, authenticated
USING (is_active = TRUE);
```

---

## 11. FAQs Module

### 11.1 Table: faqs

```sql
-- FAQs table
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

-- Indexes
CREATE INDEX idx_faqs_category ON public.faqs(category);
CREATE INDEX idx_faqs_order ON public.faqs(category, order_index);
CREATE INDEX idx_faqs_active ON public.faqs(is_active);

-- Enable RLS
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins manage faqs"
ON public.faqs FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Public view active faqs"
ON public.faqs FOR SELECT
TO anon, authenticated
USING (is_active = TRUE);
```

---

## 12. Forms Module

### 12.1 Table: contact_submissions

```sql
-- Contact form submissions table
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

-- Indexes
CREATE INDEX idx_contact_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX idx_contact_is_read ON public.contact_submissions(is_read);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins manage submissions"
ON public.contact_submissions FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin')
);
```

---

## 13. E-commerce Module

### 13.1 Table: products

```sql
-- Products table
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

-- Indexes
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_active ON public.products(is_active);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins manage products"
ON public.products FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Public view active products"
ON public.products FOR SELECT
TO anon, authenticated
USING (is_active = TRUE);
```

---

## 14. Migration Script (All Tables)

```sql
-- Complete Devmart Backend Schema Migration
-- Run this script to create all tables at once

-- 1. Create role enum
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'editor', 'viewer');

-- 2. User roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. has_role() function
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

-- 5. Auto-create profile trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Continue with all other tables...
-- (See individual sections above for complete CREATE TABLE statements)

-- Enable RLS on all tables
-- (See individual sections for RLS policies)
```

---

**End of Database Schema Document**
