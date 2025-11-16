import React from 'react';
import Portfolio from '../../components/Portfolio';
import Spacing from '../../components/Spacing';
import SectionHeading from '../../components/SectionHeading';
import Button from '../../components/Button';

/**
 * @component Portfolio1_Grid
 * @description Grid portfolio with hover effects and filtering
 * @category Portfolio
 * @variant Grid
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Portfolio items with imgUrl, title, btnText, href
 * - sectionTitle: string - Section heading
 * - sectionSubTitle: string - Section subtitle
 * - buttonText: string - CTA button text
 * - buttonUrl: string - CTA button URL
 * - showButton: boolean - Whether to show CTA button
 * 
 * @usedIn Creative Agency, Studio Agency
 * @scss sass/shortcode/_portfolio.scss
 */
export default function Portfolio1_Grid({ 
  data, 
  sectionTitle, 
  sectionSubTitle, 
  buttonText = 'View All Projects', 
  buttonUrl = '/portfolio',
  showButton = false 
}) {
  return (
    <>
      <Spacing lg="143" md="75" />
      <div className="container">
        {sectionTitle && (
          <>
            <div className="cs_section_heading cs_style_1 text-center">
              <SectionHeading title={sectionTitle} subTitle={sectionSubTitle} />
            </div>
            <Spacing lg="85" md="45" />
          </>
        )}
        <Portfolio data={data} />
        {showButton && (
          <>
            <Spacing lg="26" md="30" />
            <div className="text-center">
              <Button btnText={buttonText} btnUrl={buttonUrl} />
            </div>
          </>
        )}
      </div>
      <Spacing lg="150" md="80" />
    </>
  );
}
