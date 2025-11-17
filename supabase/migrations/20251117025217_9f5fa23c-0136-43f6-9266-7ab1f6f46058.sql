-- Create site_settings table for global configuration
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can view settings (needed for frontend branding)
CREATE POLICY "Public can view settings"
  ON site_settings FOR SELECT
  TO public
  USING (true);

-- Only admins can manage settings
CREATE POLICY "Admins can manage settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'super_admin'::app_role)
  )
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- Seed default values
INSERT INTO site_settings (key, value) VALUES
  ('site_identity', '{"site_name": "Devmart Creative Agency", "site_description": "Premium creative agency template"}'),
  ('branding', '{"primary": "#121212", "secondary": "#4f4747", "accent": "#fd6219"}'),
  ('media', '{"logo_light": "", "logo_dark": "", "favicon": "", "og_default": ""}');