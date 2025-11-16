import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get home page ID
    const { data: homePage } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', 'home')
      .single();

    if (!homePage) {
      throw new Error('Home page not found');
    }

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

      if (error) throw error;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Homepage spacing updated successfully',
        updated: updates.length 
      }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  }
});
