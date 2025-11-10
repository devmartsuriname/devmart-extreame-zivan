import React from 'react';
import Spacing from '../Spacing';
import SectionHeadingStyle3 from '../SectionHeading/SectionHeadingStyle3';
import Portfolio from '../Portfolio';
import CtaStyle2 from '../Cta/CtaStyle2';
import { pageTitle } from '../../helpers/PageTitle';
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
  {
    href: '/portfolio/portfolio-details',
    imgUrl: '/images/creative-agency/portfolio_5.jpeg',
    title: 'Portable device UI/UX design',
    btnText: 'See Project',
  },
  {
    href: '/portfolio/portfolio-details',
    imgUrl: '/images/creative-agency/portfolio_6.jpeg',
    title: 'Social app design for IOS device',
    btnText: 'See Project',
  },
  {
    href: '/portfolio/portfolio-details',
    imgUrl: '/images/creative-agency/portfolio_7.jpeg',
    title: '3d table light lamp rendering',
    btnText: 'See Project',
  },
  {
    href: '/portfolio/portfolio-details',
    imgUrl: '/images/creative-agency/portfolio_8.jpeg',
    title: 'Old telephone 3d new model',
    btnText: 'See Project',
  },
];

export default function PortfolioPage() {
  pageTitle('Portfolio');
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      <SectionHeadingStyle3
        title="We have completed a series of noteworthy projects"
        subTitle="Our Portfolio"
        shape="shape_3"
      />
      <Spacing lg="75" md="60" />
      <div className="container">
        <Portfolio data={portfolioData} />
        <div className="cs_height_75 cs_height_lg_40" />
        <CtaStyle2
          title="Is there a specific project or goal <br />that you have in mind?"
          btnText="Send Message"
          btnUrl="/contact"
        />
        <div className="cs_height_150 cs_height_lg_80" />
      </div>
    </>
  );
}
