import React from 'react';
import Spacing from '../Spacing';
import SectionHeadingStyle3 from '../SectionHeading/SectionHeadingStyle3';
import CtaStyle2 from '../Cta/CtaStyle2';
import AboutStyle7 from '../About/AboutStyle7';
import AboutStyle8 from '../About/AboutStyle8';
import { pageTitle } from '../../helpers/PageTitle';

export default function CaseStudyDetailsPage() {
  pageTitle('Case Study Details');
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      <SectionHeadingStyle3
        title="Digital marketing <br/>management"
        subTitle="Marketing"
        variant="text-center"
      />
      <Spacing lg="75" md="60" />

      <div className="container">
        <img
          className="cs_casestudy_details_thumb cs_radius_15"
          src="/images/others/case_1.jpeg"
          alt="Thumb"
        />
        <div className="cs_height_100 cs_height_lg_60" />
        <ul className="cs_case_study_info cs_mp0">
          <li>
            <p className="mb-0">Client</p>
            <h3 className="cs_fs_21 mb-0 cs_semibold">Andreo Bowla</h3>
          </li>
          <li>
            <p className="mb-0">Location </p>
            <h3 className="cs_fs_21 mb-0 cs_semibold">United Kindom</h3>
          </li>
          <li>
            <p className="mb-0">Budgets</p>
            <h3 className="cs_fs_21 mb-0 cs_semibold">$1330 USD</h3>
          </li>
          <li>
            <p className="mb-0">Completed</p>
            <h3 className="cs_fs_21 mb-0 cs_semibold">12 April 2023</h3>
          </li>
        </ul>
        <div className="cs_height_100 cs_height_lg_60" />
        <div className="row align-items-center cs_gap_y_35">
          <div className="col-lg-5">
            <img
              src="/images/others/case_2.jpeg"
              alt="Thumb"
              className="cs_radius_15 w-100"
            />
          </div>
          <div className="col-lg-6 offset-lg-1">
            <h2 className="cs_fs_50">Project Brief :</h2>
            <div className="cs_height_15 cs_height_lg_15" />
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium loposepas doloremque own laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              holas architecto beatae vitae dicta sunt explicabo. Nemo enim
              ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia environmet consequuntur magni dolores eos qui ratione
              mone voluptatem sequi nesciunt. Neque porro quisquam est world
              wide.
            </p>
            <p>
              Our team, specializing in strategic digital marketing, partners
              with the world's leading brands. Breaking from the norm, we push
              boundaries and merge imaginative thinking, consumer behavior, and
              data-driven design with advanced technology.
            </p>
            <div className="cs_height_20 cs_height_lg_10" />
            <p className="mb-0">
              Website:{' '}
              <a href="/" className="cs_accent_color">
                www.zivan.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <Spacing lg="150" md="80" />
      <AboutStyle7
        title="Challenging part:"
        subTitle="Our team, specializing in strategic digital marketing, partners with the world's leading brands. Breaking from the norm, we push boundaries and merge imaginative thinking, consumer behavior, and data-driven design advanced."
        featureList={[
          { number: '01', text: 'User Experience (UX) Enhancement' },
          { number: '02', text: 'Modernization' },
          { number: '03', text: 'Mobile Responsiveness' },
          { number: '04', text: 'Performance Optimization' },
          { number: '05', text: 'Branding Consistency' },
          { number: '06', text: 'Content Strategy' },
        ]}
        thumbnailSrc="/images/others/case_3.jpeg"
      />
      <Spacing lg="150" md="80" />
      <AboutStyle8
        thumbnailSrc="/images/others/case_4.jpeg"
        title="Result overview:"
        subTitle="Performance testing, specializing in strategic digital marketing, partners with the world's leading brands. Breaking from the norm, we push boundaries and merge imaginative thinking, consumer behavior, and data-driven design with advanced technology."
        grothData={[
          { title: 'Performance Increase', percentage: '75' },
          { title: 'Loading Speed faster', percentage: '85' },
          { title: 'Mobile optimize', percentage: '90' },
        ]}
      />
      <Spacing lg="140" md="70" />
      <CtaStyle2
        title="Is there a specific project or goal <br />that you have in mind?"
        btnText="Send Message"
        btnUrl="/contact"
      />
      <div className="cs_height_150 cs_height_lg_80" />
    </>
  );
}
