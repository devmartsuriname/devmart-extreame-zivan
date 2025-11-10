import React from 'react';
import HeroStyle3 from '../Hero/HeroStyle3';
import AboutStyle3 from '../About/AboutStyle3';
import Spacing from '../Spacing';
import ServiceStyle2 from '../Service/ServiceStyle2';
import SectionHeading from '../SectionHeading';
import Portfolio from '../Portfolio';
import Button from '../Button';
import Marquee from '../Marquee';
import BrandsStyle2 from '../Brands/BrandsStyle2';
import TeamSlider from '../Slider/TeamSlider';
import TestimonialSlider from '../Slider/TestimonialSlider';
import Cta from '../Cta';
import PostGrid from '../PostGrid';
import { pageTitle } from '../../helpers/PageTitle';
const serviceData = [
  {
    number: '01',
    title: 'WP Development',
    subTitle:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium lorema doloremque laudantium, totam rem aperiam, eaque ipsa quae.',
    thumbnailSrc: '/images/studio-agency/service_img_1.jpeg',
    href: '/service/service-details',
  },
  {
    number: '02',
    title: 'Branding Design',
    subTitle:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium lorema doloremque laudantium, totam rem aperiam, eaque ipsa quae.',
    thumbnailSrc: '/images/studio-agency/service_img_2.jpeg',
    href: '/service/service-details',
  },
  {
    number: '03',
    title: 'Branding Design',
    subTitle:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium lorema doloremque laudantium, totam rem aperiam, eaque ipsa quae.',
    thumbnailSrc: '/images/studio-agency/service_img_3.jpeg',
    href: '/service/service-details',
  },
  {
    number: '04',
    title: 'On Page Optimization',
    subTitle:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium lorema doloremque laudantium, totam rem aperiam, eaque ipsa quae.',
    thumbnailSrc: '/images/studio-agency/service_img_4.jpeg',
    href: '/service/service-details',
  },
];
const portfolioData = [
  {
    href: '/portfolio/portfolio-details',
    imgUrl: '/images/creative-agency/portfolio_1.jpeg',
    title: 'Awesome colorful artwork',
    btnText: 'See Project',
  },
  {
    href: '/portfolio/portfolio-details',
    imgUrl: '/images/creative-agency/portfolio_2.jpeg',
    title: 'Admin dashboard UI design',
    btnText: 'See Project',
  },
  {
    href: '/portfolio/portfolio-details',
    imgUrl: '/images/creative-agency/portfolio_3.jpeg',
    title: 'Product designing with brand',
    btnText: 'See Project',
  },
  {
    href: '/portfolio/portfolio-details',
    imgUrl: '/images/creative-agency/portfolio_4.jpeg',
    title: 'Kids education website design',
    btnText: 'See Project',
  },
];
const brandData = [
  {
    logoSrc: '/images/studio-agency/brand_1.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_2.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_3.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_4.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_5.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_6.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_7.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_8.svg',
    logoAlt: 'Partner',
  },
];
const brandDataDark = [
  {
    logoSrc: '/images/studio-agency/brand_1_dark.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_2_dark.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_3_dark.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_4_dark.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_5_dark.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_6_dark.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_7_dark.svg',
    logoAlt: 'Partner',
  },
  {
    logoSrc: '/images/studio-agency/brand_8_dark.svg',
    logoAlt: 'Partner',
  },
];
const teamData = [
  {
    memberImg: '/images/studio-agency/team_1.jpeg',
    memberName: 'James Berline',
    memberDesignation: 'React Developer',
    href: '/team/team-details',
  },
  {
    memberImg: '/images/studio-agency/team_2.jpeg',
    memberName: 'Bella Zubena',
    memberDesignation: 'Graphic Designer',
    href: '/team/team-details',
  },
  {
    memberImg: '/images/studio-agency/team_3.jpeg',
    memberName: 'Kemnei Alekzend',
    memberDesignation: 'Digital Marketer',
    href: '/team/team-details',
  },
  {
    memberImg: '/images/studio-agency/team_4.jpeg',
    memberName: 'Juliya Jesmine',
    memberDesignation: 'UX Researcher',
    href: '/team/team-details',
  },
  {
    memberImg: '/images/studio-agency/team_1.jpeg',
    memberName: 'James Berline',
    memberDesignation: 'React Developer',
    href: '/team/team-details',
  },
  {
    memberImg: '/images/studio-agency/team_2.jpeg',
    memberName: 'Bella Zubena',
    memberDesignation: 'Graphic Designer',
    href: '/team/team-details',
  },
  {
    memberImg: '/images/studio-agency/team_3.jpeg',
    memberName: 'Kemnei Alekzend',
    memberDesignation: 'Digital Marketer',
    href: '/team/team-details',
  },
  {
    memberImg: '/images/studio-agency/team_4.jpeg',
    memberName: 'Juliya Jesmine',
    memberDesignation: 'UX Researcher',
    href: '/team/team-details',
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
const postData = [
  {
    date: '07 Mar 2023',
    title: 'Artistic mind will be great for creation anything',
    thumbnailSrc: '/images/studio-agency/post_1.jpeg',
    href: '/blog/blog-details',
  },
  {
    date: '05 Mar 2023',
    title: 'How to keep fear from ruining your art business with confident',
    thumbnailSrc: '/images/studio-agency/post_2.jpeg',
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

export default function StudioAgencyPage({ darkMode }) {
  pageTitle('Studio Agency');
  return (
    <>
      <HeroStyle3
        title="LONDON BASED UI/UX <br /> DESIGN & DEVELOPMENT <br /> STUDIO AGENCY"
        scrollingText="We Create Design - Build App - Website - Branding - SEO"
        thumbnailSrc={
          darkMode
            ? '/images/studio-agency/hero_bg_dark.jpg'
            : '/images/studio-agency/hero_bg.jpg'
        }
      />

      <section>
        <Spacing lg="130" md="70" />
        <AboutStyle3
          title="From standout brands to unforgettable campaigns and award-winning websites, we are your go-to agency.."
          subTitle="Our digital agency, Zivan, is renowned worldwide for our commitment to delivering high-quality digital experiences. Based in London and Bangladesh, we specialize in crafting intuitive,
          enjoyable, and remarkable experiences that help our clients stand out in a crowded digital landscape."
          btnText="See All Project"
          btnUrl="/about"
        />
        <Spacing lg="150" md="80" />
        <section className="cs_primary_bg">
          <Spacing lg="143" md="75" />
          <div className="container">
            <SectionHeading
              title="Our core services"
              subTitle="Services"
              variantColor="cs_white_color"
            />
            <Spacing lg="85" md="45" />
            <ServiceStyle2 variantColor="cs_color_1" data={serviceData} />
          </div>
          <Spacing lg="145" md="80" />
        </section>
      </section>
      <section>
        <Spacing lg="143" md="75" />
        <div className="container">
          <SectionHeading title="Some featured work" subTitle="Portfolio" />
          <Spacing lg="85" md="45" />
          <Portfolio data={portfolioData} />
          <Spacing lg="26" md="30" />
          <div className="text-center">
            <Button btnText="See All Project" btnUrl="/portfolio" />
          </div>
        </div>
      </section>
      <Spacing lg="135" md="70" />
      <Marquee text="We Create Design - Build App - Website - Branding - SEO" />
      <Spacing lg="84" md="50" />
      <div className="container">
        <BrandsStyle2 data={darkMode ? brandDataDark : brandData} />
      </div>
      <section className="cs_p76_full_width">
        <Spacing lg="143" md="75" />
        <div className="container">
          <SectionHeading
            title="Meet our experts team behind <br />the zivan agency"
            subTitle="Our Team"
          />
          <Spacing lg="85" md="45" />
        </div>
        <TeamSlider data={teamData} />
      </section>
      <TestimonialSlider
        layeredImages={[
          '/images/studio-agency/layer_img_1.png',
          '/images/studio-agency/layer_img_2.png',
          '/images/studio-agency/layer_img_3.png',
          '/images/studio-agency/layer_img_4.png',
          '/images/studio-agency/layer_img_5.png',
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
          <PostGrid data={postData} />
        </div>
        <Spacing lg="150" md="80" />
      </section>
    </>
  );
}
