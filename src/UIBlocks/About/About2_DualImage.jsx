import React from 'react';
import { Icon } from '@iconify/react';
import Button from '../../components/Button';
import Spacing from '../../components/Spacing';
import { Parallax } from 'react-parallax';

/**
 * @component About2_DualImage
 * @description About section with two parallax images and features
 * @category About
 * @variant Dual Image
 * @theme Both (Light & Dark)
 * 
 * @props
 * - thumbnailSrc1: string - First parallax image
 * - thumbnailSrc2: string - Second parallax image
 * - uperTitle: string - Section subtitle
 * - title: string - Section title
 * - subTitle: string - Description text
 * - featureList: array - List of features
 * - btnText: string - Button text
 * - btnUrl: string - Button URL
 * 
 * @usedIn Marketing Agency
 * @dependencies react-parallax
 * @scss sass/shortcode/_about.scss
 */
export default function About2_DualImage({
  thumbnailSrc1,
  thumbnailSrc2,
  uperTitle,
  title,
  subTitle,
  featureList,
  btnText,
  btnUrl,
}) {
  return (
    <div className="container">
      <div className="row cs_gap_y_40 align-items-center">
        <div className="col-lg-6">
          <div className="cs_section_heading cs_style_1">
            <p className="cs_section_subtitle cs_accent_color cs_fs_18 mb-0">
              {uperTitle}
            </p>
            <Spacing lg="10" md="5" />
            <h2 className="cs_section_title cs_fs_50 mb-0">{title}</h2>
            <Spacing lg="30" md="30" />
            <p className="m-0">{subTitle}</p>
          </div>
          <Spacing lg="40" md="30" />
          <ul className="cs_list cs_style_1 cs_primary_font cs_primary_color cs_semibold cs_mp0 cs_fs_21">
            {featureList?.map((item, index) => (
              <li key={index}>
                <i className="d-flex">
                  <Icon icon="fa6-regular:circle-check" />
                </i>
                {item}
              </li>
            ))}
          </ul>
          <Spacing lg="40" md="30" />
          <Button btnText={btnText} btnUrl={btnUrl} />
        </div>
        <div className="col-lg-5 offset-lg-1">
          <div className="cs_img_card_3_wrap cs_parallax">
            <div className="row">
              <div className="col-6">
                <div className="cs_img_card cs_style_3 cs_radius_15 overflow-hidden">
                  <Parallax
                    bgImage={thumbnailSrc1}
                    bgImageAlt="Thumb"
                    strength={-100}
                    className="h-100"
                  ></Parallax>
                </div>
              </div>
              <div className="col-6">
                <div className="cs_img_card cs_style_3 cs_radius_15 overflow-hidden">
                  <Parallax
                    bgImage={thumbnailSrc2}
                    bgImageAlt="Thumb"
                    strength={100}
                    className="h-100"
                  ></Parallax>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
