import React from 'react';
import TestimonialSlider from '../../components/Slider/TestimonialSlider';
import Spacing from '../../components/Spacing';

/**
 * @component Testimonials1_Layered
 * @description Layered image testimonial slider with quotes
 * @category Testimonials
 * @variant Layered Images
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Testimonials with text, name, designation, imgUrl
 * 
 * @usedIn Creative Agency, Marketing Agency
 * @dependencies react-slick
 * @scss sass/shortcode/_testimonial.scss
 */
export default function Testimonials1_Layered({ data, layeredImages }) {
  return (
    <>
      <Spacing lg="140" md="80" />
      <TestimonialSlider data={data} layeredImages={layeredImages} />
      <Spacing lg="140" md="80" />
    </>
  );
}
