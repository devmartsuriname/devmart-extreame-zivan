import React from 'react';

/**
 * @component Brands1_Standard
 * @description Partner/client logo grid display
 * @category Brands
 * @variant Standard Grid
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Brands with logoSrc and logoAlt
 * 
 * @usedIn Marketing Agency, Studio Agency, Digital Agency
 * @scss sass/shortcode/_brands.scss
 */
export default function Brands1_Standard({ data }) {
  return (
    <div className="cs_brands cs_style_1">
      {data.map((item, index) => (
        <div className="cs_brand" key={index}>
          <img src={item.logoSrc} alt={item.logoAlt} />
        </div>
      ))}
    </div>
  );
}
