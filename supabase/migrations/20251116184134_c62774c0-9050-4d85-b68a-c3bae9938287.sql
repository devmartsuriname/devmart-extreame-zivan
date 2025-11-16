-- Insert page sections for the homepage
-- Page ID: 91cc60b6-fea4-4d1e-8253-db7a72f096fb

INSERT INTO page_sections (page_id, order_index, block_type, block_props, is_active) VALUES

-- Hero Section
('91cc60b6-fea4-4d1e-8253-db7a72f096fb', 1, 'Hero1_CreativeAgency', 
'{
  "title": ["London Based Creative Agency", "25+ Years of Experience", "30+ Worldwide Partnership", "Take World-class Service"],
  "subtitle": "Craft Distinct Brand Image with Expert Guidance & Fresh Approach.",
  "videoSrc": "https://www.youtube.com/embed/VcaAVWtP48A",
  "bgUrl": "/images/creative-agency/hero_video_bg_1.jpeg"
}'::jsonb, true),

-- Stats Section
('91cc60b6-fea4-4d1e-8253-db7a72f096fb', 2, 'Stats1_FunFact',
'{
  "data": [
    {"title": "Happy Customers", "number": "22k"},
    {"title": "Work''s Completed", "number": "15k"},
    {"title": "Skilled Team Members", "number": "121"},
    {"title": "Most Valuable Awards", "number": "15"}
  ]
}'::jsonb, true),

-- About Section
('91cc60b6-fea4-4d1e-8253-db7a72f096fb', 3, 'About1_Standard',
'{
  "thumbnail": "/images/creative-agency/about_1.jpeg",
  "uperTitle": "Who We Are",
  "title": "Full-stack creatives and designing agency",
  "subTitle": "Our team, specializing in strategic digital marketing, partners with the world''s leading brands. Breaking from the norm, we push boundaries and merge imaginative thinking, consumer behavior, and data-driven design with advanced technology to deliver unparalleled brand experiences.",
  "featureList": ["Designing content with AI power", "Trending marketing tools involve", "Powerful market strategy use"],
  "btnText": "Learn More",
  "btnUrl": "/about"
}'::jsonb, true),

-- Why Choose Section
('91cc60b6-fea4-4d1e-8253-db7a72f096fb', 4, 'WhyChoose1_Standard',
'{
  "sectionTitle": "We have depth of market knowledge",
  "sectionSubTitle": "Why Choose Us",
  "whyChoseFeatureData": [
    {
      "title": "Talented, professional & expert team",
      "content": "Our team, specializing in strategic digital marketing, are not partners with the world is leading brands. Breaking from the norm, we push boundaries and merge."
    },
    {
      "title": "Highly accuracy AI based system",
      "content": "Our team, specializing in strategic digital marketing, are not partners with the world is leading brands. Breaking from the norm, we push boundaries and merge."
    },
    {
      "title": "Secret successful brand strategy formula",
      "content": "Our team, specializing in strategic digital marketing, are not partners with the world is leading brands. Breaking from the norm, we push boundaries and merge."
    }
  ],
  "thumbnailSrc": "/images/creative-agency/why_choose_us_img_3.jpeg"
}'::jsonb, true),

-- Services Section
('91cc60b6-fea4-4d1e-8253-db7a72f096fb', 5, 'Services1_Grid',
'{
  "sectionTitle": "Our core services",
  "sectionSubTitle": "Services",
  "data": [
    {
      "title": "WP Development",
      "subtitle": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium lorema doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
      "imgUrl": "/images/creative-agency/service_7.jpeg",
      "href": "/service/service-details"
    },
    {
      "title": "UI/UX Design",
      "subtitle": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium lorema doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
      "imgUrl": "/images/creative-agency/service_8.jpeg",
      "href": "/service/service-details"
    },
    {
      "title": "Branding",
      "subtitle": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium lorema doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
      "imgUrl": "/images/creative-agency/service_9.jpeg",
      "href": "/service/service-details"
    },
    {
      "title": "Social Ad Campaign",
      "subtitle": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium lorema doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
      "imgUrl": "/images/creative-agency/service_10.jpeg",
      "href": "/service/service-details"
    }
  ]
}'::jsonb, true),

-- Portfolio Section
('91cc60b6-fea4-4d1e-8253-db7a72f096fb', 6, 'Portfolio1_Grid',
'{
  "sectionTitle": "Some featured work",
  "sectionSubTitle": "Portfolio",
  "data": [
    {
      "href": "/portfolio/portfolio-details",
      "imgUrl": "/images/creative-agency/portfolio_1.jpeg",
      "title": "Awesome colorful artwork",
      "btnText": "See Project"
    },
    {
      "href": "/portfolio/portfolio-details",
      "imgUrl": "/images/creative-agency/portfolio_2.jpeg",
      "title": "Admin dashboard UI design",
      "btnText": "See Project"
    },
    {
      "href": "/portfolio/portfolio-details",
      "imgUrl": "/images/creative-agency/portfolio_3.jpeg",
      "title": "Product designing with brand",
      "btnText": "See Project"
    },
    {
      "href": "/portfolio/portfolio-details",
      "imgUrl": "/images/creative-agency/portfolio_4.jpeg",
      "title": "Kids education website design",
      "btnText": "See Project"
    }
  ],
  "showButton": true,
  "buttonText": "See All Project",
  "buttonUrl": "/portfolio"
}'::jsonb, true),

-- Awards Section
('91cc60b6-fea4-4d1e-8253-db7a72f096fb', 7, 'Awards1_Standard',
'{
  "sectionTitle": "Our prize achievement",
  "sectionSubTitle": "Awards",
  "data": [
    {
      "brand": "Behance",
      "title": "UI/UX design of the month",
      "subTitle": "Accusamus et iusto odio dignissimos ducimus qui blanditiis fedarals praesentium voluptatum deleniti atque corrupti quos dolores",
      "date": "December 12, 2023",
      "awardImgUrl": "/images/creative-agency/award_img_1.svg"
    },
    {
      "brand": "Awwwards",
      "title": "CSS awards design",
      "subTitle": "Accusamus et iusto odio dignissimos ducimus qui blanditiis fedarals praesentium voluptatum deleniti atque corrupti quos dolores",
      "date": "November 25, 2023",
      "awardImgUrl": "/images/creative-agency/award_img_2.svg"
    },
    {
      "brand": "Dribbble",
      "title": "Web design of the year",
      "subTitle": "Accusamus et iusto odio dignissimos ducimus qui blanditiis fedarals praesentium voluptatum deleniti atque corrupti quos dolores",
      "date": "October 13, 2023",
      "awardImgUrl": "/images/creative-agency/award_img_3.svg"
    }
  ]
}'::jsonb, true),

-- Testimonials Section
('91cc60b6-fea4-4d1e-8253-db7a72f096fb', 8, 'Testimonials1_Layered',
'{
  "layeredImages": [
    "/images/creative-agency/layer_img_1.jpeg",
    "/images/creative-agency/layer_img_2.jpeg",
    "/images/creative-agency/layer_img_3.jpeg",
    "/images/creative-agency/layer_img_4.jpeg",
    "/images/creative-agency/layer_img_5.jpeg"
  ],
  "data": [
    {
      "imgUrl": "/images/creative-agency/avatar_1.jpeg",
      "rating": 4.5,
      "review": "I recently had the pleasure of working with Zivan, and I must say, their creativity and professionalism truly exceeded my expectations. They took the time to understand our vision and delivered exceptional results. Highly recommend!",
      "name": "Cristian Torres",
      "designation": "Product Manager, Apple Inc."
    },
    {
      "imgUrl": "/images/creative-agency/avatar_2.jpeg",
      "rating": 5,
      "review": "Working with this agency was a game-changer for our business. Their innovative approach and attention to detail helped us achieve remarkable results. The team was responsive and dedicated throughout the entire process.",
      "name": "Sarah Johnson",
      "designation": "CEO, Tech Innovations"
    }
  ]
}'::jsonb, true),

-- CTA Section
('91cc60b6-fea4-4d1e-8253-db7a72f096fb', 9, 'CTA1_ImageBackground',
'{
  "title": "Is there a specific project or goal that you have in mind?",
  "btnText": "Contact Us",
  "btnUrl": "/contact",
  "bgUrl": "/images/creative-agency/cta_bg.jpeg"
}'::jsonb, true),

-- Blog Section
('91cc60b6-fea4-4d1e-8253-db7a72f096fb', 10, 'Blog1_Carousel',
'{
  "sectionTitle": "Some recent news",
  "sectionSubTitle": "Our Blog",
  "data": [
    {
      "thumbnailSrc": "/images/creative-agency/post_1.jpeg",
      "title": "Google''s next billion users will be from Africa",
      "date": "05 Jun 2023",
      "url": "/blog/blog-details"
    },
    {
      "thumbnailSrc": "/images/creative-agency/post_2.jpeg",
      "title": "Artistic mind will be great for creation anything",
      "date": "22 Apr 2023",
      "url": "/blog/blog-details"
    },
    {
      "thumbnailSrc": "/images/creative-agency/post_3.jpeg",
      "title": "AI will take over all job for human within few years",
      "date": "13 May 2023",
      "url": "/blog/blog-details"
    },
    {
      "thumbnailSrc": "/images/creative-agency/post_4.jpeg",
      "title": "Your agency need to replace some artistic mind people",
      "date": "15 Mar 2023",
      "url": "/blog/blog-details"
    }
  ]
}'::jsonb, true),

-- FAQ Section
('91cc60b6-fea4-4d1e-8253-db7a72f096fb', 11, 'FAQ1_Accordion',
'{
  "sectionTitle": "Frequently asked question",
  "sectionSubTitle": "FAQs",
  "variant": "cs_type_1",
  "data": [
    {
      "question": "What services does your creative agency offer?",
      "answer": "We offer a comprehensive range of creative services including branding, web design, digital marketing, content creation, and strategic consulting. Our team specializes in crafting unique solutions tailored to your business needs."
    },
    {
      "question": "How long does a typical project take?",
      "answer": "Project timelines vary depending on scope and complexity. A typical branding project takes 4-6 weeks, while web development can range from 6-12 weeks. We provide detailed timelines during our initial consultation."
    },
    {
      "question": "What is your pricing structure?",
      "answer": "Our pricing is project-based and depends on the scope of work. We offer flexible packages and custom solutions to fit different budgets. Contact us for a personalized quote based on your specific requirements."
    },
    {
      "question": "Do you work with international clients?",
      "answer": "Yes! We work with clients worldwide and have experience collaborating across different time zones. Our digital workflow allows us to seamlessly work with teams anywhere in the world."
    },
    {
      "question": "What makes your agency different?",
      "answer": "We combine strategic thinking with creative excellence. Our team brings together diverse expertise in design, technology, and marketing. We focus on delivering measurable results while creating memorable brand experiences."
    }
  ]
}'::jsonb, true);