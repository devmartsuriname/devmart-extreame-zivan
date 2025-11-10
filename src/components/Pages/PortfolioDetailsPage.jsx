import React from 'react';
import Spacing from '../Spacing';
import SectionHeadingStyle3 from '../SectionHeading/SectionHeadingStyle3';
import { Icon } from '@iconify/react';
import { pageTitle } from '../../helpers/PageTitle';

export default function PortfolioDetailsPage() {
  pageTitle('Portfolio Details');
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      <SectionHeadingStyle3
        title="Awesome colorful artwork"
        subTitle="Portfolio Details"
      />
      <Spacing lg="75" md="60" />
      <div className="container">
        <div className="cs_portfolio_details">
          <img src="/images/others/portfolio_details_1.jpeg" alt="Thumb" />
          <Spacing lg="100" md="40" />
          <div className="cs_portfolio_details_in">
            <ul className="cs_portfolio_details_info cs_mp0">
              <li>
                <h3 className="cs_fs_21 mb-0 cs_semibold">Client:</h3>
                <p className="mb-0">Andrew romania</p>
              </li>
              <li>
                <h3 className="cs_fs_21 mb-0 cs_semibold">Location:</h3>
                <p className="mb-0">United Kindom</p>
              </li>
              <li>
                <h3 className="cs_fs_21 mb-0 cs_semibold">Budget:</h3>
                <p className="mb-0">$2500</p>
              </li>
              <li>
                <h3 className="cs_fs_21 mb-0 cs_semibold">
                  Project Completed:
                </h3>
                <p className="mb-0">11 August,2022</p>
              </li>
            </ul>
            <div className="cs_portfolio_details_right">
              <h2>Project Summary</h2>
              <p>
                Colorful artwork is a creative project that aims to explore the
                beauty and diversity of colorful artwork. The project seeks to
                showcase the myriad of ways in which colors can be used to
                convey emotions, ideas, and expressions in the world of art.
                <br />
                The project will feature a collection of artworks created by
                talented artists from different parts of the world. Each artwork
                will be selected based on its unique use of color, and how it
                contributes to the overall composition of the piece. The project
                will feature a diverse range of art forms, including paintings,
                drawings, digital art, and mixed media.
              </p>
              <p>
                Through this project, we aim to celebrate the power of color in
                art, and how it can be used to convey a wide range of emotions
                and meanings. We hope to inspire a deeper appreciation of art
                and its ability to connect with people on a visceral level. In
                addition to the artwork, the project will also feature
                interviews with the artists, where they will discuss their
                inspiration, creative process, and their use of color in their
                art. This will provide a unique insight into the creative minds
                of the artists and help the audience understand the meaning and
                symbolism behind their art.
              </p>
            </div>
          </div>
          <Spacing lg="115" md="60" />
          <div className="cs_portfolio_details_gallery">
            <div>
              <img src="/images/others/portfolio_details_2.jpeg" alt="Thumb" />
            </div>
            <div>
              <img src="/images/others/portfolio_details_3.jpeg" alt="Thumb" />
            </div>
            <div>
              <img src="/images/others/portfolio_details_4.jpeg" alt="Thumb" />
            </div>
          </div>
        </div>
        <Spacing lg="90" md="60" />
        <div className="cs_page_navigation cs_center">
          <div>
            <a href="/" className="cs_text_btn cs_type1">
              <Icon icon="cil:arrow-left" className="cs_fs_21" />
              <span>Prev Project</span>
            </a>
          </div>
          <div>
            <a href="/" className="cs_text_btn">
              <span>Next Project</span>
              <Icon icon="cil:arrow-right" className="cs_fs_21" />
            </a>
          </div>
        </div>
      </div>
      <Spacing lg="150" md="80" />
    </>
  );
}
