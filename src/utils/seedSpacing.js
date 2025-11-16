/**
 * One-time utility to seed spacing data for homepage sections
 * Run this once by importing and calling in a component, then remove
 */

import { supabase } from '@/integrations/supabase/client';

export async function seedHomepageSpacing() {
  try {
    // Get home page ID
    const { data: homePage, error: pageError } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', 'home')
      .single();

    if (pageError) throw pageError;

    // Update spacing for all sections
    const updates = [
      { block_type: 'Hero1_CreativeAgency', spacing_after_lg: 125, spacing_after_md: 70, has_container: false },
      { block_type: 'Stats1_FunFact', spacing_after_lg: 125, spacing_after_md: 70, has_container: true },
      { block_type: 'About1_Standard', spacing_after_lg: 185, spacing_after_md: 75, has_container: false },
      { block_type: 'WhyChoose1_Standard', spacing_after_lg: 150, spacing_after_md: 80, has_container: false },
      { 
        block_type: 'Services1_Grid', 
        spacing_after_lg: 0, 
        spacing_after_md: 0, 
        section_wrapper_class: 'cs_primary_bg',
        has_container: true 
      },
      { block_type: 'Portfolio1_Grid', spacing_after_lg: 150, spacing_after_md: 80, has_container: false },
      { 
        block_type: 'Awards1_Standard', 
        spacing_after_lg: 0, 
        spacing_after_md: 0,
        section_wrapper_class: 'cs_primary_bg cs_shape_animation_2',
        has_container: true 
      },
      { block_type: 'Testimonials1_Layered', spacing_after_lg: 140, spacing_after_md: 80, has_container: false },
      { block_type: 'CTA1_ImageBackground', spacing_after_lg: 138, spacing_after_md: 70, has_container: false },
      { block_type: 'Blog1_Carousel', spacing_after_lg: 120, spacing_after_md: 80, has_container: false },
      { block_type: 'FAQ1_Accordion', spacing_after_lg: 0, spacing_after_md: 0, has_container: true },
    ];

    for (const update of updates) {
      const { error } = await supabase
        .from('page_sections')
        .update({
          spacing_after_lg: update.spacing_after_lg,
          spacing_after_md: update.spacing_after_md,
          section_wrapper_class: update.section_wrapper_class || null,
          has_container: update.has_container,
        })
        .eq('page_id', homePage.id)
        .eq('block_type', update.block_type);

      if (error) {
        console.error(`Error updating ${update.block_type}:`, error);
        throw error;
      }
    }

    console.log('✅ Homepage spacing updated successfully!');
    return { success: true, updated: updates.length };
    
  } catch (error) {
    console.error('❌ Error seeding spacing:', error);
    throw error;
  }
}
