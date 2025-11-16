import React from 'react';
import Spacing from '../../components/Spacing';
import SectionHeading from '../../components/SectionHeading';

/**
 * @component Awards1_Standard
 * @description Award showcase section with brand, title, and date
 * @category Awards
 * @variant Standard
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Awards with brand, title, subTitle, date, awardImgUrl
 * - sectionTitle: string - Section title
 * - sectionSubTitle: string - Section subtitle
 * 
 * @usedIn Creative Agency, Marketing Agency
 * @scss sass/shortcode/_award.scss
 */
export default function Awards1_Standard({ data, sectionTitle, sectionSubTitle }) {
  return (
    <>
      <Spacing lg="143" md="75" />
      <div className="container">
        {(sectionTitle || sectionSubTitle) && (
          <>
            <div className="cs_section_heading cs_style_1 text-center">
              <SectionHeading 
                title={sectionTitle} 
                subTitle={sectionSubTitle}
                variantColor="cs_white_color"
              />
            </div>
            <Spacing lg="60" md="40" />
          </>
        )}
        <div className="cs_awaard_1_list">
          {data?.map((item, index) => (
            <div className="cs_awaard cs_style_1" key={index}>
              <h3 className="cs_awaard_brand mb-0 cs_fs_29 cs_semibold cs_accent_color">
                {item.brand}
              </h3>
              <div className="cs_awaard_info">
                <h2 className="cs_awaard_title cs_fs_29 cs_white_color cs_semibold">
                  {item.title}
                </h2>
                <p className="cs_awaard_subtitle mb-0">{item.subTitle}</p>
              </div>
              <h3 className="cs_awaard_time cs_white_color cs_semibold mb-0 cs_fs_29">
                {item.date}
              </h3>
              <div className="cs_award_img">
                <img src={item.awardImgUrl} alt="Award" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Spacing lg="143" md="75" />
    </>
  );
}
