import React from 'react';

/**
 * @component Stats1_FunFact
 * @description Counter stats/fun fact section with animated numbers
 * @category Stats
 * @variant Fun Fact
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Stat items with number and title
 * - colorVariant: string - Optional color variant class
 * 
 * @usedIn Creative Agency, Marketing Agency, Digital Agency
 * @scss sass/shortcode/_funfact.scss
 */
export default function Stats1_FunFact({ data, colorVariant }) {
  return (
    <div className="cs_counter_1_wrap">
      {data.map((item, index) => (
        <div
          className={`cs_counter cs_style_1 position-relative d-flex align-items-center ${
            colorVariant ? colorVariant : ''
          }`}
          key={index}
        >
          <div
            className={`cs_counter_nmber mb-0 cs_fs_68 d-flex align-items-center cs_bold cs_primary_color`}
          >
            {item.number}
          </div>
          <p className="cs_counter_title mb-0">{item.title}</p>
        </div>
      ))}
    </div>
  );
}
