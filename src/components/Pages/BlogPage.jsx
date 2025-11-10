import React, { useState } from 'react';
import Spacing from '../Spacing';
import SectionHeadingStyle3 from '../SectionHeading/SectionHeadingStyle3';
import PostStyle4 from '../Post/PostStyle4';
import { Icon } from '@iconify/react';
import Sidebar from '../Sidebar';
import { pageTitle } from '../../helpers/PageTitle';
const blogData = [
  {
    thumbnailSrc: '/images/blog/post_1.jpeg',
    category: 'Branding',
    title: 'Strategies for building a strong brand identity',
    subTitle:
      'From social media to SEO, branding to lead generation, our team of experienced marketers shares their expertise and industry knowledge to help you stay ahead of the curve...',
    href: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/blog/post_2.jpeg',
    category: 'LifeStyle',
    title: 'Best SEO practices for better web page rankings',
    subTitle:
      'From social media to SEO, branding to lead generation, our team of experienced marketers shares their expertise and industry knowledge to help you stay ahead of the curve...',
    href: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/blog/post_3.jpeg',
    category: 'Travel',
    title: 'Strategies for building a strong brand identity',
    subTitle:
      'From social media to SEO, branding to lead generation, our team of experienced marketers shares their expertise and industry knowledge to help you stay ahead of the curve...',
    href: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/blog/post_4.jpeg',
    category: 'Event',
    title: 'Strategies for building a strong brand identity',
    subTitle:
      'From social media to SEO, branding to lead generation, our team of experienced marketers shares their expertise and industry knowledge to help you stay ahead of the curve...',
    href: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/blog/post_5.jpeg',
    category: 'Tech',
    title: 'Inspiration for creating compelling visuals',
    subTitle:
      'From social media to SEO, branding to lead generation, our team of experienced marketers shares their expertise and industry knowledge to help you stay ahead of the curve...',
    href: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/blog/post_1.jpeg',
    category: 'Branding',
    title: 'Strategies for building a strong brand identity',
    subTitle:
      'From social media to SEO, branding to lead generation, our team of experienced marketers shares their expertise and industry knowledge to help you stay ahead of the curve...',
    href: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/blog/post_2.jpeg',
    category: 'LifeStyle',
    title: 'Best SEO practices for better web page rankings',
    subTitle:
      'From social media to SEO, branding to lead generation, our team of experienced marketers shares their expertise and industry knowledge to help you stay ahead of the curve...',
    href: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/blog/post_3.jpeg',
    category: 'Travel',
    title: 'Strategies for building a strong brand identity',
    subTitle:
      'From social media to SEO, branding to lead generation, our team of experienced marketers shares their expertise and industry knowledge to help you stay ahead of the curve...',
    href: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/blog/post_4.jpeg',
    category: 'Event',
    title: 'Strategies for building a strong brand identity',
    subTitle:
      'From social media to SEO, branding to lead generation, our team of experienced marketers shares their expertise and industry knowledge to help you stay ahead of the curve...',
    href: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/blog/post_5.jpeg',
    category: 'Tech',
    title: 'Inspiration for creating compelling visuals',
    subTitle:
      'From social media to SEO, branding to lead generation, our team of experienced marketers shares their expertise and industry knowledge to help you stay ahead of the curve...',
    href: '/blog/blog-details',
  },
];

export default function BlogPage() {
  const [itemShow, setItemShow] = useState(4);
  pageTitle('Blog');
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      <SectionHeadingStyle3
        title="Stay up to date with our <br>latest blog post"
        subTitle="Recent Blog"
        variant="text-center"
        shape="shape_5"
      />
      <Spacing lg="75" md="60" />
      <div className="container">
        <div className="row cs_gap_y_60">
          <div className="col-lg-8">
            {blogData.slice(0, itemShow).map((item, index) => (
              <PostStyle4
                key={index}
                thumbnailSrc={item.thumbnailSrc}
                category={item.category}
                title={item.title}
                subTitle={item.subTitle}
                href={item.href}
              />
            ))}
            {blogData.length <= itemShow ? (
              ''
            ) : (
              <div className="text-center">
                <Spacing lg="95" md="50" />
                <span
                  className="cs_btn cs_style_1"
                  onClick={() => setItemShow(itemShow + 3)}
                >
                  Load More Blog
                  <span>
                    <i>
                      <Icon icon="fa6-solid:arrow-right" />
                    </i>
                    <i>
                      <Icon icon="fa6-solid:arrow-right" />
                    </i>
                  </span>
                </span>
              </div>
            )}
          </div>
          <div className="col-lg-3 offset-lg-1">
            <Sidebar />
          </div>
        </div>
        <Spacing lg="150" md="80" />
      </div>
    </>
  );
}
