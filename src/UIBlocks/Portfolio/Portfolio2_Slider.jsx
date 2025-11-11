import React from 'react';
import PortfolioSlider from '../../components/Slider/PortfolioSlider';

/**
 * @component Portfolio2_Slider
 * @description Full-width portfolio carousel showcase
 * @category Portfolio
 * @variant Slider
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Portfolio items with thumbnailSrc, title, subTitle, url
 * 
 * @usedIn Digital Agency
 * @dependencies react-slick
 * @scss sass/shortcode/_portfolio.scss, sass/shortcode/_slider.scss
 */
export default function Portfolio2_Slider({ data }) {
  return <PortfolioSlider data={data} />;
}
