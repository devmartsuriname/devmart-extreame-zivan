import React from 'react';
import PostGrid from '../../components/Post/PostGrid';

/**
 * @component Blog2_Grid
 * @description Standard grid layout for blog posts
 * @category Blog
 * @variant Grid
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Blog posts with thumbnailUrl, title, category, date, url
 * 
 * @usedIn Studio Agency, Digital Agency
 * @scss sass/shortcode/_post.scss
 */
export default function Blog2_Grid({ data }) {
  return <PostGrid data={data} />;
}
