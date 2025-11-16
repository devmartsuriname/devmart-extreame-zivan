-- Create page status enum
CREATE TYPE public.page_status AS ENUM ('draft', 'published', 'archived');

-- Create pages table
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  meta_description TEXT,
  meta_keywords TEXT,
  seo_image TEXT,
  layout TEXT DEFAULT 'Layout' CHECK (layout IN ('Layout', 'Layout2', 'Layout3')),
  status page_status DEFAULT 'draft' NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  published_at TIMESTAMPTZ
);

-- Create page_sections table
CREATE TABLE public.page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  block_type TEXT NOT NULL,
  block_props JSONB DEFAULT '{}'::jsonb NOT NULL,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create indexes
CREATE UNIQUE INDEX idx_pages_slug ON public.pages(slug);
CREATE INDEX idx_page_sections_page_id ON public.page_sections(page_id);
CREATE INDEX idx_page_sections_order_index ON public.page_sections(page_id, order_index);

-- Enable RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pages table
-- Public can view published pages
CREATE POLICY "Public can view published pages"
  ON public.pages
  FOR SELECT
  USING (status = 'published');

-- Admins can view all pages
CREATE POLICY "Admins can view all pages"
  ON public.pages
  FOR SELECT
  TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- Admins can insert pages
CREATE POLICY "Admins can insert pages"
  ON public.pages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- Admins can update pages
CREATE POLICY "Admins can update pages"
  ON public.pages
  FOR UPDATE
  TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- Admins can delete pages
CREATE POLICY "Admins can delete pages"
  ON public.pages
  FOR DELETE
  TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- RLS Policies for page_sections table
-- Public can view sections of published pages
CREATE POLICY "Public can view sections of published pages"
  ON public.page_sections
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.pages
      WHERE pages.id = page_sections.page_id
      AND pages.status = 'published'
    )
  );

-- Admins can view all sections
CREATE POLICY "Admins can view all sections"
  ON public.page_sections
  FOR SELECT
  TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- Admins can insert sections
CREATE POLICY "Admins can insert sections"
  ON public.page_sections
  FOR INSERT
  TO authenticated
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- Admins can update sections
CREATE POLICY "Admins can update sections"
  ON public.page_sections
  FOR UPDATE
  TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- Admins can delete sections
CREATE POLICY "Admins can delete sections"
  ON public.page_sections
  FOR DELETE
  TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_sections_updated_at
  BEFORE UPDATE ON public.page_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to set published_at when status changes to published
CREATE OR REPLACE FUNCTION public.set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER set_pages_published_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION public.set_published_at();