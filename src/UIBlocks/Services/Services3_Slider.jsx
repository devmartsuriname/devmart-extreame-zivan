import React from 'react';
import ServiceSlider from '../../components/Slider/ServiceSlider';

/**
 * @component Services3_Slider
 * @description Icon-based service carousel/slider
 * @category Services
 * @variant Slider
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Service items with iconUrl, title, subTitle
 * 
 * @usedIn Marketing Agency
 * @dependencies react-slick
 * @scss sass/shortcode/_service.scss, sass/shortcode/_slider.scss
 */
export default function Services3_Slider({ data }) {
  return <ServiceSlider data={data} />;
}
