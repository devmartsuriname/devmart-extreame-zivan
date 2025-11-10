import React from 'react';
import Spacing from '../Spacing';
import SectionHeadingStyle3 from '../SectionHeading/SectionHeadingStyle3';
import CtaStyle2 from '../Cta/CtaStyle2';
import PricingTableList from '../PricingTable/PricingTableList';
import SectionHeading from '../SectionHeading';
import AboutStyle6 from '../About/AboutStyle6';
import CardStyle3 from '../Card/CardStyle3';
import { pageTitle } from '../../helpers/PageTitle';

export default function ServiceDetailsPage() {
  pageTitle('Service Details');
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      <SectionHeadingStyle3
        title="Improving website visibility and <br/>user experience"
        subTitle="On Page Optimiztion"
        shape="shape_3"
      />
      <Spacing lg="75" md="60" />
      <div className="cs_service_info">
        <div className="container">
          <div className="row align-items-center cs_gap_y_40">
            <div className="col-lg-6">
              <div
                className="cs_service_info_thumb cs_bg_filed"
                style={{
                  backgroundImage:
                    'url("/images/others/service_details_2.png")',
                }}
              />
            </div>
            <div className="col-lg-6">
              <div className="row cs_gap_y_40">
                <div className="col-sm-6">
                  <CardStyle3
                    number="01"
                    title="Keywords"
                    subTitle="One provide moment. Interesting an a upse you side it all the and don't listen. Cnfiden picture she one the what I nor least absolutes heavily polimer."
                  />
                </div>
                <div className="col-sm-6">
                  <CardStyle3
                    number="02"
                    title="SEO Writing"
                    subTitle="One provide moment. Interesting an a upse you side it all the and don't listen. Cnfiden picture she one the what I nor least absolutes heavily polimer."
                  />
                </div>
                <div className="col-sm-6">
                  <CardStyle3
                    number="03"
                    title="Visual Assets"
                    subTitle="One provide moment. Interesting an a upse you side it all the and don't listen. Cnfiden picture she one the what I nor least absolutes heavily polimer."
                  />
                </div>
                <div className="col-sm-6">
                  <CardStyle3
                    number="04"
                    title="Image Optimization"
                    subTitle="One provide moment. Interesting an a upse you side it all the and don't listen. Cnfiden picture she one the what I nor least absolutes heavily polimer."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Spacing lg="150" md="80" />
      <AboutStyle6
        thumbnailSrc="/images/others/service_details_1.jpeg"
        title="What you will get from this service?"
        subTitle="Our team, specializing in strategic digital marketing, partners with the world's leading brands. Breaking from the norm, we push boundaries and imaginative thinking, consumer behavior, and data-driven design with advanced."
        featureList={[
          'Powerful market strategy use',
          'Trending marketing tools involve',
          'Designing content with AI power',
          'Compatible with all modern browsers',
        ]}
        btnText="Check Live Projects"
        btnUrl="/portfolio"
      />
      <Spacing lg="150" md="80" />
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
      <div className="cs_height_140 cs_height_lg_70" />
      <CtaStyle2
        title="Is there a specific project or goal <br />that you have in mind?"
        btnText="Send Message"
        btnUrl="/contact"
      />
      <div className="cs_height_150 cs_height_lg_80" />
    </>
  );
}
