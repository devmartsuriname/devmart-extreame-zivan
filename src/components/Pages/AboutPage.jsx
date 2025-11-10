import React from 'react';
import Spacing from '../Spacing';
import SectionHeadingStyle3 from '../SectionHeading/SectionHeadingStyle3';
import AboutStyle4 from '../About/AboutStyle4';
import FunFact from '../FunFact';
import AboutStyle5 from '../About/AboutStyle5';
import IconBoxStyle6 from '../IconBox/IconBoxStyle6';
import SectionHeadingStyle5 from '../SectionHeading/SectionHeadingStyle5';
import SectionHeading from '../SectionHeading';
import TeamSlider from '../Slider/TeamSlider';
import Marquee from '../Marquee';
import Brands from '../Brands';
import { pageTitle } from '../../helpers/PageTitle';
const funfactData = [
  { title: 'Happy Customers', number: '22k' },
  { title: 'Work’s Completed', number: '15k' },
  { title: 'Skilled Team Members', number: '121' },
  { title: 'Most Valuable Awards', number: '15' },
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

export default function AboutPage({ darkMode }) {
  pageTitle('About');
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      <SectionHeadingStyle3
        title="Adding value to your business, <br>making it worthy"
        subTitle="About Us"
        variant="text-center"
        shape="shape_1"
      />
      <Spacing lg="75" md="60" />
      <AboutStyle4
        thumbnailSrc="/images/digital-agency/about_1.jpeg"
        miniTitle="Company Info"
        title="Marketing agency for your business"
        subTitle="Our team, specializing in strategic digital marketing, partners with aiming the world's leading brands. Breaking from the norm, we push boundaries and do merge imaginative thinking posible.
        dolores eos qui ratione voluptatem lipe sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam ever the world lorem ipsum."
        btnText="See Our Services"
        btnUrl="/service"
      />
      <Spacing lg="125" md="70" />
      <div className="container">
        <FunFact data={funfactData} />
      </div>
      <Spacing lg="125" md="70" />
      <AboutStyle5
        variant="cs_type_1"
        thumbnailSrc="/images/digital-agency/about_2.jpeg"
        miniTitle="What We Do"
        title="Best value service provider agency"
        subTitle="We make specializing in strategic digital marketing, partners with aiming the world's leading brands. Breaking from the norm, we push boundaries and do merge imaginative thinking posible dolores."
        progressBarList={[
          { title: 'Digital Marketing', percentage: '75' },
          { title: 'Brand Strategy', percentage: '85' },
          { title: 'Competitor Analysis', percentage: '95' },
        ]}
        salesTitle="Sales Increase"
        groth="25"
      />
      <Spacing lg="150" md="80" />
      <section className="cs_primary_bg">
        <Spacing lg="140" md="70" />
        <div className="container">
          <SectionHeadingStyle5 title="How we work" />
          <Spacing lg="85" md="45" />
          <div className="cs_working_process_wrap cs_center">
            <div className="cs_working_process">
              <div className="cs_working_process_col">
                <IconBoxStyle6
                  bgSrc="/images/others/process_1.png"
                  iconSrc="/images/icons/search.svg"
                  title="Research"
                  subTitle="Sed ut perspiciatis unde omnis iste natus error sit voluptatem own disilope accusantium doloremque laudantium, totam remen."
                />
              </div>
              <div className="cs_working_process_col">
                <IconBoxStyle6
                  bgSrc="/images/others/process_2.png"
                  iconSrc="/images/icons/idea.svg"
                  title="Idea Generate"
                  subTitle="Sed ut perspiciatis unde omnis iste natus error sit voluptatem own disilope accusantium doloremque laudantium, totam remen."
                />
              </div>
              <div className="cs_working_process_col">
                <IconBoxStyle6
                  bgSrc="/images/others/process_3.png"
                  iconSrc="/images/icons/gear.svg"
                  title="Implement"
                  subTitle="Sed ut perspiciatis unde omnis iste natus error sit voluptatem own disilope accusantium doloremque laudantium, totam remen."
                />
              </div>
            </div>
          </div>
        </div>
        <Spacing lg="150" md="80" />
      </section>
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
