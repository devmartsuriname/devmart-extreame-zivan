-- Add missing columns to media_library
ALTER TABLE public.media_library 
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN IF NOT EXISTS usage_count INTEGER DEFAULT 0;

-- Create GIN index for tag search performance (GIN is better for array containment queries)
CREATE INDEX IF NOT EXISTS idx_media_tags ON public.media_library USING GIN (tags);

-- Create media_usage tracking table
CREATE TABLE IF NOT EXISTS public.media_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id UUID NOT NULL REFERENCES public.media_library(id) ON DELETE CASCADE,
  used_in TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for media_usage
CREATE INDEX IF NOT EXISTS idx_media_usage_media_id ON public.media_usage(media_id);
CREATE INDEX IF NOT EXISTS idx_media_usage_used_in ON public.media_usage(used_in);

-- Enable RLS on media_usage
ALTER TABLE public.media_usage ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate with editor role
DROP POLICY IF EXISTS "Admins can manage media" ON public.media_library;
DROP POLICY IF EXISTS "Admins can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete media" ON storage.objects;

-- RLS Policies for media_library (include editor role)
CREATE POLICY "Admins and editors can manage media"
ON public.media_library FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'editor')
)
WITH CHECK (
  public.has_role(auth.uid(), 'super_admin') OR
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'editor')
);

-- RLS Policies for media_usage
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

-- Storage Bucket RLS Policies (include editor role)
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

-- Update storage bucket to include application/zip
UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
  'application/zip',
  'video/mp4',
  'video/webm'
]
WHERE id = 'media';

-- Create RPC function for incrementing media usage count
CREATE OR REPLACE FUNCTION public.increment_media_usage(media_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE media_library
  SET usage_count = usage_count + 1
  WHERE id = media_id;
END;
$$;