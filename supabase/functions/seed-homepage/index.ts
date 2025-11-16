import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if homepage already exists
    const { data: existingPage } = await supabaseClient
      .from('pages')
      .select('id')
      .eq('slug', 'home')
      .maybeSingle();

    if (existingPage) {
      return new Response(
        JSON.stringify({ error: 'Homepage already exists', pageId: existingPage.id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Create homepage
    const { data: page, error: pageError } = await supabaseClient
      .from('pages')
      .insert({
        title: 'Home',
        slug: 'home',
        meta_description: 'Welcome to Devmart - A creative agency bringing your vision to life',
        meta_keywords: 'creative agency, design, development, branding',
        seo_image: '/images/creative-agency/hero_video_bg_1.jpeg',
        layout: 'Layout2',
        status: 'published'
      })
      .select()
      .single();

    if (pageError) throw pageError;

    // Define all sections with exact data from current homepage
    const sections = [
      {
        order_index: 1,
        block_type: 'Hero1_CreativeAgency',
        block_props: {
          title: [
            'London Based Creative Agency',
            '25+ Years of Experience',
            '30+ Worldwide Partnership',
            'Take World-class Service'
          ],
          subtitle: 'Craft Distinct Brand Image with Expert Guidance & Fresh Approach.',
          videoSrc: 'https://www.youtube.com/embed/VcaAVWtP48A',
          bgUrl: '/images/creative-agency/hero_video_bg_1.jpeg'
        }
      },
      {
        order_index: 2,
        block_type: 'Stats1_FunFact',
        block_props: {
          data: [
            { title: 'Happy Customers', number: '22k' },
            { title: "Work's Completed", number: '15k' },
            { title: 'Skilled Team Members', number: '121' },
            { title: 'Most Valuable Awards', number: '15' }
          ]
        }
      },
      {
        order_index: 3,
        block_type: 'About1_Standard',
        block_props: {
          thumbnail: '/images/creative-agency/about_1.jpeg',
          uperTitle: 'Who We Are',
          title: 'Full-stack creatives and designing agency',
          subTitle: 'Our team, specializing in strategic digital marketing, partners with the world\'s leading brands. Breaking from the norm, we push boundaries and merge imaginative thinking, consumer behavior, and data-driven design with advanced technology to deliver unparalleled brand experiences.',
          featureList: [
            'Designing content with AI power',
            'Trending marketing tools involve',
            'Powerful market strategy use'
          ],
          btnText: 'Learn More',
          btnUrl: '/about'
        }
      },
      {
        order_index: 4,
        block_type: 'WhyChoose1_Standard',
        block_props: {
          sectionTitle: 'We have depth of market knowledge',
          sectionSubTitle: 'Why Choose Us',
          whyChoseFeatureData: [
            {
              title: 'Talented, professional & expert team',
              content: 'Our team, specializing in strategic digital marketing, are not partners with the world is leading brands. Breaking from the norm, we push boundaries and merge.'
            },
            {
              title: 'Highly accuracy AI based system',
              content: 'Our team, specializing in strategic digital marketing, are not partners with the world is leading brands. Breaking from the norm, we push boundaries and merge.'
            },
            {
              title: 'Secret successful brand strategy formula',
              content: 'Our team, specializing in strategic digital marketing, are not partners with the world is leading brands. Breaking from the norm, we push boundaries and merge.'
            }
          ],
          thumbnailSrc: '/images/creative-agency/why_choose_us_img_3.jpeg'
        }
      },
      {
        order_index: 5,
        block_type: 'Services1_Grid',
        block_props: {
          sectionTitle: 'Our core services',
          sectionSubTitle: 'Services',
          data: [
            {
              title: 'WP Development',
              subtitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium lorema doloremque laudantium, totam rem aperiam, eaque ipsa quae.',
              imgUrl: '/images/creative-agency/service_7.jpeg',
              href: '/service/service-details'
            },
            {
              title: 'UI/UX Design',
              subtitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium lorema doloremque laudantium, totam rem aperiam, eaque ipsa quae.',
              imgUrl: '/images/creative-agency/service_8.jpeg',
              href: '/service/service-details'
            },
            {
              title: 'Branding',
              subtitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium lorema doloremque laudantium, totam rem aperiam, eaque ipsa quae.',
              imgUrl: '/images/creative-agency/service_9.jpeg',
              href: '/service/service-details'
            },
            {
              title: 'Social Ad Campaign',
              subtitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium lorema doloremque laudantium, totam rem aperiam, eaque ipsa quae.',
              imgUrl: '/images/creative-agency/service_10.jpeg',
              href: '/service/service-details'
            }
          ]
        }
      },
      {
        order_index: 6,
        block_type: 'Portfolio1_Grid',
        block_props: {
          sectionTitle: 'Some featured work',
          sectionSubTitle: 'Portfolio',
          data: [
            {
              href: '/portfolio/portfolio-details',
              imgUrl: '/images/creative-agency/portfolio_1.jpeg',
              title: 'Awesome colorful artwork',
              btnText: 'See Project'
            },
            {
              href: '/portfolio/portfolio-details',
              imgUrl: '/images/creative-agency/portfolio_2.jpeg',
              title: 'Admin dashboard UI design',
              btnText: 'See Project'
            },
            {
              href: '/portfolio/portfolio-details',
              imgUrl: '/images/creative-agency/portfolio_3.jpeg',
              title: 'Product designing with brand',
              btnText: 'See Project'
            },
            {
              href: '/portfolio/portfolio-details',
              imgUrl: '/images/creative-agency/portfolio_4.jpeg',
              title: 'Kids education website design',
              btnText: 'See Project'
            }
          ],
          showButton: true,
          buttonText: 'See All Project',
          buttonUrl: '/portfolio'
        }
      },
      {
        order_index: 7,
        block_type: 'Awards1_Standard',
        block_props: {
          sectionTitle: 'Our prize achievement',
          sectionSubTitle: 'Awards',
          data: [
            {
              brand: 'Behance',
              title: 'UI/UX design of the month',
              subTitle: 'Accusamus et iusto odio dignissimos ducimus qui blanditiis fedarals praesentium voluptatum deleniti atque corrupti quos dolores',
              date: 'December 12, 2023',
              awardImgUrl: '/images/creative-agency/award_img_1.svg'
            },
            {
              brand: 'Awwwards',
              title: 'CSS awards design',
              subTitle: 'Accusamus et iusto odio dignissimos ducimus qui blanditiis fedarals praesentium voluptatum deleniti atque corrupti quos dolores',
              date: 'November 25, 2023',
              awardImgUrl: '/images/creative-agency/award_img_2.svg'
            },
            {
              brand: 'Dribbble',
              title: 'Web design of the year',
              subTitle: 'Accusamus et iusto odio dignissimos ducimus qui blanditiis fedarals praesentium voluptatum deleniti atque corrupti quos dolores',
              date: 'October 13, 2023',
              awardImgUrl: '/images/creative-agency/award_img_3.svg'
            }
          ]
        }
      },
      {
        order_index: 8,
        block_type: 'Testimonials1_Layered',
        block_props: {
          layeredImages: [
            '/images/creative-agency/layer_img_1.jpeg',
            '/images/creative-agency/layer_img_2.jpeg',
            '/images/creative-agency/layer_img_3.jpeg',
            '/images/creative-agency/layer_img_4.jpeg',
            '/images/creative-agency/layer_img_5.jpeg'
          ],
          data: [
            {
              imgUrl: '/images/creative-agency/avatar_1.jpeg',
              rating: 4.5,
              review: 'I recently had the pleasure of working with Zivan, and I must say, their creativity and professionalism truly exceeded my expectations. They took the time to understand our vision and delivered exceptional results. Highly recommend!',
              name: 'Cristian Torres',
              designation: 'Product Manager, Apple Inc.'
            },
            {
              imgUrl: '/images/creative-agency/avatar_2.jpeg',
              rating: 5,
              review: 'Working with this agency was a game-changer for our business. Their innovative approach and attention to detail helped us achieve remarkable results. The team was responsive and dedicated throughout the entire process.',
              name: 'Sarah Johnson',
              designation: 'CEO, Tech Innovations'
            }
          ]
        }
      },
      {
        order_index: 9,
        block_type: 'CTA1_ImageBackground',
        block_props: {
          title: 'Is there a specific project or goal that you have in mind?',
          btnText: 'Contact Us',
          btnUrl: '/contact',
          bgUrl: '/images/creative-agency/cta_bg.jpeg'
        }
      },
      {
        order_index: 10,
        block_type: 'Blog1_Carousel',
        block_props: {
          sectionTitle: 'Some recent news',
          sectionSubTitle: 'Our Blog',
          data: [
            {
              thumbnailSrc: '/images/creative-agency/post_1.jpeg',
              title: 'Google\'s next billion users will be from Africa',
              date: '05 Jun 2023',
              url: '/blog/blog-details'
            },
            {
              thumbnailSrc: '/images/creative-agency/post_2.jpeg',
              title: 'Artistic mind will be great for creation anything',
              date: '22 Apr 2023',
              url: '/blog/blog-details'
            },
            {
              thumbnailSrc: '/images/creative-agency/post_3.jpeg',
              title: 'AI will take over all job for human within few years',
              date: '13 May 2023',
              url: '/blog/blog-details'
            },
            {
              thumbnailSrc: '/images/creative-agency/post_4.jpeg',
              title: 'Your agency need to replace some artistic mind people',
              date: '15 Mar 2023',
              url: '/blog/blog-details'
            }
          ]
        }
      },
      {
        order_index: 11,
        block_type: 'FAQ1_Accordion',
        block_props: {
          sectionTitle: 'Frequently asked question',
          sectionSubTitle: 'FAQs',
          variant: 'cs_type_1',
          data: [
            {
              question: 'What services does your creative agency offer?',
              answer: 'We offer a comprehensive range of creative services including branding, web design, digital marketing, content creation, and strategic consulting. Our team specializes in crafting unique solutions tailored to your business needs.'
            },
            {
              question: 'How long does a typical project take?',
              answer: 'Project timelines vary depending on scope and complexity. A typical branding project takes 4-6 weeks, while web development can range from 6-12 weeks. We provide detailed timelines during our initial consultation.'
            },
            {
              question: 'What is your pricing structure?',
              answer: 'Our pricing is project-based and depends on the scope of work. We offer flexible packages and custom solutions to fit different budgets. Contact us for a personalized quote based on your specific requirements.'
            },
            {
              question: 'Do you work with international clients?',
              answer: 'Yes! We work with clients worldwide and have experience collaborating across different time zones. Our digital workflow allows us to seamlessly work with teams anywhere in the world.'
            },
            {
              question: 'What makes your agency different?',
              answer: 'We combine strategic thinking with creative excellence. Our team brings together diverse expertise in design, technology, and marketing. We focus on delivering measurable results while creating memorable brand experiences.'
            }
          ]
        }
      }
    ];

    // Insert all sections
    const sectionsToInsert = sections.map(section => ({
      ...section,
      page_id: page.id,
      is_active: true
    }));

    const { error: sectionsError } = await supabaseClient
      .from('page_sections')
      .insert(sectionsToInsert);

    if (sectionsError) throw sectionsError;

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Homepage seeded successfully',
        pageId: page.id,
        sectionsCount: sections.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
