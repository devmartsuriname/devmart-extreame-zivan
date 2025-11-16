import React from 'react';
import PostGridStyle2 from '../../components/PostGrid/PostGridStyle2';

/**
 * @component Blog3_GridAlt
 * @description Alternative grid style for blog posts
 * @category Blog
 * @variant Grid Alternative
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Blog posts with thumbnailUrl, title, category, date, url
 * 
 * @usedIn Tech Startup
 * @scss sass/shortcode/_post.scss (.cs_post.cs_style_2)
 */
export default function Blog3_GridAlt({ data }) {
  return <PostGridStyle2 data={data} />;
}
