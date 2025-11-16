-- Add spacing and wrapper columns to page_sections table
ALTER TABLE page_sections 
ADD COLUMN IF NOT EXISTS spacing_after_lg INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS spacing_after_md INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS section_wrapper_class TEXT,
ADD COLUMN IF NOT EXISTS has_container BOOLEAN DEFAULT false;