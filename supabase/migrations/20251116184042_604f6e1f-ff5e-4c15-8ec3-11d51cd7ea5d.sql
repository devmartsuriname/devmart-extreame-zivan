-- Seed Homepage for Dynamic Pages Module
-- This creates the homepage with all 11 sections matching the current design

-- Insert homepage
INSERT INTO pages (title, slug, meta_description, meta_keywords, seo_image, layout, status, published_at)
VALUES (
  'Home',
  'home',
  'Welcome to Devmart - A creative agency bringing your vision to life',
  'creative agency, design, development, branding',
  '/images/creative-agency/hero_video_bg_1.jpeg',
  'Layout2',
  'published',
  now()
) RETURNING id;

-- Note: After this migration runs, you'll need to manually insert the page_sections
-- or use the seed-homepage edge function to complete the seeding process