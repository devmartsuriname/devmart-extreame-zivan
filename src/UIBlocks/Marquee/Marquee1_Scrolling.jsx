import React from 'react';

/**
 * @component Marquee1_Scrolling
 * @description Infinite horizontal scrolling text marquee
 * @category Marquee
 * @variant Scrolling Text
 * @theme Both (Light & Dark)
 * 
 * @props
 * - text: string - Text to scroll
 * 
 * @usedIn Marketing Agency, Studio Agency, Digital Agency, About Page
 * @scss sass/shortcode/_marquee.scss
 */
export default function Marquee1_Scrolling({ text }) {
  return (
    <div className="cs_moving_text_wrap cs_style_1 cs_fs_68 text-uppercase cs_bold cs_primary_font">
      <div className="cs_moving_text_in">
        <div className="cs_moving_text">{text}</div>
        <div className="cs_moving_text">{text}</div>
      </div>
    </div>
  );
}
