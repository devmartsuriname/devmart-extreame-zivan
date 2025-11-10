import React from 'react';
import HeroStyle4 from '../Hero/HeroStyle4';
import Spacing from '../Spacing';
import SectionHeading from '../SectionHeading';
import PostGridStyle2 from '../PostGrid/PostGridStyle2';
import Marquee from '../Marquee';
import Brands from '../Brands';
import Cta from '../Cta';
import TestimonialSlider from '../Slider/TestimonialSlider';
import FunFact from '../FunFact';
import AboutStyle4 from '../About/AboutStyle4';
import AboutStyle5 from '../About/AboutStyle5';
import IconBoxStyle2 from '../IconBox/IconBoxStyle2';
import PortfolioSlider from '../Slider/PortfolioSlider';
import PricingTableList from '../PricingTable/PricingTableList';
import { pageTitle } from '../../helpers/PageTitle';
const funfactData = [
  { title: 'Happy Customers', number: '22k' },
  { title: 'Work’s Completed', number: '15k' },
  { title: 'Skilled Team Members', number: '121' },
  { title: 'Most Valuable Awards', number: '15' },
];
const postData = [
  {
    date: '05 Mar 2023',
    title: 'How to keep fear from ruining your art business with confident',
    thumbnailSrc: '/images/studio-agency/post_2.jpeg',
    href: '/blog/blog-details',
  },
  {
    date: '07 Mar 2023',
    title: 'Artistic mind will be great for creation anything',
    thumbnailSrc: '/images/studio-agency/post_1.jpeg',
    href: '/blog/blog-details',
  },
  {
    date: '03 Mar 2023',
    title: 'How to keep fear from ruining your art business with confident',
    thumbnailSrc: '/images/studio-agency/post_3.jpeg',
    href: '/blog/blog-details',
  },
  {
    date: '02 Mar 2023',
    title: 'How to keep fear from ruining your art business with confident',
    thumbnailSrc: '/images/studio-agency/post_4.jpeg',
    href: '/blog/blog-details',
  },
];
const brandList = [
  {
    logoSrc: '/images/marketing-agency/brand_1.svg',
    logoAlt: 'Brand',
  },
  {
    logoSrc: '/images/marketing-agency/brand_2.svg',
    logoAlt: 'Brand',
  },
  {
    logoSrc: '/images/marketing-agency/brand_3.svg',
    logoAlt: 'Brand',
  },
  {
    logoSrc: '/images/marketing-agency/brand_4.svg',
    logoAlt: 'Brand',
  },
];
const brandListDark = [
  {
    logoSrc: '/images/marketing-agency/brand_1_dark.svg',
    logoAlt: 'Brand',
  },
  {
    logoSrc: '/images/marketing-agency/brand_2_dark.svg',
    logoAlt: 'Brand',
  },
  {
    logoSrc: '/images/marketing-agency/brand_3_dark.svg',
    logoAlt: 'Brand',
  },
  {
    logoSrc: '/images/marketing-agency/brand_4_dark.svg',
    logoAlt: 'Brand',
  },
];
const testimonialData = [
  {
    text: 'Zivans Motion Graphics did an excellent job on my video related projects. The motion graphics added an extra layer of polish and really brought the video to life. I highly recommend their high quality services and work.',
    avatarName: 'Ansari Patron',
    avatarDesignation: 'CEO at Delta',
  },
  {
    text: 'Zivans Motion Graphics did an excellent job on my video related projects. The motion graphics added an extra layer of polish and really brought the video to life. I highly recommend their high quality services and work.',
    avatarName: 'Jhon Doe',
    avatarDesignation: 'Manager at Delta',
  },
  {
    text: 'Zivans Motion Graphics did an excellent job on my video related projects. The motion graphics added an extra layer of polish and really brought the video to life. I highly recommend their high quality services and work.',
    avatarName: 'Ramatam Coo',
    avatarDesignation: 'MD at Delta',
  },
];
const portfolioData = [
  {
    thumbnailSrc: '/images/digital-agency/portfolio_1.jpeg',
    miniTitle: 'React Development',
    title: 'Corporate Webly <br />Application',
    subTitle:
      'From designing the user interface to coding the functionality and ensuring the <br /> website is secure and optimized for performance.',
    href: '/portfolio/portfolio-details',
  },
  {
    thumbnailSrc: '/images/digital-agency/portfolio_2.jpeg',
    miniTitle: 'UI/UX Design',
    title: 'eCommerce User <br />Interface Design',
    subTitle:
      'From designing the user interface to coding the functionality and ensuring the <br /> website is secure and optimized for performance.',
    href: '/portfolio/portfolio-details',
  },
  {
    thumbnailSrc: '/images/digital-agency/portfolio_3.jpeg',
    miniTitle: '3D Render',
    title: 'Multi Dimension <br />Two Square',
    subTitle:
      'From designing the user interface to coding the functionality and ensuring the <br /> website is secure and optimized for performance.',
    href: '/portfolio/portfolio-details',
  },
  {
    thumbnailSrc: '/images/digital-agency/portfolio_4.jpeg',
    miniTitle: 'Animation',
    title: 'Animated Abstract <br />3D Background',
    subTitle:
      'From designing the user interface to coding the functionality and ensuring the <br /> website is secure and optimized for performance.',
    href: '/portfolio/portfolio-details',
  },
];

export default function DigitalAgencyPage({ darkMode }) {
  pageTitle('Digital Agency');
  return (
    <>
      <HeroStyle4
        title="Mastering Digital Realm, Exploring the Dynamic World of Our Digital Studio"
        subTitle="Our agency offers a comprehensive suite of lots services, including Branding, Advertising, Social marketing, Video making, and Marketing analysis."
        thumbnailSrc={
          darkMode
            ? '/images/digital-agency/hero_bg_dark.jpeg'
            : '/images/digital-agency/hero_bg.jpeg'
        }
        videoSrc="https://www.youtube.com/embed/VcaAVWtP48A"
        bgUrl="/images/digital-agency/hero_video_bg.jpeg"
      />
      <div className="cs_primary_bg">
        <Spacing lg="125" md="80" />
        <div className="container">
          <FunFact data={funfactData} colorVariant="cs_color_1" />
        </div>
        <Spacing lg="125" md="80" />
      </div>
      <Spacing lg="150" md="80" />
      <AboutStyle4
        thumbnailSrc="/images/digital-agency/about_1.jpeg"
        miniTitle="Company Info"
        title="Marketing agency for your business"
        subTitle="Our team, specializing in strategic digital marketing, partners with aiming the world's leading brands. Breaking from the norm, we push boundaries and do merge imaginative thinking posible.
        dolores eos qui ratione voluptatem lipe sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam ever the world lorem ipsum."
        btnText="See Our Services"
        btnUrl="/service"
      />

      <Spacing lg="150" md="80" />
      <AboutStyle5
        thumbnailSrc="/images/digital-agency/about_2.jpeg"
        videoSrc="/images/digital-agency/video.mp4"
        miniTitle="What We Do"
        title="Best value service provider agency"
        subTitle="We make specializing in strategic digital marketing, partners with aiming the world's leading brands. Breaking from the norm, we push boundaries and do merge imaginative thinking posible dolores."
        progressBarList={[
          { title: 'Digital Marketing', percentage: '75' },
          { title: 'Brand Strategy', percentage: '85' },
          { title: 'Competitor Analysis', percentage: '95' },
        ]}
      />
      <Spacing lg="150" md="80" />
      <section className="cs_primary_bg">
        <Spacing lg="143" md="75" />
        <div className="container">
          <SectionHeading
            title="Exceeding expectations our <br />service is our promise"
            subTitle="Services"
            variantColor="cs_white_color"
          />
          <Spacing lg="85" md="45" />
          <div className="row cs_gap_y_45">
            <div className="col-lg-3 col-sm-6">
              <IconBoxStyle2
                iconSrc="/images/digital-agency/service_icon_1.svg"
                title="Brand Stratege"
                subTitle="Brand's strategy and insights are a forward-thinking blueprint for success."
                features={[
                  'Business Development',
                  'Research & Branding',
                  'Strategy Services',
                  'Business Consulting',
                  'Idea Generate',
                  'Search Engine Optimize',
                ]}
              />
            </div>
            <div className="col-lg-3 col-sm-6">
              <IconBoxStyle2
                iconSrc="/images/digital-agency/service_icon_2.svg"
                title="UI/UX Design"
                subTitle="Help reinforce your brand's identity & cultivate positive user behaviors."
                features={[
                  'UX Research',
                  'Trend Analysis',
                  'A/B Testing',
                  'Information Architecture',
                  'Mockup Design',
                  'Color Analysis',
                ]}
              />
            </div>
            <div className="col-lg-3 col-sm-6">
              <IconBoxStyle2
                iconSrc="/images/digital-agency/service_icon_3.svg"
                title="Animation"
                subTitle="Bringing stories to life the power of modern age animation."
                features={[
                  'Idea Generate',
                  'Story Writing',
                  'White Board Animation',
                  'Advertise Animation',
                  'Video Editing',
                ]}
              />
            </div>
            <div className="col-lg-3 col-sm-6">
              <IconBoxStyle2
                iconSrc="/images/digital-agency/service_icon_4.svg"
                title="Web Development"
                subTitle="Exploring the World of Web Development in zivan digital agency."
                features={[
                  'UI/UX Design',
                  'React Application',
                  'eCommerce Development',
                  'Business Website',
                  'App Development',
                  'Web Application',
                ]}
              />
            </div>
          </div>
        </div>
        <Spacing lg="143" md="75" />
      </section>
      <section>
        <Spacing lg="143" md="75" />
        <div className="container">
          <SectionHeading title="Some featured work" subTitle="Portfolio" />
          <Spacing lg="85" md="45" />
        </div>
        <PortfolioSlider data={portfolioData} />
        <Spacing lg="150" md="80" />
      </section>
      <section className="cs_gray_bg_2 cs_shape_animation_2">
        <div className="cs_shape_1 position-absolute">
          <svg
            width={57}
            height={41}
            viewBox="0 0 57 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M55.1923 32.7347C52.209 37.0618 42.704 43.3879 40.3199 34.8097C39.0585 30.2359 42.6536 24.5172 43.1266 19.9687C43.8204 13.2821 39.973 5.41874 32.4359 6.05135C31.8886 6.10385 31.3452 6.19047 30.8086 6.31072C29.5308 4.21019 27.6918 2.5107 25.5002 1.40489C23.3085 0.299087 20.8519 -0.168816 18.4087 0.0542238C11.0797 0.743766 5.31489 7.39247 2.40097 13.6616C0.297443 17.9159 -0.0470809 22.831 1.44227 27.3386C2.02253 28.9897 4.52649 28.3381 4.07868 26.6111C2.33789 19.994 6.55742 12.4976 11.1238 7.99978C15.6903 3.50194 23.1517 2.572 26.8919 7.71511C22.3191 9.96086 18.2321 14.1614 15.6019 17.957C12.4483 22.5245 9.15598 31.3746 15.1794 35.2589C21.0135 39.0165 27.7181 36.5241 30.9852 30.8306C34.3217 24.9727 34.2461 16.9828 32.6377 10.6251C32.4379 9.84013 32.1764 9.07227 31.8556 8.32873C34.7948 7.65817 37.6078 8.80319 39.4747 11.7765C42.4517 16.502 40.9317 21.6009 39.5126 26.5289C38.1691 31.1785 36.6617 38.618 42.9185 40.5728C48.4057 42.2935 54.6246 38.6054 56.4853 33.2978C56.7691 32.507 55.6275 32.1085 55.1923 32.7347ZM27.8253 28.0345C26.6396 30.7231 24.5519 32.7537 21.5181 32.9751C16.3336 33.3547 15.3434 29.0909 16.4723 25.0739C18.1122 19.3298 23.2274 13.4845 28.1407 10.0684C28.1664 10.1199 28.1896 10.1727 28.2101 10.2266C30.2749 16.0071 30.1378 22.349 27.8253 28.0345Z"
              fill="#4F4747"
            />
          </svg>
        </div>
        <div className="cs_shape_2 position-absolute">
          <svg
            width={21}
            height={24}
            viewBox="0 0 21 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M1.83883 0.992714L20.9086 13.6609L0.402728 23.8417L1.83883 0.992714Z"
              fill="#4F4747"
            />
          </svg>
        </div>
        <div className="cs_height_143 cs_height_lg_75" />
        <div className="container">
          <SectionHeading
            title="Offering budget friendly pricing <br /> solutions for your business"
            subTitle="Our Pricing"
          />
          <Spacing lg="85" md="45" />
        </div>
        <div className="container">
          <PricingTableList />
        </div>
        <div className="cs_height_150 cs_height_lg_80" />
      </section>
      <TestimonialSlider
        layeredImages={[
          '/images/digital-agency/layer_img_1.png',
          '/images/digital-agency/layer_img_2.png',
          '/images/digital-agency/layer_img_3.png',
          '/images/digital-agency/layer_img_4.png',
          '/images/digital-agency/layer_img_5.png',
        ]}
        data={testimonialData}
      />
      <Cta
        title="Is there a specific project or goal <br/>that you have in mind?"
        btnText="Contact Us"
        btnUrl="/contact"
        bgUrl="/images/creative-agency/cta_bg.jpeg"
        variant="cs_type_1"
      />
      <section className="cs_shape_animation_3">
        <div className="cs_shape_1 position-absolute">
          <svg
            width={509}
            height={458}
            viewBox="0 0 509 458"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx={254} cy={229} r="228.5" stroke="currentColor" />
            <circle
              cx={26}
              cy={237}
              r="25.5"
              className="anio_3_c_1"
              fill="white"
              stroke="currentColor"
            />
            <circle cx={26} cy={237} r={15} fill="currentColor" />
            <circle
              cx={483}
              cy={229}
              r="25.5"
              className="anio_3_c_1"
              fill="white"
              stroke="currentColor"
            />
            <circle cx={483} cy={229} r={15} fill="currentColor" />
          </svg>
        </div>
        <Spacing lg="143" md="75" />
        <div className="container">
          <SectionHeading title="Some recent news" subTitle="Our Blog" />
          <Spacing lg="85" md="45" />
          <PostGridStyle2 data={postData} />
        </div>
      </section>
      <Spacing lg="135" md="70" />
      <Marquee text="We Create Design - Build App - Website - Branding - SEO" />
      <Spacing lg="84" md="50" />
      <div className="container">
        <Brands data={darkMode ? brandListDark : brandList} />
      </div>
      <Spacing lg="135" md="80" />
    </>
  );
}
