import React from 'react';
import IconBox from '../../components/IconBox';

/**
 * @component Features1_IconBox
 * @description Standard icon box feature cards with hover effects
 * @category Features
 * @variant Icon Box
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Feature items with iconSrc, title, subTitle, btnText, btnUrl, shapeClass
 * 
 * @usedIn Tech Startup
 * @scss sass/shortcode/_iconbox.scss (.cs_iconbox.cs_style_1)
 */
export default function Features1_IconBox({ data }) {
  return (
    <div className="row cs_gap_y_40">
      {data?.map((item, index) => (
        <div className="col-lg-4" key={index}>
          <IconBox {...item} />
        </div>
      ))}
    </div>
  );
}
