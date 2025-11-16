-- Fix homepage spacing to match static template
-- Stats section: before About → 185px/75px
-- About section: before WhyChoose → 125px/70px

-- Update Stats section spacing
UPDATE page_sections
SET 
  spacing_after_lg = 185,
  spacing_after_md = 75
WHERE page_id = (SELECT id FROM pages WHERE slug = 'home')
  AND block_type = 'Stats1_FunFact';

-- Update About section spacing
UPDATE page_sections
SET 
  spacing_after_lg = 125,
  spacing_after_md = 70
WHERE page_id = (SELECT id FROM pages WHERE slug = 'home')
  AND block_type = 'About1_Standard';