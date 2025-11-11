import React from 'react';
import parse from 'html-react-parser';

/**
 * @component Hero3_StudioAgency
 * @description Full-screen background hero with scrolling text marquee
 * @category Hero
 * @variant Studio Agency
 * @theme Both (Light & Dark)
 * 
 * @props
 * - title: string - Hero title (supports HTML)
 * - scrollingText: string - Marquee scrolling text
 * - thumbnailSrc: string - Background image URL
 * 
 * @usedIn Studio Agency Page
 * @dependencies html-react-parser
 * @scss sass/shortcode/_hero.scss (.cs_hero.cs_style_3)
 */
export default function Hero3_StudioAgency({ title, scrollingText, thumbnailSrc }) {
  return (
    <section
      className="cs_hero cs_style_3 cs_bg_filed cs_center"
      style={{ backgroundImage: `url(${thumbnailSrc})` }}
    >
      <div className="container">
        <div className="cs_hero_text position-relative">
          <h1 className="cs_hero_title cs_fs_68 text-uppercase">
            {parse(title)}
          </h1>
          <div className="cs_moving_text_wrap">
            <div className="cs_moving_text_in">
              <div className="cs_moving_text">{scrollingText}</div>
              <div className="cs_moving_text">{scrollingText}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
