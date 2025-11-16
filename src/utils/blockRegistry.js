// Dynamic import mapping for all UI blocks
const blockComponents = {
  // Hero Blocks
  'Hero1_CreativeAgency': () => import('@/UIBlocks/Hero/Hero1_CreativeAgency'),
  'Hero2_MarketingAgency': () => import('@/UIBlocks/Hero/Hero2_MarketingAgency'),
  'Hero3_StudioAgency': () => import('@/UIBlocks/Hero/Hero3_StudioAgency'),
  'Hero4_DigitalAgency': () => import('@/UIBlocks/Hero/Hero4_DigitalAgency'),
  'Hero5_TechStartup': () => import('@/UIBlocks/Hero/Hero5_TechStartup'),
  
  // About Blocks
  'About1_Standard': () => import('@/UIBlocks/About/About1_Standard'),
  'About2_DualImage': () => import('@/UIBlocks/About/About2_DualImage'),
  'About3_CTAStyle': () => import('@/UIBlocks/About/About3_CTAStyle'),
  'About5_VideoProgress': () => import('@/UIBlocks/About/About5_VideoProgress'),
  
  // Stats Blocks
  'Stats1_FunFact': () => import('@/UIBlocks/Stats/Stats1_FunFact'),
  
  // Services Blocks
  'Services1_Grid': () => import('@/UIBlocks/Services/Services1_Grid'),
  'Services2_Numbered': () => import('@/UIBlocks/Services/Services2_Numbered'),
  'Services3_Slider': () => import('@/UIBlocks/Services/Services3_Slider'),
  
  // Portfolio Blocks
  'Portfolio1_Grid': () => import('@/UIBlocks/Portfolio/Portfolio1_Grid'),
  'Portfolio2_Slider': () => import('@/UIBlocks/Portfolio/Portfolio2_Slider'),
  
  // Why Choose Blocks
  'WhyChoose1_Standard': () => import('@/UIBlocks/WhyChoose/WhyChoose1_Standard'),
  
  // Awards Blocks
  'Awards1_Standard': () => import('@/UIBlocks/Awards/Awards1_Standard'),
  
  // Testimonials Blocks
  'Testimonials1_Layered': () => import('@/UIBlocks/Testimonials/Testimonials1_Layered'),
  'Testimonials2_Alternative': () => import('@/UIBlocks/Testimonials/Testimonials2_Alternative'),
  
  // CTA Blocks
  'CTA1_ImageBackground': () => import('@/UIBlocks/CTA/CTA1_ImageBackground'),
  'CTA2_Centered': () => import('@/UIBlocks/CTA/CTA2_Centered'),
  
  // Blog Blocks
  'Blog1_Carousel': () => import('@/UIBlocks/Blog/Blog1_Carousel'),
  'Blog2_Grid': () => import('@/UIBlocks/Blog/Blog2_Grid'),
  'Blog3_GridAlt': () => import('@/UIBlocks/Blog/Blog3_GridAlt'),
  
  // FAQ Blocks
  'FAQ1_Accordion': () => import('@/UIBlocks/FAQ/FAQ1_Accordion'),
  
  // Features Blocks
  'Features1_IconBox': () => import('@/UIBlocks/Features/Features1_IconBox'),
  'Features2_ListBased': () => import('@/UIBlocks/Features/Features2_ListBased'),
  
  // Team Blocks
  'Team1_Slider': () => import('@/UIBlocks/Team/Team1_Slider'),
  
  // Video Blocks
  'Video1_Modal': () => import('@/UIBlocks/Video/Video1_Modal'),
  
  // Pricing Blocks
  'Pricing1_Table': () => import('@/UIBlocks/Pricing/Pricing1_Table'),
  
  // Marquee Blocks
  'Marquee1_Scrolling': () => import('@/UIBlocks/Marquee/Marquee1_Scrolling'),
  
  // Brands Blocks
  'Brands1_Standard': () => import('@/UIBlocks/Brands/Brands1_Standard'),
  'Brands2_Carousel': () => import('@/UIBlocks/Brands/Brands2_Carousel'),
  
  // Case Study Blocks
  'CaseStudy1_Marketing': () => import('@/UIBlocks/CaseStudy/CaseStudy1_Marketing'),
};

// Cache for loaded components
const componentCache = new Map();

/**
 * Load a UI block component dynamically
 * @param {string} blockType - The block type identifier
 * @returns {Promise<React.Component|null>} The loaded component or null if not found
 */
export const loadBlock = async (blockType) => {
  // Check cache first
  if (componentCache.has(blockType)) {
    return componentCache.get(blockType);
  }
  
  // Check if block type exists
  if (!blockComponents[blockType]) {
    console.error(`Block type "${blockType}" not found in registry`);
    return null;
  }
  
  try {
    const module = await blockComponents[blockType]();
    const Component = module.default;
    componentCache.set(blockType, Component);
    return Component;
  } catch (error) {
    console.error(`Failed to load block "${blockType}":`, error);
    return null;
  }
};

/**
 * Preload commonly used blocks for better performance
 * @param {string[]} blockTypes - Array of block type identifiers
 */
export const preloadBlocks = async (blockTypes) => {
  const loadPromises = blockTypes.map(type => loadBlock(type));
  await Promise.all(loadPromises);
};
