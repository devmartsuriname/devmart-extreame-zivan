import React from 'react';
import IconBoxStyle2 from '../../components/IconBox/IconBoxStyle2';

/**
 * @component Features2_ListBased
 * @description List-based feature boxes with bullet points
 * @category Features
 * @variant List Based
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Feature items with iconSrc, title, subTitle, features array
 * 
 * @usedIn Tech Startup
 * @scss sass/shortcode/_iconbox.scss (.cs_iconbox.cs_style_2)
 */
export default function Features2_ListBased({ data }) {
  return (
    <div className="row cs_gap_y_40">
      {data?.map((item, index) => (
        <div className="col-lg-4" key={index}>
          <IconBoxStyle2 {...item} />
        </div>
      ))}
    </div>
  );
}
