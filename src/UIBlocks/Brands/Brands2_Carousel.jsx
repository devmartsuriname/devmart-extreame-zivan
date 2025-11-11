import React from 'react';

/**
 * @component Brands2_Carousel
 * @description Alternative brand logo display with carousel wrapper
 * @category Brands
 * @variant Carousel Style
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Brands with logoSrc and logoAlt
 * 
 * @usedIn Tech Startup
 * @scss sass/shortcode/_brands.scss (.cs_brands.cs_style_2)
 */
export default function Brands2_Carousel({ data }) {
  return (
    <div className="cs_brands_2_wrap">
      <div className="cs_brands cs_style_2">
        {data?.map((item, index) => (
          <div className="cs_brand" key={index}>
            <div>
              <img src={item.logoSrc} alt={item.logoAlt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
