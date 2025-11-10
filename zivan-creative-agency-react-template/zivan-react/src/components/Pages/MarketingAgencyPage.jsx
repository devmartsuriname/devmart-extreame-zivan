import React from 'react';
import Spacing from '../Spacing';
import HeroStyle2 from '../Hero/HeroStyle2';
import Brands from '../Brands';
import Marquee from '../Marquee';
import Cta from '../Cta';
import SectionHeading from '../SectionHeading';
import Accordion from '../Accordion';
import PostCarousel from '../Slider/PostCarousel';
import TestimonialSlider from '../Slider/TestimonialSlider';
import Award from '../Award';
import VideoModal from '../VideoModal';
import ServiceSlider from '../Slider/ServiceSlider';
import AboutStyle2 from '../About/AboutStyle2';
import FunFact from '../FunFact';
import Button from '../Button';
import CaseStudy from '../CaseStudy';
import { pageTitle } from '../../helpers/PageTitle';
const servideData = [
  {
    iconSrc: '/images/marketing-agency/service_icon_1.svg',
    title: 'On page optimization',
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: 'See More',
    btnUrl: '/service/service-details',
  },
  {
    iconSrc: '/images/marketing-agency/service_icon_2.svg',
    title: 'Marketing Consulting',
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: 'See More',
    btnUrl: '/service/service-details',
  },
  {
    iconSrc: '/images/marketing-agency/service_icon_3.svg',
    title: 'Video Campaign',
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: 'See More',
    btnUrl: '/service/service-details',
  },
  {
    iconSrc: '/images/marketing-agency/service_icon_4.svg',
    title: 'Branding Design',
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: 'See More',
    btnUrl: '/service/service-details',
  },
  {
    iconSrc: '/images/marketing-agency/service_icon_1.svg',
    title: 'On page optimization',
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: 'See More',
    btnUrl: '/service/service-details',
  },
  {
    iconSrc: '/images/marketing-agency/service_icon_2.svg',
    title: 'Marketing Consulting',
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: 'See More',
    btnUrl: '/service/service-details',
  },
  {
    iconSrc: '/images/marketing-agency/service_icon_3.svg',
    title: 'Video Campaign',
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: 'See More',
    btnUrl: '/service/service-details',
  },
  {
    iconSrc: '/images/marketing-agency/service_icon_4.svg',
    title: 'Branding Design',
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: 'See More',
    btnUrl: '/service/service-details',
  },
];
const funfactData = [
  { title: 'Happy Customers', number: '22k' },
  { title: 'Work’s Completed', number: '15k' },
  { title: 'Skilled Team Members', number: '121' },
  { title: 'Most Valuable Awards', number: '15' },
];
const awardData = [
  {
    brand: 'Behance',
    title: 'UI/UX design of the month',
    subTitle:
      'Accusamus et iusto odio dignissimos ducimus qui blanditiis fedarals praesentium voluptatum deleniti atque corrupti quos dolores',
    date: 'December 12, 2023',
    awardImgUrl: '/images/creative-agency/award_img_1.svg',
  },
  {
    brand: 'Awwwards',
    title: 'CSS awards design',
    subTitle:
      'Accusamus et iusto odio dignissimos ducimus qui blanditiis fedarals praesentium voluptatum deleniti atque corrupti quos dolores',
    date: 'January 05, 2022',
    awardImgUrl: '/images/creative-agency/award_img_2.svg',
  },
  {
    brand: 'Google',
    title: 'Website of the day',
    subTitle:
      'Accusamus et iusto odio dignissimos ducimus qui blanditiis fedarals praesentium voluptatum deleniti atque corrupti quos dolores',
    date: 'March 20, 2021',
    awardImgUrl: '/images/creative-agency/award_img_3.svg',
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
const caseStudyData = [
  {
    thumbnailSrc: '/images/marketing-agency/case_study_1.jpeg',
    title: 'Digital marketing management',
    category: 'Marketing',
    number: '01',
    href: '/case-study-details',
  },
  {
    thumbnailSrc: '/images/marketing-agency/case_study_2.jpeg',
    title: 'Digital marketing management',
    category: 'Marketing',
    number: '02',
    href: '/case-study-details',
  },
  {
    thumbnailSrc: '/images/marketing-agency/case_study_3.jpeg',
    title: 'Digital marketing management',
    category: 'Marketing',
    number: '03',
    href: '/case-study-details',
  },
  {
    thumbnailSrc: '/images/marketing-agency/case_study_4.jpeg',
    title: 'Digital marketing management',
    category: 'Marketing',
    number: '04',
    href: '/case-study-details',
  },
];
const postData = [
  {
    thumbnailSrc: '/images/creative-agency/post_1.jpeg',
    title: 'How to keep fear from ruining your art business with confident',
    date: '07 Mar 2023',
    url: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/creative-agency/post_2.jpeg',
    title: 'Artistic mind will be great for creation anything',
    date: '22 Apr 2023',
    url: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/creative-agency/post_3.jpeg',
    title: 'AI will take over all job for human within few years',
    date: '13 May 2023',
    url: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/creative-agency/post_4.jpeg',
    title: 'Your agency need to replace some artistic mind people',
    date: '15 Mar 2023',
    url: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/creative-agency/post_1.jpeg',
    title: 'How to keep fear from ruining your art business with confident',
    date: '07 Mar 2023',
    url: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/creative-agency/post_2.jpeg',
    title: 'Artistic mind will be great for creation anything',
    date: '22 Apr 2023',
    url: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/creative-agency/post_3.jpeg',
    title: 'AI will take over all job for human within few years',
    date: '13 May 2023',
    url: '/blog/blog-details',
  },
  {
    thumbnailSrc: '/images/creative-agency/post_4.jpeg',
    title: 'Your agency need to replace some artistic mind people',
    date: '15 Mar 2023',
    url: '/blog/blog-details',
  },
];
const faqData = [
  {
    title: '01. I need your services and how can i contact you throw email?',
    content:
      'Marketing eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.',
  },
  {
    title: '02. What are the different types of service we provide?',
    content:
      'Marketing eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.',
  },
  {
    title: '03. What are the different stages of the working process?',
    content:
      'Marketing eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.',
  },
  {
    title: '04. What is the difference between direct and digital marketing?',
    content:
      'Marketing eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.',
  },
  {
    title: '05. How can i payment proceed after complete project?',
    content:
      'Marketing eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.',
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

export default function MarketingAgencyPage({ darkMode }) {
  pageTitle('Marketing Agency');
  return (
    <>
      <HeroStyle2
        miniTitle="London Based Marketing Agency"
        title="Unlock Your Business's Potential with Expert Digital Marketing Solutions"
        subTitle="Our agency offers a comprehensive suite of lots services, including Branding, Advertising, Social marketing, Video making, and Marketing analysis."
        thumbnailSrc="/images/marketing-agency/hiro_img.jpeg"
        mikeIcon={
          darkMode ? '/images/icons/mike_dark.svg' : '/images/icons/mike.svg'
        }
      />
      <section className="cs_p76_full_width" id="service">
        <Spacing lg="143" md="75" />
        <SectionHeading title="Services we provide" subTitle="Our Services" />
        <Spacing lg="85" md="45" />
        <ServiceSlider data={servideData} />
      </section>
      <section>
        <div className="cs_height_150 cs_height_lg_75" />
        <AboutStyle2
          thumbnailSrc1="/others-image/about_img_1.png"
          thumbnailSrc2="/others-image/about_img_2.png"
          uperTitle="Who We Are"
          title="Full-stack creatives and designing agency"
          subTitle="Our team, specializing in strategic digital marketing, partners with the world's leading brands. Breaking from the norm, we push boundaries and merge imaginative thinking, consumer behavior,
        and data-driven design with advanced technology to deliver unparalleled brand experiences."
          featureList={[
            'Designing content with AI power',
            'Trending marketing tools involve',
            'Powerful market strategy use',
          ]}
          btnText="Learn More"
          btnUrl="/about"
        />
      </section>
      <div className="container">
        <Spacing lg="125" md="70" />
        <FunFact data={funfactData} />
      </div>
      <section>
        <Spacing lg="118" md="70" />
        <div className="container">
          <SectionHeading
            title="Real world solutions successful <br />case studies in Zivan"
            subTitle="Case Study"
          />
          <Spacing lg="85" md="45" />
        </div>
        <CaseStudy data={caseStudyData} />
        <Spacing lg="100" md="60" />
        <div className="container">
          <div className="text-center">
            <Button btnText="More Case Study" btnUrl="/" />
          </div>
        </div>
      </section>
      <div className="container">
        <Spacing lg="126" md="70" />
        <VideoModal
          videoSrc="https://www.youtube.com/embed/VcaAVWtP48A"
          bgUrl="/images/creative-agency/hero_video_bg_1.jpeg"
          title="Our Design and Technology <br /> Studio is dedicated to making <br />your ideas a reality"
        />
      </div>
      <TestimonialSlider
        layeredImages={[
          '/images/marketing-agency/layer_img_1.png',
          '/images/marketing-agency/layer_img_2.png',
          '/images/marketing-agency/layer_img_3.png',
          '/images/marketing-agency/layer_img_4.png',
          '/images/marketing-agency/layer_img_5.png',
        ]}
        data={testimonialData}
      />
      <section className="cs_primary_bg cs_shape_animation_2">
        <Spacing lg="143" md="75" />
        <div className="cs_shape_1 position-absolute">
          <svg
            width={65}
            height={64}
            viewBox="0 0 65 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                d="M62.4554 25.9314C55.6838 19.6081 40.1618 12.4752 32.1637 20.1537C41.7609 21.9206 53.2379 29.2392 48.3751 39.1677C45.1712 45.7019 38.7353 45.7177 33.3337 41.995C27.338 37.8739 25.7108 31.2667 27.4596 24.5962C26.5312 24.5866 25.6039 24.6605 24.6889 24.8172C9.80991 27.7447 14.0713 47.6353 20.9187 55.948C22.4528 57.8045 19.7488 60.3159 18.1393 58.4837C7.86403 46.8126 6.49349 23.0691 25.5532 19.9295C26.8892 19.7254 28.2446 19.6801 29.5912 19.7945C36.9845 9.42053 56.5698 17.4866 64.055 24.4366C65.1096 25.4175 63.4831 26.8926 62.4554 25.9314ZM33.9938 39.0327C38.3927 42.4636 44.2429 40.8527 44.3919 34.8698C44.6036 28.2263 35.7464 25.0921 29.1457 24.655C27.1454 29.9313 29.4427 35.4836 33.9938 39.0327Z"
                fill="#4F4747"
              />
            </g>
          </svg>
        </div>
        <div className="container">
          <SectionHeading
            title="Our prize achievement"
            subTitle="Awards"
            variantColor="cs_white_color"
          />
          <Spacing lg="85" md="45" />
          <Award data={awardData} />
        </div>
        <Spacing lg="150" md="80" />
      </section>
      <section className="cs_p76_full_width">
        <Spacing lg="143" md="75" />
        <div className="container">
          <SectionHeading title="Some recent news" subTitle="Our Blog" />
          <Spacing lg="85" md="45" />
        </div>
        <PostCarousel data={postData} />
      </section>
      <section>
        <Spacing lg="143" md="75" />
        <div className="container">
          <SectionHeading title="Frequently asked question" subTitle="FAQs" />
          <Spacing lg="55" md="30" />
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <Accordion variant="cs_type_1" data={faqData} />
            </div>
          </div>
        </div>
        <Spacing lg="120" md="60" />
      </section>
      <section>
        <div className="container">
          <Cta
            title="Is there a specific project or goal that you have in mind?"
            btnText="Contact Us"
            btnUrl="/contact"
            bgUrl="/images/creative-agency/cta_bg.jpeg"
          />
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
