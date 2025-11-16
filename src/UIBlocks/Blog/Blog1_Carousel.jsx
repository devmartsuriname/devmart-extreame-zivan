import React from 'react';
import PostCarousel from '../../components/Slider/PostCarousel';
import SectionHeading from '../../components/SectionHeading';
import Spacing from '../../components/Spacing';

/**
 * @component Blog1_Carousel
 * @description Horizontal scrolling blog post carousel with section heading
 * @category Blog
 * @variant Carousel
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Blog posts with thumbnailUrl, title, category, date, url
 * - sectionTitle: string - Section title
 * - sectionSubTitle: string - Section subtitle
 * 
 * @usedIn Creative Agency, Marketing Agency
 * @dependencies react-slick
 * @scss sass/shortcode/_post.scss, sass/shortcode/_slider.scss
 */
export default function Blog1_Carousel({ data, sectionTitle, sectionSubTitle }) {
  return (
    <section className="cs_p76_full_width">
      <Spacing lg="143" md="75" />
      <div className="container">
        {(sectionTitle || sectionSubTitle) && (
          <>
            <SectionHeading title={sectionTitle} subTitle={sectionSubTitle} />
            <Spacing lg="85" md="45" />
          </>
        )}
      </div>
      <PostCarousel data={data} />
    </section>
  );
}
