import { supabase } from '@/integrations/supabase/client';

/**
 * One-time utility to fix homepage section spacing
 * Run this once and then delete this file
 */
export async function fixHomepageSpacing() {
  try {
    console.log('Fixing homepage spacing...');

    // Get home page ID
    const { data: homePage, error: pageError } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', 'home')
      .single();

    if (pageError) throw pageError;

    // Fix Stats section spacing (before About)
    const { error: statsError } = await supabase
      .from('page_sections')
      .update({
        spacing_after_lg: 185,
        spacing_after_md: 75
      })
      .eq('page_id', homePage.id)
      .eq('block_type', 'Stats1_FunFact');

    if (statsError) throw statsError;
    console.log('✅ Stats spacing updated: 185/75');

    // Fix About section spacing (before WhyChoose)
    const { error: aboutError } = await supabase
      .from('page_sections')
      .update({
        spacing_after_lg: 125,
        spacing_after_md: 70
      })
      .eq('page_id', homePage.id)
      .eq('block_type', 'About1_Standard');

    if (aboutError) throw aboutError;
    console.log('✅ About spacing updated: 125/70');

    console.log('✅ All spacing fixes completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('❌ Error fixing spacing:', error);
    return { success: false, error };
  }
}

// Uncomment to run on page load (then comment out again):
// fixHomepageSpacing();
