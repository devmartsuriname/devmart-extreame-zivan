import React from 'react';
import ServiceStyle2 from '../../components/Service/ServiceStyle2';

/**
 * @component Services2_Numbered
 * @description Numbered service cards with sequential ordering
 * @category Services
 * @variant Numbered
 * @theme Both (Light & Dark)
 * 
 * @props
 * - variantColor: string - Color variant (cs_primary_color, cs_accent_color)
 * - data: array - Service items with number, title, subTitle
 * 
 * @usedIn Studio Agency
 * @scss sass/shortcode/_service.scss (.cs_service.cs_style_2)
 */
export default function Services2_Numbered({ variantColor, data }) {
  return (
    <div className="row cs_gap_y_40">
      {data?.map((item, index) => (
        <div className="col-lg-4" key={index}>
          <ServiceStyle2 variantColor={variantColor} {...item} />
        </div>
      ))}
    </div>
  );
}
