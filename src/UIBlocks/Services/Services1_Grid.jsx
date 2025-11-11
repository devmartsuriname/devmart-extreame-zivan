import React from 'react';
import Service from '../../components/Service';
import Spacing from '../../components/Spacing';
import SectionHeading from '../../components/SectionHeading';

/**
 * @component Services1_Grid
 * @description Grid layout service cards with icons
 * @category Services
 * @variant Grid
 * @theme Both (Light & Dark)
 * 
 * @props
 * - sectionTitle: string - Section heading
 * - sectionSubTitle: string - Section subtitle
 * - data: array - Service items with icon, title, subTitle, url
 * 
 * @usedIn Creative Agency, Studio Agency
 * @scss sass/shortcode/_service.scss
 */
export default function Services1_Grid({ sectionTitle, sectionSubTitle, data }) {
  return (
    <>
      <div className="cs_section_heading cs_style_1 text-center">
        <SectionHeading title={sectionTitle} subTitle={sectionSubTitle} />
      </div>
      <Spacing lg="90" md="45" />
      <div className="row cs_gap_y_50">
        {data?.map((item, index) => (
          <div className="col-lg-4" key={index}>
            <Service {...item} />
          </div>
        ))}
      </div>
    </>
  );
}
