import React from 'react';
import PostCarousel from '../../components/Post/PostCarousel';

/**
 * @component Blog1_Carousel
 * @description Horizontal scrolling blog post carousel
 * @category Blog
 * @variant Carousel
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Blog posts with thumbnailUrl, title, category, date, url
 * 
 * @usedIn Creative Agency, Marketing Agency
 * @dependencies react-slick
 * @scss sass/shortcode/_post.scss, sass/shortcode/_slider.scss
 */
export default function Blog1_Carousel({ data }) {
  return <PostCarousel data={data} />;
}
