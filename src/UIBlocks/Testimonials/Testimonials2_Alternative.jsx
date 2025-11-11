import React from 'react';
import TestimonialSliderStyle2 from '../../components/Slider/TestimonialSliderStyle2';

/**
 * @component Testimonials2_Alternative
 * @description Alternative testimonial slider style
 * @category Testimonials
 * @variant Alternative Style
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Testimonials with text, name, designation, imgUrl
 * 
 * @usedIn Studio Agency, Digital Agency, Tech Startup
 * @dependencies react-slick
 * @scss sass/shortcode/_testimonial.scss (.cs_testimonial.cs_style_2)
 */
export default function Testimonials2_Alternative({ data }) {
  return <TestimonialSliderStyle2 data={data} />;
}
